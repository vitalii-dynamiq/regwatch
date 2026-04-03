import logging

from taskiq import TaskiqScheduler
from taskiq.schedule_sources import LabelScheduleSource
from taskiq_pg.asyncpg import AsyncpgScheduleSource

from app.core.loggers import init_logger, logger
from app.core.settings import settings
from app.taskiq.broker import broker

if not logger.handlers:
    init_logger([logger], level=logging.INFO, with_request_ctx_metadata=False)


scheduler = TaskiqScheduler(
    broker=broker,
    sources=[
        LabelScheduleSource(broker),
        AsyncpgScheduleSource(
            dsn=settings.db_taskiq_url,
            table_name="schedules",  # Store schedules in taskiq schema
        ),
    ],
)
