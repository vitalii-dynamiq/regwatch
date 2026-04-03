"""Configuration for the crawler service."""

from pydantic import BaseModel

from app.core.settings import settings


class CrawlerConfig(BaseModel):
    """Crawler service configuration."""

    api_key: str
    max_concurrency: int
    max_redirects: int
    jina_endpoint: str
    timeout: int
    min_content_length: int
    tracking_params: list[str]

    @classmethod
    def from_settings(cls) -> "CrawlerConfig":
        """Build configuration from application settings."""
        return cls(
            api_key=settings.JINA_API_KEY,
            max_concurrency=settings.CRAWLER_MAX_CONCURRENCY,
            max_redirects=settings.CRAWLER_MAX_REDIRECTS,
            jina_endpoint=settings.CRAWLER_JINA_ENDPOINT,
            timeout=settings.CRAWLER_TIMEOUT,
            min_content_length=settings.CRAWLER_MIN_CONTENT_LENGTH,
            tracking_params=settings.CRAWLER_TRACKING_PARAMS,
        )
