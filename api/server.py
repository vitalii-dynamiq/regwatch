import logging

import uvicorn
from dynamiq.utils.logger import logger as dynamiq_logger
from sentry_sdk import init as sentry_init

from app.core.loggers import init_logger, logger
from app.core.settings import Environment, settings

init_logger([dynamiq_logger, logger], level=logging.INFO)


if settings.SENTRY_DSN and settings.ENV not in (Environment.LOCAL,):
    sentry_params = {
        "dsn": settings.SENTRY_DSN,
        "environment": settings.ENV.value,
        "traces_sample_rate": settings.SENTRY_TRACES_SAMPLE_RATE,
        "profile_session_sample_rate": settings.SENTRY_PROFILE_SESSION_SAMPLE_RATE,
        "profile_lifecycle": "trace",
        "release": settings.VERSION,
    }
    sentry_init(**sentry_params)


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.SERVER_HOST,
        port=settings.SERVER_PORT,
        timeout_keep_alive=settings.SERVER_TIMEOUT_KEEP_ALIVE,
        workers=settings.SERVER_WORKERS,
        loop="uvloop",
        http="httptools",
        access_log=settings.SERVER_ENABLE_ACCESS_LOGS,
        use_colors=settings.DEBUG,
        server_header=False,
        date_header=False,
    )
