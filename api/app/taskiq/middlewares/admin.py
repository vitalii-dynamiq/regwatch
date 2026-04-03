from datetime import datetime, timezone
from typing import Any

from taskiq import TaskiqMessage, TaskiqMiddleware, TaskiqResult

from app.core.clients.http import HttpClient
from app.core.loggers import logger


class TaskiqAdminMiddleware(TaskiqMiddleware):
    """Middleware to send task events to Taskiq Admin panel."""

    def __init__(self, url: str, api_token: str, broker_name: str | None = None):
        """Initialize the middleware.

        Args:
            url: URL of the Taskiq Admin instance
            api_token: API token for authentication
            broker_name: Name of the broker for identification
        """
        super().__init__()
        self.url = url
        self.api_token = api_token
        self.broker_name = broker_name
        self.http_client = HttpClient(base_url=self.url)

    async def post_send(self, message: TaskiqMessage) -> None:
        """Called after a message is sent to the broker."""
        now = datetime.now(timezone.utc).replace(tzinfo=None).isoformat()

        try:
            await self.http_client.request(
                method="POST",
                url_path=f"/api/tasks/{message.task_id}/queued",
                headers={"access-token": self.api_token},
                json={
                    "args": message.args,
                    "kwargs": message.kwargs,
                    "taskName": message.task_name,
                    "worker": self.broker_name,
                    "queuedAt": now,
                },
            )
        except Exception as e:
            logger.error(f"Failed to send queued event to Taskiq Admin. Error: {e}")

    async def pre_execute(self, message: TaskiqMessage) -> TaskiqMessage:
        """Called before task execution starts."""
        now = datetime.now(timezone.utc).replace(tzinfo=None).isoformat()

        try:
            await self.http_client.request(
                method="POST",
                url_path=f"/api/tasks/{message.task_id}/started",
                headers={"access-token": self.api_token},
                json={
                    "startedAt": now,
                    "args": message.args,
                    "kwargs": message.kwargs,
                    "taskName": message.task_name,
                    "worker": self.broker_name,
                },
            )
        except Exception as e:
            logger.error(f"Failed to send started event to Taskiq Admin. Error: {e}")

        return message

    async def post_execute(self, message: TaskiqMessage, result: TaskiqResult[Any]) -> None:
        """Called after task execution completes."""
        now = datetime.now(timezone.utc).replace(tzinfo=None).isoformat()

        try:
            serialized_return_value: Any = None
            if result.return_value is not None:
                if hasattr(result.return_value, "model_dump"):
                    serialized_return_value = result.return_value.model_dump()
                elif isinstance(result.return_value, dict):
                    serialized_return_value = result.return_value
                else:
                    serialized_return_value = str(result.return_value)

            await self.http_client.request(
                method="POST",
                url_path=f"/api/tasks/{message.task_id}/executed",
                headers={"access-token": self.api_token},
                json={
                    "finishedAt": now,
                    "error": result.error if result.error is None else repr(result.error),
                    "executionTime": result.execution_time,
                    "returnValue": serialized_return_value,
                },
            )
        except Exception as e:
            logger.error(f"Failed to send executed event to Taskiq Admin. Error: {e}")
