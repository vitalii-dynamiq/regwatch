import abc
import hashlib
from typing import Any

from dynamiq.connections import Jina as JinaConnection
from dynamiq.nodes.tools.jina import JinaResponseFormat, JinaScrapeTool

from app.core.clients.http import HttpClient
from app.core.loggers import logger

from .exceptions import ContentFetchError
from .models import DocumentExtraction
from .settings import CrawlerConfig


class BaseContentRetriever(abc.ABC):
    @abc.abstractmethod
    async def fetch(self, url: str) -> DocumentExtraction | None:
        pass

    @abc.abstractmethod
    async def close(self) -> None:
        pass


class JinaContentFetcher(BaseContentRetriever):
    """Fetch content via Jina reader API using the shared HttpClient wrapper."""

    def __init__(self, config: CrawlerConfig):
        self._config = config
        # No base_url because we concatenate user URLs to Jina endpoint directly
        self._client = HttpClient(timeout=self._config.timeout)

    async def fetch(self, url: str) -> DocumentExtraction | None:
        headers = {
            "Authorization": f"Bearer {self._config.api_key}",
            "X-Base": "final",
            "X-Engine": "browser",
            "X-Return-Format": "markdown",
            "X-Retain-Images": "none",
        }
        jina_url = f"{self._config.jina_endpoint}{url}"

        try:
            response = await self._client.request("GET", jina_url, headers=headers)
        except Exception as e:
            logger.error(f"Jina fetch failed for {url}: {e}")
            raise ContentFetchError(f"Failed to fetch {url}: {e}") from e

        status = response.status_code
        raw = response.content
        text_md = raw.decode(errors="ignore") if isinstance(raw, (bytes, bytearray)) else str(raw)

        logger.debug(f"Jina response for {url}: status={status}, length={len(raw) if raw else 0}")

        if status != 200:
            logger.warning(f"Non-200 status for {url}: {status}")
            return None

        if not text_md.strip():
            logger.warning(f"Empty content from {url}")
            return None

        raw_bytes = bytes(raw) if isinstance(raw, (bytes, bytearray)) else text_md.encode("utf-8")
        fingerprint = hashlib.sha256(raw_bytes).hexdigest()

        return DocumentExtraction(
            url=url,
            title=None,
            content=text_md,
            markdown=text_md,
            links=[],
            fingerprint=fingerprint,
            status_code=status,
            content_length=len(raw_bytes),
        )

    async def close(self) -> None:
        await self._client.close()


class DynamiqJinaContentRetriever(BaseContentRetriever):
    def __init__(self, config: CrawlerConfig):
        self.config = config
        connection = JinaConnection(api_key=self.config.api_key, headers={"X-Base": "final"})
        self.jina = JinaScrapeTool(
            connection=connection,
            response_format=JinaResponseFormat.MARKDOWN,
            include_links=False,
            include_images=False,
            engine="browser",
            no_cache=False,
            timeout=self.config.timeout,
        )

    async def fetch(self, url: str) -> DocumentExtraction | None:
        try:
            exec_result = await self.jina.run({"url": url})
        except Exception as e:
            logger.error(f"Dynamiq Jina scrape failed for {url}: {e}")
            raise ContentFetchError(f"Failed to fetch {url}: {e}") from e

        # Parse response
        payload: Any = exec_result.get("content") if isinstance(exec_result, dict) else exec_result
        text_md: str | None = None

        if isinstance(payload, dict):
            # JinaScrapeTool non-agent mode returns a dict with keys: url, content, links, images, metadata
            text_md = payload.get("content") or ""
        elif isinstance(payload, str):
            # Agent-optimized mode returns a formatted string; use as markdown
            text_md = payload

        if not text_md or not text_md.strip():
            logger.warning(f"Dynamiq Jina scrape returned no content for {url}")
            return None

        content_bytes = text_md.encode()
        fingerprint = hashlib.sha256(content_bytes).hexdigest()

        return DocumentExtraction(
            url=url,
            title=None,
            content=text_md,
            markdown=text_md,
            links=[],
            fingerprint=fingerprint,
            status_code=200,
            content_length=len(content_bytes),
        )

    async def close(self) -> None:
        pass
