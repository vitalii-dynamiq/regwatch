import logging

from app.core.contexts import RequestCtx


class RequestCtxFilter(logging.Filter):
    """Custom filter that adds request context metadata to all log records"""

    def filter(self, record: logging.LogRecord) -> bool:
        ctx = RequestCtx.get_request_ctx_for_logger()
        for key, value in ctx.items():
            setattr(record, key, value)
        return True


def init_logger(
    loggers: list[logging.Logger] | logging.Logger,
    level: int = logging.INFO,
    with_request_ctx_metadata: bool = True,
    extra_fmt: str | None = None,
) -> list[logging.Logger] | logging.Logger:
    if not isinstance(loggers, list):
        loggers = [loggers]

    handler = logging.StreamHandler()
    handler.setLevel(level)

    fmt_req_ctx_metadata = ""
    if with_request_ctx_metadata:
        handler.addFilter(RequestCtxFilter())
        req_ctx_metadata = RequestCtx.get_request_ctx_for_logger()
        fmt_req_ctx_metadata = f'{"".join(f"[{k}:%({k})s]" for k in req_ctx_metadata)} ' if req_ctx_metadata else ""

    extra_fmt = f"{extra_fmt} " if extra_fmt else ""
    fmt = f"%(asctime)s - %(levelname)s - {fmt_req_ctx_metadata}{extra_fmt}%(message)s"

    formatter = logging.Formatter(fmt=fmt)
    handler.setFormatter(formatter)
    for logger in loggers:
        # Remove any pre-existing handlers and disable propagation to avoid duplicate logs
        logger.handlers.clear()
        logger.propagate = False
        logger.setLevel(level)
        logger.addHandler(handler)
        logger.addFilter(RequestCtxFilter())

    return loggers if len(loggers) > 1 else loggers[0]


# Initialize the app logger
logger = logging.getLogger("regwatch-api")
