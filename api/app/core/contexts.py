import uuid
from contextvars import ContextVar

from starlette.datastructures import Headers


class RequestCtx:
    request_id: ContextVar[str | None] = ContextVar("request_id", default=None)

    @classmethod
    def set_request_ctx(cls, headers: Headers) -> None:
        cls.request_id.set(headers.get("X-Request-Id", str(uuid.uuid4())))

    @classmethod
    def clear_request_ctx(cls) -> None:
        cls.request_id.set(None)

    @classmethod
    def get_request_ctx(cls) -> dict:
        return {
            "request_id": cls.request_id.get(),
        }

    @classmethod
    def get_request_ctx_for_logger(cls) -> dict:
        return {
            "req_id": cls.request_id.get(),
        }
