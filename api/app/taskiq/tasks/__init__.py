"""Taskiq tasks package - imports and registers all tasks."""

import logging

from dynamiq.utils.logger import logger as dynamiq_logger

from app.core.loggers import init_logger
from app.core.loggers import logger as app_logger

# Import all tasks to ensure they're registered with the broker
from app.taskiq.tasks.crawler_tasks import process_regulatory_source_task  # noqa: F401
from app.taskiq.tasks.scheduler_tasks import discover_and_schedule_sources_task  # noqa: F401

logger = logging.getLogger("taskiq.tasks")

init_logger([logger, app_logger, dynamiq_logger], level=logging.INFO)

__all__ = [
    "process_regulatory_source_task",
    "discover_and_schedule_sources_task",
]

logger.info(f"Registered {len(__all__)} tasks: {', '.join(__all__)}")
