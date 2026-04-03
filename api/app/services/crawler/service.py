"""Main crawler service implementation."""

import asyncio
import re
import uuid
from datetime import datetime, timezone
from urllib.parse import parse_qsl, urlencode, urljoin, urlparse, urlunparse

from pydantic import BaseModel, ConfigDict, Field, PrivateAttr

from app.core.clients.http import HttpClient
from app.core.loggers import logger
from app.core.utils import build_base_url_from_url, extract_domain_from_url
from app.db.pg.base import SessionLocal
from app.db.pg.models.sources import ContentType, Source
from app.db.pg.models.task_runs import TaskRun, TaskRunType
from app.services.classifier.service import ClassifierService
from app.services.crawler.models import CrawlStatus
from app.services.pages import create_monitored_page_version, is_content_fingerprint_unchanged

from .exceptions import ContentFetchError, CrawlerError, CrawlerInitializationError
from .fetcher import BaseContentRetriever, JinaContentFetcher
from .models import CrawlProgress, CrawlResult, CrawlSession, DocumentExtraction
from .settings import CrawlerConfig

# Regex pattern to extract Markdown links
MD_LINK_RE = re.compile(r"\[.*?\]\((https?://[^\)\s]+)\)", re.I)


class CrawlerService(BaseModel):
    """Service for crawling web pages and extracting regulatory content.

    Implemented as a Pydantic model to leverage validation and structured configuration.
    """

    model_config = ConfigDict(arbitrary_types_allowed=True, validate_assignment=True)

    config: CrawlerConfig = Field(default_factory=CrawlerConfig.from_settings)
    classifier: ClassifierService = Field(default_factory=ClassifierService)
    content_fetcher: BaseContentRetriever | None = None

    _active_sessions: dict[str, CrawlSession] = PrivateAttr(default_factory=dict)
    _shutdown_event: asyncio.Event = PrivateAttr(default_factory=asyncio.Event)
    _http_client: HttpClient = PrivateAttr()

    def model_post_init(self, __context: dict | None) -> None:  # type: ignore[override]
        """Initialize service components after model creation."""
        if self.content_fetcher is None:
            self.content_fetcher = JinaContentFetcher(self.config)
        self._http_client = HttpClient(timeout=self.config.timeout)

    async def create_crawl_session(
        self,
        regulatory_source: Source,
        max_pages: int | None = None,
    ) -> CrawlSession:
        """Create a new crawl session for a regulatory source.

        Args:
            regulatory_source: Source model to crawl
            max_pages: Maximum number of pages to crawl

        Returns:
            Crawl session with unique ID and initial status

        Raises:
            CrawlerInitializationError: If crawler initialization fails
        """
        try:
            session_id = str(uuid.uuid4())
            # Normalize base URL to scheme://host format
            base_seed_url = self._build_base_seed(regulatory_source.base_url)
            allowed_domains = self._get_allowed_domain(base_seed_url)

            # Create initial progress
            progress = CrawlProgress(
                total_discovered=1,
                total_processed=0,
                total_regulatory=0,
                total_obligation_alerts=0,
                active_tasks=0,
                queue_size=1,
                started_at=datetime.now(timezone.utc),
            )

            # Create session with source context
            session = CrawlSession(
                session_id=session_id,
                base_url=base_seed_url,
                allowed_domains=allowed_domains,
                content_types=regulatory_source.content_types,
                status=CrawlStatus.INITIALIZING,
                progress=progress,
                max_pages=max_pages,
                regulatory_source_id=regulatory_source.id,
                organization_id=regulatory_source.organization_id,
            )

            # Store session
            self._active_sessions[session_id] = session

            logger.info(
                f"Created crawl session {session_id} for source {regulatory_source.id} ({regulatory_source.name})"
            )

            return session

        except Exception as e:
            logger.error(f"Failed to start crawl for source {regulatory_source.id}: {e}")
            raise CrawlerInitializationError(f"Failed to start crawl: {str(e)}") from e

    async def run_source(
        self,
        regulatory_source: Source,
        max_pages: int | None = None,
        create_task_run: bool = True,
        task_run: TaskRun | None = None,
    ) -> CrawlSession:
        """Run a crawl session for a regulatory source.

        Args:
            regulatory_source: Source model to crawl
            max_pages: Maximum number of pages to crawl
            create_task_run: Whether to create TaskRun record for tracking
            task_run: Optional pre-created TaskRun to use for tracking

        Returns:
            Updated crawl session

        Raises:
            CrawlerError: If session not found or crawl fails
        """
        source_id = regulatory_source.id

        # Update last_monitoring_started_at timestamp
        async with SessionLocal() as db:
            source_db = await db.get(Source, source_id)
            if source_db:
                source_db.last_monitoring_started_at = datetime.now(timezone.utc)
                await db.commit()

        # Use provided task_run or create one if requested
        if task_run is None and create_task_run:
            task_run = await self._create_task_run_for_source(regulatory_source)

        try:
            session = await self.create_crawl_session(
                regulatory_source=regulatory_source,
                max_pages=max_pages,
            )
            # Pass task_run to session for real-time updates
            completed_session = await self._run_session(session, task_run)

            # Update TaskRun and source statistics after successful crawl
            if create_task_run:
                await self._finalize_task_run_and_source_stats(task_run, completed_session, regulatory_source)

            return completed_session

        except Exception as e:
            # Update TaskRun with error if it was created
            if task_run:
                await self._handle_task_run_error(task_run, str(e))
            raise
        finally:
            # Update last_monitoring_completed_at timestamp
            async with SessionLocal() as db:
                source_db = await db.get(Source, source_id)
                if source_db:
                    source_db.last_monitoring_completed_at = datetime.now(timezone.utc)
                    await db.commit()

    def get_session_by_id(self, session_id: str) -> CrawlSession | None:
        """Get crawl session by ID.

        Args:
            session_id: Session ID to retrieve

        Returns:
            Crawl session or None if not found
        """
        return self._active_sessions.get(session_id)

    async def stop_session(self, session_id: str) -> CrawlSession:
        """Stop a running crawl session.

        Args:
            session_id: ID of session to stop

        Returns:
            Updated crawl session

        Raises:
            CrawlerError: If session not found
        """
        if session_id not in self._active_sessions:
            raise CrawlerError(f"Session {session_id} not found")

        session = self._active_sessions[session_id]
        session.status = CrawlStatus.STOPPED
        session.completed_at = datetime.now(timezone.utc)

        logger.info(f"Stopped crawl session {session_id}")
        return session

    def shutdown(self) -> None:
        """Request shutdown of all crawl operations."""
        logger.info("Shutdown requested")
        self._shutdown_event.set()

        # Mark all active sessions as stopped
        for session in self._active_sessions.values():
            if session.status == CrawlStatus.RUNNING:
                session.status = CrawlStatus.STOPPED
                session.completed_at = datetime.now(timezone.utc)

    async def _create_task_run_for_source(self, regulatory_source: Source) -> TaskRun | None:
        """Create a TaskRun record for tracking crawl operations.

        Args:
            regulatory_source: Source being crawled

        Returns:
            Created TaskRun instance or None if creation failed
        """
        try:
            async with SessionLocal() as db:
                # Generate unique task ID for tracking
                task_id = f"crawler_direct_{uuid.uuid4().hex[:12]}"

                # Create TaskRun for source processing
                task_run = TaskRun.create_for_individual_task(
                    task_id=task_id,
                    task_name="crawler_service_run_source",
                    task_run_type=TaskRunType.MANUAL_CRAWL,
                    organization_id=regulatory_source.organization_id,
                    source_id=regulatory_source.id,
                )

                db.add(task_run)
                task_run.set_started()
                await db.commit()
                await db.refresh(task_run)

                logger.info(
                    f"Created TaskRun {task_run.id} for direct crawl of source "
                    f"{regulatory_source.id} ({regulatory_source.name})"
                )

                return task_run

        except Exception as e:
            logger.error(f"Failed to create TaskRun for source {regulatory_source.id} ({regulatory_source.name}): {e}")
            return None

    async def _finalize_task_run_and_source_stats(
        self, task_run: TaskRun | None, completed_session: CrawlSession, regulatory_source: Source
    ) -> None:
        """Update TaskRun with final results and update source statistics.

        Args:
            task_run: TaskRun to update (can be None)
            completed_session: Completed crawl session
            regulatory_source: Source that was crawled
        """
        if not task_run:
            return

        try:
            async with SessionLocal() as db:
                # Calculate processing time
                processing_time = None
                if completed_session.completed_at and completed_session.created_at:
                    processing_time = (completed_session.completed_at - completed_session.created_at).total_seconds()

                # Refresh TaskRun to get latest state
                await db.refresh(task_run)

                task_run.update_stats(
                    total_pages=completed_session.progress.total_processed,
                    total_obligation_alerts=completed_session.progress.total_obligation_alerts,
                    total_alerts=completed_session.progress.total_regulatory,
                    crawler_session_id=completed_session.session_id,
                    processing_time_seconds=processing_time,
                )

                # Mark TaskRun as completed
                error_msg = completed_session.error_message if completed_session.status == CrawlStatus.FAILED else None
                task_run.set_completed(error_message=error_msg)
                await db.commit()

                logger.info(f"Updated TaskRun {task_run.id} with crawl results")

        except Exception as e:
            logger.error(f"Failed to finalize TaskRun {task_run.id} and source stats: {e}")

    async def _handle_task_run_error(self, task_run: TaskRun | None, error_message: str) -> None:
        """Update TaskRun with error information.

        Args:
            task_run: TaskRun to update (can be None)
            error_message: Error message to record
        """
        if not task_run:
            return

        try:
            async with SessionLocal() as db:
                await db.refresh(task_run)
                task_run.set_completed(error_message=error_message)
                await db.commit()
                logger.info(f"Updated TaskRun {task_run.id} with error: {error_message}")
        except Exception as e:
            logger.error(f"Failed to update TaskRun {task_run.id} with error: {e}")

    async def _update_task_run_progress(self, task_run: TaskRun, session: CrawlSession) -> None:
        """Update TaskRun with current progress from crawl session.

        Args:
            task_run: TaskRun to update
            session: Current crawl session with progress data
        """
        try:
            async with SessionLocal() as db:
                # Re-fetch to attach to current session
                task_run_db = await db.get(TaskRun, task_run.id)
                if not task_run_db:
                    return

                # Update stats with current progress
                task_run_db.update_stats(
                    total_pages=session.progress.total_processed,
                    total_obligation_alerts=session.progress.total_obligation_alerts,
                    total_alerts=session.progress.total_regulatory,
                    crawler_session_id=session.session_id,
                )

                await db.commit()
        except Exception as e:
            logger.error(f"Failed to update TaskRun {task_run.id} progress: {e}")

    async def _run_session(self, session: CrawlSession, task_run: TaskRun | None = None) -> CrawlSession:
        """Internal method to run a crawl session.

        Args:
            session: Crawl session to run
            task_run: Optional TaskRun to update during crawl

        Returns:
            Updated crawl session

        Raises:
            CrawlerError: If crawl fails
        """
        try:
            session.status = CrawlStatus.RUNNING
            logger.info(f"Starting crawl for session {session.session_id}")

            # Initialize crawler state
            queue: asyncio.Queue[str] = asyncio.Queue()
            visited: set[str] = set()
            active_tasks: set = set()

            # Add base URL and content types to queue
            canonical_url = self._canonical_url(session.base_url)
            await queue.put((canonical_url, session.content_types))

            # Create semaphore for concurrency control
            semaphore = asyncio.Semaphore(self.config.max_concurrency)

            # Resolve seed redirect first
            try:
                resolved_url = await self._resolve_redirects(session.base_url, self.config.max_redirects)
                resolved_canonical = self._canonical_url(resolved_url)
                logger.info(f"Resolved {session.base_url} -> {resolved_canonical}")
            except Exception as e:
                logger.error(f"Failed to resolve {session.base_url}: {e}")
                resolved_canonical = canonical_url

            while not queue.empty():
                try:
                    queue.get_nowait()
                    queue.task_done()
                except asyncio.QueueEmpty:
                    break

            await queue.put((resolved_canonical, session.content_types))

            # Process URLs with real-time TaskRun updates
            await self._process_queue(session, queue, visited, active_tasks, semaphore, task_run)

            # Update final status
            session.status = CrawlStatus.COMPLETED
            session.completed_at = datetime.now(timezone.utc)

            # Calculate final statistics
            self._calculate_final_statistics(session)

            logger.info(
                f"Completed crawl for session {session.session_id}: "
                f"{session.progress.total_processed} pages processed, "
                f"{session.progress.total_regulatory} regulatory pages found"
            )

            return session

        except Exception as e:
            session.status = CrawlStatus.FAILED
            session.error_message = str(e)
            session.completed_at = datetime.now(timezone.utc)
            logger.error(f"Crawl failed for session {session.session_id}: {e}")
            raise CrawlerError(f"Crawl failed: {str(e)}") from e

    async def _process_queue(
        self,
        session: CrawlSession,
        queue: asyncio.Queue[str],
        visited: set[str],
        active_tasks: set,
        semaphore: asyncio.Semaphore,
        task_run: TaskRun | None = None,
    ):
        """Process URLs from queue until empty."""
        last_progress_update = datetime.now(timezone.utc)

        while not self._shutdown_event.is_set() and session.status == CrawlStatus.RUNNING:
            started_new_tasks = await self._start_new_tasks_from_queue(session, queue, visited, active_tasks, semaphore)

            self._update_session_progress(session, active_tasks, queue)

            # Update TaskRun progress periodically (every 5 seconds)
            now = datetime.now(timezone.utc)
            if task_run and (now - last_progress_update).total_seconds() >= 5:
                await self._update_task_run_progress(task_run, session)
                last_progress_update = now

            if await self._handle_max_pages_limit(session, queue):
                break

            if not self._should_continue_processing(active_tasks, started_new_tasks):
                break

            active_tasks = await self._wait_for_and_process_completed_tasks(session, active_tasks)

        await self._cleanup_remaining_tasks(session, active_tasks)

    async def _start_new_tasks_from_queue(
        self,
        session: CrawlSession,
        queue: asyncio.Queue[str],
        visited: set[str],
        active_tasks: set,
        semaphore: asyncio.Semaphore,
    ) -> bool:
        """Start new tasks from the queue up to max concurrency.

        Returns:
            True if any new tasks were started, False otherwise
        """
        started_new_tasks = False
        while (
            len(active_tasks) < self.config.max_concurrency and not queue.empty() and not self._shutdown_event.is_set()
        ):
            try:
                url, content_types = queue.get_nowait()
                if url not in visited:
                    visited.add(url)
                    task = asyncio.create_task(
                        self._process_url(
                            session=session,
                            url=url,
                            content_types=content_types,
                            queue=queue,
                            semaphore=semaphore,
                            visited=visited,
                        )
                    )
                    active_tasks.add(task)
                    started_new_tasks = True
                else:
                    queue.task_done()
            except asyncio.QueueEmpty:
                break
        return started_new_tasks

    def _update_session_progress(
        self,
        session: CrawlSession,
        active_tasks: set,
        queue: asyncio.Queue[str],
    ) -> None:
        """Update session progress indicators."""
        session.progress.active_tasks = len(active_tasks)
        session.progress.queue_size = queue.qsize()
        session.progress.last_updated = datetime.now(timezone.utc)

    async def _handle_max_pages_limit(
        self,
        session: CrawlSession,
        queue: asyncio.Queue[str],
    ) -> bool:
        """Handle max pages limit by draining queue if limit reached.

        Returns:
            True if processing should stop due to limit, False to continue
        """
        # Safety check: ensure both values are not None before comparison
        if (
            session.max_pages is not None
            and session.progress.total_processed is not None
            and session.progress.total_processed >= session.max_pages
        ):
            # Drain the queue to avoid creating new tasks (log once)
            if queue.qsize() > 0:
                logger.info(
                    f"Max pages limit reached: {session.progress.total_processed}/{session.max_pages}. Finishing..."
                )
            while not queue.empty():
                try:
                    queue.get_nowait()
                    queue.task_done()
                except asyncio.QueueEmpty:
                    break
            return True
        return False

    def _should_continue_processing(
        self,
        active_tasks: set,
        started_new_tasks: bool,
    ) -> bool:
        """Check if we should continue the processing loop.

        Returns:
            True if processing should continue, False if done
        """
        if not active_tasks and not started_new_tasks:
            logger.info("No more URLs to process")
            return False
        return True

    async def _wait_for_and_process_completed_tasks(
        self,
        session: CrawlSession,
        active_tasks: set,
    ) -> set:
        """Wait for at least one task to complete and process results.

        Returns:
            Updated active_tasks set with completed tasks removed
        """
        if active_tasks:
            done, pending = await asyncio.wait(
                active_tasks,
                return_when=asyncio.FIRST_COMPLETED,
                timeout=1.0,
            )

            # Process completed tasks and update session stats
            for task in done:
                try:
                    result = await task
                    if result:
                        session.results.append(result)
                        session.progress.total_processed += 1
                        if result.is_regulatory:
                            session.progress.total_regulatory += 1
                        if result.obligations_alerts_count:
                            session.progress.total_obligation_alerts += result.obligations_alerts_count
                    else:
                        continue
                except asyncio.CancelledError:
                    logger.debug("Task was cancelled")
                except Exception as e:
                    logger.error(f"Task failed with exception: {e}")

            return pending
        else:
            await asyncio.sleep(0.1)
            return active_tasks

    async def _cleanup_remaining_tasks(
        self,
        session: CrawlSession,
        active_tasks: set,
    ) -> None:
        """Clean up remaining tasks gracefully, waiting for completion when possible."""
        if not active_tasks:
            return

        logger.info(f"Waiting for {len(active_tasks)} remaining tasks to complete...")
        try:
            # Wait for remaining tasks to complete naturally with a reasonable timeout
            done, pending = await asyncio.wait(
                active_tasks,
                timeout=30.0,
                return_when=asyncio.ALL_COMPLETED,
            )

            await self._process_cleanup_completed_tasks(session, done)
            await self._force_cancel_pending_tasks(pending)

        except Exception as e:
            logger.error(f"Error during task cleanup: {e}")
            await self._emergency_cancel_all_tasks(active_tasks)

    async def _process_cleanup_completed_tasks(
        self,
        session: CrawlSession,
        completed_tasks: set,
    ) -> None:
        """Process tasks that completed during cleanup."""
        for task in completed_tasks:
            try:
                result = await task
                if result:
                    session.results.append(result)
                    session.progress.total_processed += 1
                    if result.is_regulatory:
                        session.progress.total_regulatory += 1
                    if result.obligations_alerts_count:
                        session.progress.total_obligation_alerts += result.obligations_alerts_count
                    logger.debug(f"Updated session stats for cleanup task: {result.url}")
            except Exception as e:
                logger.error(f"Cleanup task failed: {e}", exc_info=False)

    async def _force_cancel_pending_tasks(self, pending_tasks: set) -> None:
        """Force cancel tasks that didn't complete within timeout."""
        if pending_tasks:
            logger.warning(f"Force cancelling {len(pending_tasks)} tasks that didn't complete within timeout")
            for task in pending_tasks:
                task.cancel()
            await asyncio.gather(*pending_tasks, return_exceptions=True)

    async def _emergency_cancel_all_tasks(self, active_tasks: set) -> None:
        """Emergency cancellation of all active tasks."""
        logger.warning("Emergency cancellation of all remaining tasks")
        for task in active_tasks:
            task.cancel()
        await asyncio.gather(*active_tasks, return_exceptions=True)

    async def _process_url(
        self,
        session: CrawlSession,
        url: str,
        content_types: list[ContentType | str],
        queue: asyncio.Queue[str],
        semaphore: asyncio.Semaphore,
        visited: set[str],
    ) -> CrawlResult | None:
        """Process a single URL and save results immediately."""
        result = None
        try:
            async with semaphore:
                logger.info(f"Processing URL: {url}")

                # Fetch content using pluggable fetcher
                document = await self._fetch_content(url)
                if not document:
                    result = CrawlResult(
                        url=url,
                        success=False,
                        error_message="Failed to fetch content",
                    )
                    # Save even failed fetch attempts to track them
                    await self._save_result(result, session)
                    return result

                await self._add_links_to_queue(
                    document=document,
                    session=session,
                    queue=queue,
                    visited=visited,
                    content_types=content_types,
                )

                # Skip if content too short
                if len(document.markdown.strip()) < self.config.min_content_length:
                    logger.info(f"Skipping classification for {url} - insufficient content")
                    result = CrawlResult(
                        url=url,
                        success=True,
                        status_code=document.status_code,
                        content_length=document.content_length,
                        fingerprint=document.fingerprint,
                        is_regulatory=False,
                        confidence=0.0,
                    )
                    await self._save_result(result, session)
                    return result

                # Skip classification if content fingerprint unchanged since last crawl
                unchanged = await self._is_document_unchanged(document=document, session=session)
                if unchanged:
                    logger.info(f"Content unchanged for {url} - skipping classification")
                    return

            # Classify content
            result = await self._classify_and_extract(document=document, content_types=content_types)
            if result:
                await self._save_result(result, session)
            return result

        except Exception as e:
            logger.error(f"Error processing {url}: {e}")
            result = CrawlResult(
                url=url,
                success=False,
                error_message=str(e),
            )
            # Save error results too for tracking
            await self._save_result(result, session)
            return result

    async def _fetch_content(self, url: str) -> DocumentExtraction | None:
        """Fetch content and enrich with links using the configured fetcher."""
        try:
            doc = await self.content_fetcher.fetch(url)
        except Exception as e:
            raise ContentFetchError(f"Failed to fetch {url}: {e}") from e

        if not doc:
            return None

        # Extract links from markdown via regex in this service for consistency
        links = [self._canonical_url(match) for match in MD_LINK_RE.findall(doc.markdown)]
        doc.links = links
        return doc

    async def _add_links_to_queue(
        self,
        document: DocumentExtraction,
        session: CrawlSession,
        queue: asyncio.Queue[str],
        visited: set[str],
        content_types: list[ContentType | str] | None = None,
    ):
        """Add extracted links to the crawl queue."""
        new_links = 0
        for link in document.links:
            if (link not in visited) and self._is_allowed_domain(link, session.allowed_domains):
                try:
                    queue.put_nowait((link, content_types))
                    new_links += 1
                    session.progress.total_discovered += 1
                except asyncio.QueueFull:
                    break

        if new_links > 0:
            logger.info(f"Found {new_links} new links from {document.url}")

    async def _classify_and_extract(
        self,
        document: DocumentExtraction,
        content_types: list[ContentType | str] | None = None,
    ) -> CrawlResult:
        """Classify content and extract obligations if regulatory."""
        try:
            classification = await self.classifier.classify_content(
                content=document.markdown,
                content_types=content_types,
            )

            result = CrawlResult(
                url=document.url,
                title=classification.title,
                success=True,
                status_code=document.status_code,
                content_length=document.content_length,
                fingerprint=document.fingerprint,
                is_regulatory=classification.is_regulatory,
                confidence=classification.confidence,
                categories=classification.categories,
            )

            # Extract obligations if regulatory
            if classification.is_regulatory:
                logger.info(f"Regulatory content found at {document.url}")

                try:
                    obligations = await self.classifier.extract_alerts(
                        content=document.markdown,
                        content_types=content_types,
                    )
                    result.obligations_alerts_count = len(obligations.obligations)
                    result.obligation_alerts = obligations.obligations

                    logger.info(f"Extracted {result.obligations_alerts_count} obligations from {document.url}")

                except Exception as e:
                    logger.error(f"Obligation extraction failed for {document.url}: {e}")
                    result.obligations_alerts_count = 0
                    result.obligation_alerts = None

            return result

        except Exception as e:
            logger.error(f"Classification failed for {document.url}: {e}")
            return CrawlResult(
                url=document.url,
                success=False,
                error_message=f"Classification failed: {str(e)}",
            )

    async def _is_document_unchanged(self, document: DocumentExtraction, session: CrawlSession) -> bool:
        """Check whether a fetched document has the same fingerprint as last persisted."""
        async with SessionLocal() as db:
            return await is_content_fingerprint_unchanged(
                db,
                url=document.url,
                fingerprint=document.fingerprint,
                organization_id=session.organization_id,
                regulatory_source_id=session.regulatory_source_id,
            )

    async def _save_result(
        self,
        result: CrawlResult,
        session: CrawlSession,
    ) -> bool:
        """Save crawl result immediately to database with proper error handling.

        Args:
            result: Crawl result to persist
            session: Current crawl session containing source and organization info

        Returns:
            True if persistence was successful, False otherwise
        """
        try:
            async with SessionLocal() as db:
                await create_monitored_page_version(
                    db,
                    result=result,
                    regulatory_source_id=session.regulatory_source_id,
                    organization_id=session.organization_id,
                )

                # Log what was saved
                if result.success:
                    if result.is_regulatory:
                        obligations_alerts_count = result.obligations_alerts_count or 0
                        confidence_value = result.confidence if result.confidence is not None else 0.0
                        logger.info(
                            f"✅ Saved regulatory page: {result.url} "
                            f"(confidence={confidence_value:.2f}, "
                            f"obligations_alerts={obligations_alerts_count}, "
                            f"categories={result.categories or []})"
                        )
                    else:
                        logger.info(f"✅ Saved non-regulatory page: {result.url}")
                else:
                    logger.info(f"✅ Saved failed page attempt: {result.url} (error: {result.error_message})")

                return True

        except Exception as persist_err:
            logger.error(
                f"❌ Failed to persist page result for {result.url}: {persist_err}. "
                f"Data for this page will be lost!"
            )
            # Don't re-raise to avoid stopping the crawl for persistence failures
            # but log clearly that data was lost
            return False

    def _get_allowed_domain(self, url: str) -> list[str]:
        """Extract base domain from a single URL."""
        try:
            domain = extract_domain_from_url(url)
            return [domain]
        except ValueError as e:
            logger.error(f"Failed to extract allowed domain from {url}: {e}")
            return []

    def _is_allowed_domain(self, url: str, allowed_domains: list[str]) -> bool:
        """Check if URL belongs to allowed domains."""

        try:
            domain = extract_domain_from_url(url)

            for allowed_domain in allowed_domains:
                if domain == allowed_domain or domain.endswith("." + allowed_domain):
                    return True

            return False
        except Exception:
            return False

    def _canonical_url(self, raw: str) -> str:
        """Normalize URL by stripping fragment and tracking parameters."""
        try:
            parsed = urlparse(raw)
            parsed = parsed._replace(fragment="")
            qs = [
                (k, v)
                for k, v in parse_qsl(parsed.query, keep_blank_values=True)
                if k.lower() not in self.config.tracking_params
            ]
            parsed = parsed._replace(query=urlencode(sorted(qs)))
            return urlunparse(parsed).rstrip("/")
        except Exception as e:
            logger.error(f"Failed to canonicalize URL: {e}")
            return raw

    def _build_base_seed(self, url: str) -> str:
        """Build a base URL from a single URL (scheme://host format).

        Args:
            url: Input URL to normalize

        Returns:
            Base URL in scheme://host format
        """
        try:
            return build_base_url_from_url(url)
        except ValueError as e:
            logger.error(f"Failed to build base seed for {url}: {e}")
            raise

    async def _resolve_redirects(self, url: str, max_hops: int) -> str:
        """Follow HTTP redirects up to the specified maximum hops."""
        for _ in range(max_hops):
            try:
                response = await self._http_client.request("HEAD", url, follow_redirects=False)
                if response.status_code in (301, 302, 303, 307, 308):
                    next_url = response.headers.get("Location")
                    if next_url:
                        url = urljoin(url, next_url)
                        continue
            except Exception as e:
                logger.error(f"Failed to resolve redirects: {e}")
                pass
            break
        return url

    def _calculate_final_statistics(self, session: CrawlSession):
        """Calculate final statistics for completed session."""
        total_results = len(session.results)
        if total_results == 0:
            return

        regulatory_results = [r for r in session.results if r.is_regulatory]

        # Update progress with final counts
        session.progress.total_processed = total_results
        session.progress.total_regulatory = len(regulatory_results)
        session.progress.total_obligation_alerts = sum(r.obligations_alerts_count or 0 for r in session.results)

        # Calculate processing time
        if session.created_at and session.completed_at:
            processing_time = (session.completed_at - session.created_at).total_seconds()
            session.progress.processing_time = processing_time

    async def aclose(self) -> None:
        """Clean up service resources."""
        if self.content_fetcher is not None:
            await self.content_fetcher.close()

    async def __aenter__(self) -> "CrawlerService":
        """Enter async context manager."""
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        """Exit async context manager."""
        await self.aclose()
