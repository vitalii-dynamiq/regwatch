"""Scheduler management tasks."""

from datetime import datetime, timedelta, timezone

from sqlalchemy import select

from app.core.loggers import init_logger, logger
from app.core.settings import settings
from app.db.pg.base import SessionLocal
from app.db.pg.models.sources import MonitoringFrequency, Source
from app.taskiq.broker import broker
from app.taskiq.tasks.crawler_tasks import process_regulatory_source_task

if not logger.handlers:
    init_logger([logger])


def _should_run_source(source: Source, now: datetime) -> bool:
    """Determine if a source should run based on its last run time and frequency.

    Args:
        source: The regulatory source to check
        now: Current datetime

    Returns:
        True if the source should run now
    """
    if not source.last_monitoring_scheduled_at:
        return True

    # Define stuck task threshold
    threshold_seconds = settings.TASKIQ_STUCK_TASK_THRESHOLD_HOURS * 3600

    # If scheduled but not started (waiting in queue), check if stuck
    # Check if scheduled time is more recent than last started time (pending in queue)
    if source.last_monitoring_scheduled_at and (
        not source.last_monitoring_started_at or source.last_monitoring_scheduled_at > source.last_monitoring_started_at
    ):
        time_since_scheduled = (now - source.last_monitoring_scheduled_at).total_seconds()
        if time_since_scheduled > threshold_seconds:
            logger.warning(
                f"Source {source.name} was scheduled but never started "
                f"(scheduled at {source.last_monitoring_scheduled_at}), allowing rerun"
            )
            return True
        logger.debug(f"Source {source.name} is queued and waiting for worker, skipping")
        return False

    # Check if started but not completed (currently running or stuck while running)
    last_completed = source.last_monitoring_completed_at or datetime.min.replace(tzinfo=timezone.utc)
    if source.last_monitoring_started_at and source.last_monitoring_started_at > last_completed:
        if (now - source.last_monitoring_started_at).total_seconds() > threshold_seconds:
            logger.warning(
                f"Source {source.name} appears stuck while running "
                f"(started {source.last_monitoring_started_at}), allowing rerun"
            )
            return True
        return False

    # If never completed, should run (edge case)
    if not source.last_monitoring_completed_at:
        logger.debug(f"Source {source.name} has never completed, scheduling")
        return True

    # Calculate next run time based on frequency
    interval_minutes = MonitoringFrequency.get_interval_minutes(source.monitoring_frequency)
    next_run_time = source.last_monitoring_completed_at + timedelta(minutes=interval_minutes)

    # Check if it's time to run
    should_run = now >= next_run_time
    if should_run:
        logger.debug(
            f"Source {source.name} should run: last_run={source.last_monitoring_completed_at}, "
            f"next_run={next_run_time}, frequency={source.monitoring_frequency}"
        )
    return should_run


@broker.task(
    schedule=[
        {
            "cron": "*/15 * * * *",  # Every 15 minutes
        }
    ]
)
async def discover_and_schedule_sources_task() -> dict:
    """Discover enabled regulatory sources and schedule them based on their frequency.

    This task runs every 15 minutes to:
    1. Find all enabled sources
    2. Check which ones need to run based on their last run time and frequency
    3. Kick off crawl tasks for sources that are due

    Returns:
        Dict with statistics about discovered and scheduled sources
    """
    logger.info("Starting source discovery and scheduling")

    async with SessionLocal() as db:
        try:
            # Query all enabled sources
            stmt = select(Source).where(Source.monitoring_enabled == True)  # noqa: E712
            result = await db.execute(stmt)
            sources = result.scalars().all()

            total_sources = len(sources)
            scheduled_count = 0
            skipped_count = 0
            now = datetime.now(timezone.utc)

            logger.info(f"Found {total_sources} enabled sources to check")

            for source in sources:
                db.expunge(source)

            for source in sources:
                try:
                    if _should_run_source(source, now):
                        source = await db.merge(source)

                        # Queue the task first to ensure it's successfully enqueued
                        await process_regulatory_source_task.kiq(
                            regulatory_source_id=str(source.id),
                            max_pages=None,
                        )

                        source.last_monitoring_scheduled_at = now
                        await db.commit()

                        scheduled_count += 1
                        logger.info(
                            f"Scheduled crawl for source '{source.name}' (frequency: {source.monitoring_frequency})"
                        )
                    else:
                        skipped_count += 1
                        logger.debug(f"Skipped source '{source.name}' - not due yet")

                except Exception as e:
                    logger.error(f"Failed to schedule source {source.name}: {e}")
                    await db.rollback()
                    continue

            result = {
                "total_sources": total_sources,
                "scheduled": scheduled_count,
                "skipped": skipped_count,
                "checked_at": now.isoformat(),
            }

            logger.info(
                f"Source scheduling complete: {scheduled_count} scheduled, "
                f"{skipped_count} skipped out of {total_sources} total"
            )

            return result

        except Exception as e:
            logger.error(f"Failed to discover and schedule sources: {e}", exc_info=True)
            raise
