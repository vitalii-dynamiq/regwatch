from contextlib import asynccontextmanager
from typing import TYPE_CHECKING, Optional

from redis import asyncio as aioredis

from app.core.clients.auth0 import Auth0Client
from app.core.contexts import RequestCtx
from app.core.settings import settings
from app.taskiq.broker import broker

if TYPE_CHECKING:  # pragma: no cover - typing only
    from redis.asyncio import ConnectionPool as RedisConnectionPool
    from redis.asyncio import Redis as RedisClient


class AppCtx(RequestCtx):
    """Application context"""

    redis_pool: Optional["RedisConnectionPool"] = None
    redis: Optional["RedisClient"] = None
    auth0_client: Auth0Client

    @classmethod
    async def startup(cls) -> None:
        cls.auth0_client = Auth0Client(base_url=f"https://{settings.AUTH0_DOMAIN}")
        if settings.REDIS_ENABLED:
            cls.redis_pool = aioredis.ConnectionPool.from_url(
                settings.REDIS_URL,
                max_connections=getattr(settings, "REDIS_POOL_MAX_CONNECTIONS", 20),
                decode_responses=False,
            )
            cls.redis = aioredis.Redis(connection_pool=cls.redis_pool)

        if settings.TASKIQ_ENABLED and not broker.is_worker_process:
            await broker.startup()

    @classmethod
    async def shutdown(cls) -> None:
        await cls.auth0_client.close()
        del cls.auth0_client

        if settings.TASKIQ_ENABLED and not broker.is_worker_process:
            await broker.shutdown()

        if settings.REDIS_ENABLED:
            await cls.redis.connection_pool.disconnect(inuse_connections=True)
            cls.redis = None
            cls.redis_pool = None


@asynccontextmanager
async def get_application_ctx():
    await AppCtx.startup()
    try:
        yield AppCtx
    finally:
        await AppCtx.shutdown()
