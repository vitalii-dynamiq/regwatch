import uuid

from app.core.loggers import init_logger, logger
from app.db.pg.base import SessionLocal
from app.db.pg.models.task_runs import TaskRun, TaskRunType
from app.services.crawler.models import CrawlStatus
from app.services.crawler.service import CrawlerService
from app.services.sources import get_source_by_id_and_filters
from app.taskiq.broker import broker
from app.taskiq.models import CrawlTaskResult

if not logger.handlers:
    init_logger([logger])


@broker.task
async def process_regulatory_source_task(
    regulatory_source_id: str,
    max_pages: int | None = None,
) -> CrawlTaskResult:
    """Task to process a single regulatory source.

    Args:
        regulatory_source_id: ID of the regulatory source to process
        max_pages: Maximum number of pages to crawl

    Returns:
        CrawlTaskResult with processing results
    """
    logger.info(
        f"🚀 TASK PICKED UP: process_regulatory_source_task for source {regulatory_source_id}, "
        f"max_pages={max_pages}"
    )
    logger.info(f"Starting regulatory source processing task for source {regulatory_source_id}")

    try:
        # Create TaskRun for tracking this operation
        task_run = None
        regulatory_source = None
        async with SessionLocal() as db:
            try:
                regulatory_source = await get_source_by_id_and_filters(db=db, source_id=regulatory_source_id)
                if not regulatory_source:
                    raise ValueError(f"Regulatory source {regulatory_source_id} not found")

                # Generate unique task ID for tracking
                task_id = f"crawler_task_{uuid.uuid4().hex[:12]}"

                # Create TaskRun for source processing
                task_run = TaskRun.create_for_individual_task(
                    task_id=task_id,
                    task_name="process_regulatory_source_task",
                    task_run_type=TaskRunType.MANUAL_CRAWL,
                    organization_id=regulatory_source.organization_id,
                    source_id=regulatory_source.id,
                )

                db.add(task_run)
                task_run.set_started()
                await db.commit()
                await db.refresh(task_run)

                logger.info(
                    f"Created TaskRun {task_run.id} for processing source "
                    f"{regulatory_source.id} ({regulatory_source.name})"
                )

            except Exception as e:
                source_identifier = (
                    f"{regulatory_source.id} ({regulatory_source.name})"
                    if regulatory_source
                    else f"{regulatory_source_id}"
                )
                logger.error(f"Failed to create TaskRun for source {source_identifier}: {e}")

        if not regulatory_source:
            raise ValueError(f"Failed to fetch regulatory source {regulatory_source_id}")

        async with CrawlerService() as crawler:
            completed_session = await crawler.run_source(
                regulatory_source=regulatory_source,
                max_pages=max_pages,
                create_task_run=False,  # TaskRun is already created above
                task_run=task_run,  # Pass the created TaskRun for real-time progress updates
            )

        # Calculate processing time
        processing_time = None
        if completed_session.completed_at and completed_session.created_at:
            processing_time = (completed_session.completed_at - completed_session.created_at).total_seconds()

        # Update TaskRun with final results immediately
        if task_run:
            try:
                async with SessionLocal() as db:
                    # Re-fetch task_run to attach to current session
                    task_run_db = await db.get(TaskRun, task_run.id)
                    if task_run_db:
                        # Update stats with crawl results
                        task_run_db.update_stats(
                            total_pages=completed_session.progress.total_processed,
                            total_obligations=completed_session.progress.total_obligation_alerts,
                            total_alerts=completed_session.progress.total_regulatory,
                            crawler_session_id=completed_session.session_id,
                            processing_time_seconds=processing_time,
                        )

                        # Mark as completed and commit immediately
                        error_msg = (
                            completed_session.error_message if completed_session.status == CrawlStatus.FAILED else None
                        )
                        task_run_db.set_completed(error_message=error_msg)
                        await db.commit()

                        logger.info(f"Updated TaskRun {task_run.id} with source processing results")
            except Exception as update_error:
                logger.error(f"Failed to update TaskRun {task_run.id} with final results: {update_error}")
                # Don't let task tracking failure affect the main result

        # Return results as Pydantic model
        result = CrawlTaskResult(
            session_id=completed_session.session_id,
            status=completed_session.status,
            total_processed=completed_session.progress.total_processed,
            total_regulatory=completed_session.progress.total_regulatory,
            total_obligations=completed_session.progress.total_obligation_alerts,
            processing_time_seconds=processing_time,
            error_message=completed_session.error_message,
        )
        logger.info(
            f"✅ TASK COMPLETED: process_regulatory_source_task for source {regulatory_source_id} "
            f"- Status: {result.status}, Processed: {result.total_processed}"
        )
        return result

    except Exception as e:
        logger.error(
            f"❌ TASK FAILED: process_regulatory_source_task for source {regulatory_source_id} - " f"Error: {e}"
        )

        # Update TaskRun with error immediately
        if task_run:
            try:
                async with SessionLocal() as db:
                    # Re-fetch task_run to attach to current session
                    task_run_db = await db.get(TaskRun, task_run.id)
                    if task_run_db:
                        task_run_db.set_completed(error_message=str(e))
                        await db.commit()
                        logger.info(f"Updated TaskRun {task_run.id} with error: {str(e)}")
            except Exception as db_error:
                logger.error(f"Failed to update TaskRun {task_run.id} with error: {db_error}")
                # Don't let task tracking failure mask the original error

        return CrawlTaskResult(
            session_id="failed",
            status=CrawlStatus.FAILED,
            total_processed=0,
            total_regulatory=0,
            total_obligations=0,
            error_message=str(e),
        )
