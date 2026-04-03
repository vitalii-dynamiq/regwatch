"""Main crawler module for web crawling and content extraction."""

import asyncio
import logging
from datetime import datetime, timezone
from typing import Any, Iterable
from urllib.parse import urlparse

import aiohttp
from sqlalchemy import select

from .classifier import classify, extract_obligations
from .config import settings
from .models import PageVersion, Session, Source, init_db
from .utils import MD_LINK_RE, canonical_url, resolve_redirects, sha256

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Crawler:
    """Async BFS crawler that persists only regulatory pages.

    Crawls web pages using Jina for content extraction,
    classifies content using Together AI, and stores only regulatory
    content in the database.
    """

    def __init__(self, seeds: Iterable[str]):
        """Initialize crawler with seed URLs.

        Args:
            seeds: Iterable of seed URLs to start crawling from
        """
        self.seeds: list[str] = [canonical_url(u) for u in seeds]
        self.todo: asyncio.Queue[str] = asyncio.Queue()
        for s in self.seeds:
            self.todo.put_nowait(s)
        self.visited: set[str] = set()
        self.sem = asyncio.Semaphore(settings.max_concurrency)
        self.shutdown_event = asyncio.Event()
        self.active_tasks: set = set()
        
        # Extract allowed domains from seed URLs
        self.allowed_domains = self._extract_allowed_domains(self.seeds)
        logger.info(f"Allowed domains: {self.allowed_domains}")

    def _extract_allowed_domains(self, urls: list[str]) -> set[str]:
        """Extract base domains from seed URLs.
        
        Args:
            urls: List of seed URLs
            
        Returns:
            Set of allowed base domains
        """
        domains = set()
        for url in urls:
            parsed = urlparse(url)
            domain = parsed.netloc.lower()
            
            # Remove www. prefix if present
            if domain.startswith('www.'):
                domain = domain[4:]
                
            domains.add(domain)
            
        return domains

    def _is_allowed_domain(self, url: str) -> bool:
        """Check if URL belongs to allowed domains or their subdomains.
        
        Args:
            url: URL to check
            
        Returns:
            True if URL is from allowed domain or subdomain
        """
        try:
            parsed = urlparse(url)
            domain = parsed.netloc.lower()
            
            # Remove www. prefix if present
            if domain.startswith('www.'):
                domain = domain[4:]
            
            # Check if domain exactly matches or is a subdomain
            for allowed_domain in self.allowed_domains:
                if (domain == allowed_domain or 
                        domain.endswith('.' + allowed_domain)):
                    return True
                    
            return False
            
        except Exception:
            return False

    async def run(self) -> None:
        """Start the crawling process."""
        logger.info("Initializing database...")
        await init_db()
        
        timeout = aiohttp.ClientTimeout(total=120)
        async with aiohttp.ClientSession(timeout=timeout) as client:
            # Resolve seed redirects
            logger.info(f"Resolving redirects for {len(self.seeds)} seed URLs")
            resolved = []
            for u in self.seeds:
                try:
                    resolved_url = canonical_url(
                        await resolve_redirects(
                            client, u, settings.max_redirects
                        )
                    )
                    resolved.append(resolved_url)
                    logger.info(f"Resolved {u} -> {resolved_url}")
                except Exception as e:
                    logger.error(f"Failed to resolve {u}: {e}")
                    
            # Clear queue and add resolved URLs
            while not self.todo.empty():
                try:
                    self.todo.get_nowait()
                    self.todo.task_done()
                except asyncio.QueueEmpty:
                    break
                    
            for u in resolved:
                await self.todo.put(u)

            # Process URLs continuously
            await self._process_queue(client)

    def shutdown(self):
        """Request shutdown of the crawler."""
        logger.info("Shutdown requested")
        self.shutdown_event.set()

    async def _process_queue(self, client: aiohttp.ClientSession):
        """Process URLs from queue until empty."""
        while not self.shutdown_event.is_set():
            # Check for shutdown more frequently
            if self.shutdown_event.is_set():
                logger.info("Shutdown requested during queue processing")
                break
                
            # Start new tasks for available URLs
            started_new_tasks = False
            while (
                len(self.active_tasks) < settings.max_concurrency 
                and not self.todo.empty()
                and not self.shutdown_event.is_set()  # Check shutdown here too
            ):
                try:
                    url = self.todo.get_nowait()
                    if url not in self.visited:
                        self.visited.add(url)
                        task = asyncio.create_task(
                            self._worker(client, url)
                        )
                        self.active_tasks.add(task)
                        started_new_tasks = True
                    else:
                        self.todo.task_done()
                except asyncio.QueueEmpty:
                    break
            
            # If no active tasks and no new tasks started, we're done
            if not self.active_tasks and not started_new_tasks:
                logger.info("No more URLs to process")
                break
            
            # Wait for at least one task to complete (with shorter timeout)
            if self.active_tasks:
                done, pending = await asyncio.wait(
                    self.active_tasks, 
                    return_when=asyncio.FIRST_COMPLETED,
                    timeout=1.0  # Reduced from 5 seconds to 1 second
                )
                
                # Remove completed tasks and check for exceptions
                self.active_tasks = pending
                for task in done:
                    try:
                        await task
                    except Exception as e:
                        logger.error(f"Task failed: {e}")
            else:
                # No active tasks, wait briefly and check shutdown
                await asyncio.sleep(0.1)  # Much shorter sleep
        
        # Clean up remaining tasks
        if self.active_tasks:
            remaining_count = len(self.active_tasks)
            logger.info(f"Waiting for {remaining_count} remaining tasks...")
            # Cancel remaining tasks if shutdown requested
            for task in self.active_tasks:
                task.cancel()
            await asyncio.gather(*self.active_tasks, return_exceptions=True)

    async def _worker(
        self, client: aiohttp.ClientSession, url: str
    ) -> None:
        """Worker coroutine that processes a single URL."""
        try:
            if self.shutdown_event.is_set():
                return
                
            async with self.sem:
                if self.shutdown_event.is_set():  # Check again after acquiring semaphore
                    return
                logger.info(f"Processing URL: {url}")
                doc = await self._fetch_via_jina(client, url)
                
            if not doc:
                logger.warning(f"Failed to fetch content from {url}")
                return
                
            if self.shutdown_event.is_set():  # Check before processing
                return
                
            logger.info(f"Fetched {len(doc['markdown'])} chars from {url}")

            # Add new links to queue
            new_links = 0
            for link in doc["links"]:
                if self.shutdown_event.is_set():
                    break
                canon = canonical_url(link)
                if canon not in self.visited:
                    if self._is_allowed_domain(canon):
                        await self.todo.put(canon)
                        new_links += 1
            
            if new_links > 0 and not self.shutdown_event.is_set():
                logger.info(f"Found {new_links} new links from {url}")

            # Only classify if we have substantial content
            if len(doc["markdown"].strip()) < 100:
                logger.info(f"Skipping classification for {url} - no content")
                # Still persist source metadata for tracking
                if not self.shutdown_event.is_set():
                    await self._persist_source(doc)
                return

            # Check if content changed since last classification
            if not self.shutdown_event.is_set() and await self._content_unchanged(
                doc["url"], doc["fingerprint"]
            ):
                logger.info(
                    f"Content unchanged for {url} - skipping classification"
                )
                # Still update source metadata
                if not self.shutdown_event.is_set():
                    await self._persist_source(doc)
                return

            # Always persist source metadata for change detection
            if not self.shutdown_event.is_set():
                await self._persist_source(doc)

            # Classify and persist if relevant
            if not self.shutdown_event.is_set():
                try:
                    logger.info(f"Classifying content from {url}")
                    classification = await classify(doc["markdown"])
                    
                    # Check for classification errors (None return)
                    if classification is None:
                        logger.error(
                            f"Classification failed for {url} - skipping"
                        )
                        return  # Skip processing on error
                    
                    # Ensure classification is valid
                    if not isinstance(classification, dict):
                        logger.warning(
                            f"Invalid classification result for {url}"
                        )
                        return  # Skip processing on invalid result
                    
                    logger.info(
                        f"Classification for {url}: "
                        f"regulatory={classification.get('is_regulatory', False)}, "
                        f"confidence={classification.get('confidence', 0):.2f}"
                    )
                    
                    if classification.get("is_regulatory"):
                        confidence = classification.get('confidence', 0)
                        logger.info(
                            f"✓ Regulatory content found at {url} - "
                            f"confidence: {confidence:.2f}"
                        )
                        
                        # Extract obligations from regulatory content
                        logger.info(
                            f"Extracting obligations from {url}"
                        )
                        
                        try:
                            obligations = await extract_obligations(
                                doc["markdown"]
                            )
                            
                            logger.info(
                                f"Obligation extraction for {url}: "
                                f"found={not obligations.get('no_obligations_found', True)}, "
                                f"count={len(obligations.get('obligations', []))}"
                            )
                            
                        except Exception as e:
                            logger.error(
                                f"Obligation extraction failed for {url}: {e}"
                            )
                            obligations = {
                                "no_obligations_found": True,
                                "obligations": [],
                                "extraction_metadata": {"error": str(e)}
                            }
                        
                        # Combine classification and obligations
                        combined_meta = {
                            "classification": classification,
                            "obligations": obligations
                        }
                        
                        logger.info(f"Combined metadata for {url}:")
                        logger.info(f"  Classification: {classification}")
                        logger.info(f"  Obligations: {obligations}")
                        logger.info(f"  Combined size: {len(str(combined_meta))} chars")
                        
                        logger.info(
                            f"Persisting regulatory content for {url}"
                        )
                        await self._persist_regulatory(doc, combined_meta)
                        logger.info(
                            f"✓ Successfully persisted regulatory content for {url}"
                        )
                        
                    else:
                        logger.info(f"✗ Non-regulatory content at {url}")
                    
                except Exception as e:
                    logger.error(f"Classification failed for {url}: {e}")
                    # Still create a default classification for logging
                    classification = {
                        "is_regulatory": False,
                        "confidence": 0.0,
                        "categories": [],
                        "error": str(e)
                    }
                    
        except Exception as e:
            logger.error(f"Worker error for {url}: {e}")
        finally:
            self.todo.task_done()

    async def _fetch_via_jina(
        self, client: aiohttp.ClientSession, url: str
    ) -> dict[str, Any] | None:
        """Fetch and convert content using Jina."""
        headers = {
            "Authorization": f"Bearer {settings.jina_api_key}",
            "X-Base": "final",
            "X-Engine": "browser",
            "X-Return-Format": "markdown",
            "X-Retain-Images": "none",
        }
        
        try:
            async with client.get(
                f"{settings.jina_endpoint}{url}", 
                headers=headers, 
                ssl=False
            ) as resp:
                status = resp.status
                raw = await resp.read()
                text_md = raw.decode(errors="ignore")
                
                logger.debug(
                    f"Jina response for {url}: status={status}, "
                    f"length={len(raw)}"
                )
                
        except Exception as e:
            logger.error(f"Error fetching {url}: {e}")
            return None

        if status != 200:
            logger.warning(f"Non-200 status for {url}: {status}")
            return None
            
        if not text_md.strip():
            logger.warning(f"Empty content from {url}")
            return None

        # Extract links from markdown
        links = [canonical_url(m) for m in MD_LINK_RE.findall(text_md)]

        return {
            "url": url,
            "status": status,
            "length": len(raw),
            "fingerprint": sha256(raw),
            "markdown": text_md,
            "links": links,
        }

    async def _persist_source(self, document: dict[str, Any]) -> None:
        """Persist source metadata to the database."""
        url, fp = document["url"], document["fingerprint"]
        
        # Create new session for this operation to avoid concurrency issues
        async with Session() as db:
            try:
                async with db.begin():
                    await self._do_persist_source(
                        db, document, url, fp
                    )
                        
                logger.info(f"✓ Persisted source metadata for {url}")
                
            except Exception as e:
                logger.error(
                    f"Failed to persist source metadata for {url}: {e}"
                )

    async def _do_persist_source(
        self, db: Session, document: dict[str, Any], url: str, fp: str
    ) -> None:
        """Internal persist source metadata logic without transaction 
        management."""
        # Use optimistic locking to reduce contention
        src = await db.scalar(
            select(Source).where(Source.canonical_url == url)
        )

        if src and src.last_fingerprint == fp:
            # unchanged – just bump last_crawled
            logger.debug(f"Source metadata unchanged for {url}")
            src.last_crawled = datetime.now(timezone.utc)
            src.last_status = document["status"]
            src.last_length = document["length"]
            return

        if src is None:
            logger.info(
                f"Creating new source record for regulatory content: {url}"
            )
            try:
                src = Source(
                    canonical_url=url,
                    host=urlparse(url).netloc,
                    last_fingerprint=fp,
                    last_status=document["status"],
                    last_length=document["length"],
                )
                db.add(src)
                await db.flush()
            except Exception:
                # Race condition: another process created it
                # Retry with existing record
                src = await db.scalar(
                    select(Source).where(Source.canonical_url == url)
                )
                if not src:
                    raise  # Unexpected error
        else:
            # Update existing source
            src.last_fingerprint = fp
            src.last_status = document["status"]
            src.last_length = document["length"]

        # Don't create PageVersion for source metadata - only update Source

    async def _content_unchanged(self, url: str, fingerprint: str) -> bool:
        """Check if content has changed since last classification."""
        async with Session() as db:
            src = await db.scalar(
                select(Source).where(Source.canonical_url == url)
            )
            if not src:
                return False  # Source record not found

            return src.last_fingerprint == fingerprint

    async def _persist_regulatory(
        self, document: dict[str, Any], classification: dict[str, Any]
    ) -> None:
        """Persist regulatory content to the database."""
        url, fp = document["url"], document["fingerprint"]
        
        # Create new session for this operation to avoid concurrency issues
        async with Session() as db:
            try:
                async with db.begin():
                    await self._do_persist_regulatory(
                        db, document, classification, url, fp
                    )
                        
                logger.info(f"✓ Persisted regulatory content from {url}")
                
            except Exception as e:
                logger.error(f"Failed to persist {url}: {e}")
                # Session will auto-rollback on exception

    async def _do_persist_regulatory(
        self, 
        db: Session, 
        document: dict[str, Any], 
        classification: dict[str, Any], 
        url: str, 
        fp: str
    ) -> None:
        """Internal persist regulatory content logic without transaction 
        management."""
        # Get or create source record
        src = await db.scalar(
            select(Source).where(Source.canonical_url == url)
        )

        if src is None:
            logger.info(
                f"Creating new source record for regulatory content: {url}"
            )
            try:
                src = Source(
                    canonical_url=url,
                    host=urlparse(url).netloc,
                    last_fingerprint=fp,
                    last_status=document["status"],
                    last_length=document["length"],
                )
                db.add(src)
                await db.flush()
            except Exception:
                # Race condition: another process created it
                # Retry with existing record
                src = await db.scalar(
                    select(Source).where(Source.canonical_url == url)
                )
                if not src:
                    raise  # Unexpected error
        else:
            # Update existing source record
            logger.debug(
                f"Updating source record for regulatory content: {url}"
            )
            src.last_fingerprint = fp
            src.last_status = document["status"]
            src.last_length = document["length"]

        # Always create PageVersion for regulatory content
        # Import run_id from main module
        from . import run_id

        logger.info(
            f"Creating PageVersion record for {url} with "
            f"{len(classification.get('obligations', {}).get('obligations', []))} "
            f"obligations"
        )
        
        # Debug what's being stored
        logger.info(f"Storing metadata type: {type(classification)}")
        logger.info(f"Metadata keys: {list(classification.keys()) if isinstance(classification, dict) else 'Not a dict'}")
        if isinstance(classification, dict):
            if 'obligations' in classification:
                obligations_data = classification['obligations']
                logger.info(f"Obligations data: {obligations_data}")
                if isinstance(obligations_data, dict):
                    logger.info(f"Obligations found: {not obligations_data.get('no_obligations_found', True)}")
                    logger.info(f"Number of obligations: {len(obligations_data.get('obligations', []))}")
        
        page_version = PageVersion(
            run_id=run_id,
            source_id=src.id,
            fingerprint=fp,
            meta=classification,  # Store the full classification dict
            markdown=document["markdown"],
        )
        db.add(page_version)
        
        logger.debug(f"Added PageVersion to session for {url}")
