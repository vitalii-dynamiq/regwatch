from enum import Enum
from typing import Literal

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

from app.core.utils import replace_protocol


class Environment(str, Enum):
    LOCAL = "local"
    DEV = "dev"
    STAGE = "stage"
    PROD = "prod"


class Settings(BaseSettings):

    ENV: Environment = Environment.LOCAL
    VERSION: str = "0.0.1"
    DEBUG: bool = False

    CORS_ORIGINS: list[str] = ["*"]

    # Server settings with SERVER_ prefix
    SERVER_HOST: str = "0.0.0.0"  # nosec
    SERVER_PORT: int = 8080
    SERVER_TIMEOUT_KEEP_ALIVE: int = 120
    SERVER_WORKERS: int = 1
    SERVER_ENABLE_ACCESS_LOGS: bool = True

    AUTH0_DOMAIN: str = ""
    AUTH0_API_AUDIENCE: str = ""
    AUTH0_AUDIENCE: str = ""
    AUTH0_ALGORITHMS: str = ""
    AUTH0_ISSUER: str = ""

    # Database settings with DB_ prefix
    DB_URL: SecretStr
    DB_POOL_MAX_SIZE: int = 5
    DB_POOL_MAX_OVERFLOW: int = 10
    DB_POOL_TIMEOUT: int = 30
    DB_POOL_RECYCLE: int = 600
    DB_ECHO_SQL: bool = False

    # Sentry settings with SENTRY_ prefix
    SENTRY_DSN: str | None = None
    SENTRY_TRACES_SAMPLE_RATE: float = 0.2
    SENTRY_PROFILE_SESSION_SAMPLE_RATE: float = 0.2

    TOGETHER_API_KEY: str
    CLASSIFIER_MODEL: str = "deepseek-ai/DeepSeek-R1"
    CLASSIFIER_MAX_CONTENT_CHARS: int = 480000
    CLASSIFIER_MAX_TOKENS: int = 128000
    CLASSIFIER_TEMPERATURE: float = 0.1
    CLASSIFIER_EXTRACTION_TEMPERATURE: float = 0.0

    JINA_API_KEY: str
    CRAWLER_MAX_CONCURRENCY: int = 8
    CRAWLER_MAX_REDIRECTS: int = 5
    CRAWLER_JINA_ENDPOINT: str = "https://r.jina.ai/"
    CRAWLER_TIMEOUT: int = 120
    CRAWLER_MIN_CONTENT_LENGTH: int = 100
    CRAWLER_TRACKING_PARAMS: list[str] = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "fbclid",
        "gclid",
        "mc_cid",
        "mc_eid",
        "ref",
        "source",
        "btm_source",
    ]

    REDIS_ENABLED: bool = False
    REDIS_URL: str = ""
    REDIS_POOL_MAX_CONNECTIONS: int = 20

    TASKIQ_ENABLED: bool = False
    TASKIQ_ADMIN_URL: str = ""
    TASKIQ_ADMIN_API_TOKEN: str = ""
    TASKIQ_STUCK_TASK_THRESHOLD_HOURS: int = 6  # Hours before considering a task stuck

    ADMIN_TOKEN: SecretStr

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def db_sync_url(self) -> str:
        return replace_protocol(
            url=self.DB_URL.get_secret_value(),
            protocol="postgresql+psycopg2",
        )

    @property
    def db_async_url(self) -> str:
        return replace_protocol(
            url=self.DB_URL.get_secret_value(),
            protocol="postgresql+asyncpg",
        )

    @property
    def db_taskiq_url(self) -> str:
        """Get taskiq database URL with search_path set to taskiq schema."""
        base_url = replace_protocol(
            url=self.DB_URL.get_secret_value(),
            protocol="postgresql",
        )
        # Add search_path option to use taskiq schema by default
        separator = "&" if "?" in base_url else "?"
        return f"{base_url}{separator}options=-c%20search_path%3Dtaskiq%2Cpublic"


class LocalSettings(Settings):
    """Settings for local development with default values."""

    DEBUG: bool = True
    ENV: Literal[Environment.LOCAL] = Environment.LOCAL


def get_settings() -> Settings:
    new_settings: Settings = {
        Environment.LOCAL: LocalSettings,
    }[Settings().ENV]()

    return new_settings


settings: Settings = get_settings()
