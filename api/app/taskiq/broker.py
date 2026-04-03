from taskiq_pg.asyncpg import AsyncpgBroker, AsyncpgResultBackend

from app.core.loggers import init_logger, logger
from app.core.settings import settings
from app.taskiq.middlewares.admin import TaskiqAdminMiddleware

if not logger.handlers:
    logger = init_logger([logger])


class ReliableAsyncpgBroker(AsyncpgBroker):
    """Asyncpg broker that replays pending jobs left in the database."""

    async def startup(self) -> None:
        """Initialize broker connections and re-emit pending notifications."""
        await super().startup()
        await self._requeue_pending_messages()

    async def _requeue_pending_messages(self) -> None:
        """Send NOTIFY events for messages inserted while workers were offline."""
        if self._write_pool is None:
            logger.warning("Taskiq broker write pool is not initialized; cannot requeue pending messages.")
            return

        async with self._write_pool.acquire() as conn:
            pending_ids = await conn.fetch(
                f"SELECT id FROM {self.table_name} WHERE status = 'pending' ORDER BY created_at"  # nosec
            )

            if not pending_ids:
                logger.debug("No pending Taskiq messages found on startup.")
                return

            logger.info("Re-notifying %s pending Taskiq message(s) after worker startup.", len(pending_ids))
            for record in pending_ids:
                await conn.execute(
                    "SELECT pg_notify($1, $2::text)",
                    self.channel_name,
                    str(record["id"]),
                )


def init_broker() -> AsyncpgBroker:
    """Initialize and return a PostgreSQL-backed Taskiq broker using asyncpg driver."""
    broker = ReliableAsyncpgBroker(
        dsn=settings.db_taskiq_url,  # DSN includes search_path=taskiq
        table_name="tasks",  # Will be created in taskiq schema due to search_path
    ).with_result_backend(
        AsyncpgResultBackend(
            dsn=settings.db_taskiq_url,  # DSN includes search_path=taskiq
            table_name="results",  # Will be created in taskiq schema due to search_path
        )
    )

    broker = broker.with_middlewares(
        TaskiqAdminMiddleware(
            url=settings.TASKIQ_ADMIN_URL,
            api_token=settings.TASKIQ_ADMIN_API_TOKEN,
            broker_name="regwatch-broker",
        )
    )

    try:
        import taskiq_fastapi  # type: ignore[import-not-found]
        taskiq_fastapi.init(broker, "app.main:app")
    except ImportError:
        pass

    return broker


broker: AsyncpgBroker = init_broker()

# Ensure tasks are registered on import for worker processes.
# Importing this package imports all task modules via its __init__ side effects.
# Import after broker initialization to avoid circular imports.
import app.taskiq.tasks  # noqa: F401, E402
