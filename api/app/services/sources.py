"""Service for managing regulatory sources."""

import asyncio
from typing import Any
from urllib.parse import urlparse
from uuid import UUID

from sqlalchemy import delete, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.sources.schemas import BulkUpdateSourcesMonitoringRequest
from app.core.loggers import logger
from app.db.pg.base import DbSession, create_entity
from app.db.pg.models.alerts import Alert
from app.db.pg.models.jurisdictions import Jurisdiction
from app.db.pg.models.obligations import Obligation
from app.db.pg.models.pages import MonitoredPage
from app.db.pg.models.sources import MonitoringFrequency, Source


async def get_source_by_id_and_filters(
    db: DbSession,
    source_id: UUID,
    organization_id: UUID | None = None,
    with_jurisdiction: bool = False,
    with_counts: bool = False,
) -> Source | None:
    """Get regulatory source by ID and filters."""
    stmt = Source.get_query(with_jurisdiction=with_jurisdiction).where(Source.id == source_id)
    if organization_id:
        stmt = stmt.where(Source.organization_id == organization_id)

    source = await db.scalar(stmt)

    # Add counts manually if requested (avoids circular import issues)
    if source and with_counts:
        pages_count, alerts_count, obligations_count = await get_source_counts(db, source)
        source.pages_count = pages_count
        source.alerts_count = alerts_count
        source.obligations_count = obligations_count

    return source


async def get_source_counts(db: DbSession, source: Source) -> Source:
    """Get counts for a source."""

    pages_count_task = db.scalar(select(func.count(MonitoredPage.id)).where(MonitoredPage.source_id == source.id))
    alerts_count_task = db.scalar(select(func.count(Alert.id)).where(Alert.source_id == source.id))
    obligations_count_task = db.scalar(select(func.count(Obligation.id)).where(Obligation.source_id == source.id))

    pages_count, alerts_count, obligations_count = await asyncio.gather(  # noqa: F821
        pages_count_task,
        alerts_count_task,
        obligations_count_task,
    )

    return pages_count or 0, alerts_count or 0, obligations_count or 0


async def get_enabled_sources(db: DbSession) -> list[Source]:
    stmt = Source.get_query().where(Source.monitoring_enabled == True)  # noqa: E712
    result = await db.execute(stmt)
    sources = result.scalars().all()

    return list(sources)


async def get_sources_by_frequency(db: DbSession, frequency: MonitoringFrequency) -> list[Source]:
    stmt = Source.get_query().where(
        Source.monitoring_enabled == True, Source.monitoring_frequency == frequency  # noqa: E712
    )
    result = await db.execute(stmt)
    sources = result.scalars().all()

    return list(sources)


def get_crawl_urls_from_sources(sources: list[Source]) -> list[str]:
    """Extract base URLs from regulatory sources for crawling.

    Args:
        sources: List of regulatory sources

    Returns:
        List of base URLs to crawl
    """
    urls = []
    for source in sources:
        if source.base_url:
            urls.append(source.base_url)

    logger.info(f"Extracted {len(urls)} URLs from {len(sources)} sources")
    return urls


def get_allowed_domains_from_sources(sources: list[Source]) -> list[str]:
    """Extract allowed domains from regulatory sources.

    Args:
        sources: List of regulatory sources

    Returns:
        List of allowed domains
    """
    domains = []
    for source in sources:
        if source.domain:
            domains.append(source.domain)

    logger.info(f"Extracted {len(domains)} allowed domains from {len(sources)} sources")
    return domains


async def get_or_create_source_by_domain(
    db: AsyncSession,
    url: str,
    *,
    organization_id: Any | None = None,
) -> Source:
    """Get or create a `Source` for the given URL's domain.

    Uses any existing `Jurisdiction` if available; otherwise leaves it unset.
    Defaults monitoring to Daily.
    """
    try:
        parsed = urlparse(url)
        domain = parsed.netloc.lower()
        if domain.startswith("www."):
            domain = domain[4:]

        stmt = select(Source).where(Source.domain == domain)
        existing = await db.scalar(stmt)
        if existing:
            return existing

        base_url = f"{parsed.scheme}://{parsed.netloc}".rstrip("/")

        jurisdiction = await db.scalar(select(Jurisdiction).limit(1))

        source = await create_entity(
            db=db,
            entity_class=Source,
            payload=None,
            extra_values={
                "name": domain,
                "domain": domain,
                "base_url": base_url,
                "description": None,
                "jurisdiction_id": getattr(jurisdiction, "id", None),
                "organization_id": organization_id,
                "content_types": None,
                "monitoring_enabled": True,
                "monitoring_frequency": MonitoringFrequency.DAILY,
                "last_monitored_at": None,
            },
            commit=True,
        )

        logger.info(f"Created Source for domain '{domain}'")
        return source
    except Exception as e:
        logger.error(f"Failed to get/create source by domain for {url}: {e}")
        raise


async def ensure_sources_for_urls(db: DbSession, urls: list[str]) -> list[Source]:
    """Ensure a `Source` exists for each URL's domain.

    Returns the list of sources corresponding to the provided URLs (deduplicated by domain).
    """
    try:
        # Deduplicate by normalized domain
        domains: dict[str, str] = {}
        for url in urls:
            try:
                parsed = urlparse(url)
                domain = parsed.netloc.lower()
                if domain.startswith("www."):
                    domain = domain[4:]
                domains.setdefault(domain, url)
            except Exception as e:
                logger.error(f"Failed to parse URL {url}: {e}")
                continue

        sources: list[Source] = []
        for url in domains.values():
            src = await get_or_create_source_by_domain(db, url)
            sources.append(src)

        return sources
    except Exception as e:
        logger.error(f"Failed to ensure sources for URLs: {e}")
        return []


async def bulk_update_sources_monitoring_by_ids(
    db: DbSession,
    organization_id: UUID,
    payload: BulkUpdateSourcesMonitoringRequest,
) -> int:
    """Bulk update sources monitoring settings by IDs and organization."""
    update_values = {"monitoring_enabled": payload.monitoring_enabled}
    stmt = (
        update(Source)
        .where(
            Source.id.in_(payload.ids),
            Source.organization_id == organization_id,
        )
        .values(**update_values)
    )

    result = await db.execute(stmt)
    return result.rowcount


async def bulk_delete_sources_by_ids(
    db: DbSession,
    source_ids: list[UUID],
    organization_id: UUID,
) -> int:
    """Bulk delete sources by IDs and organization."""
    stmt = delete(Source).where(
        Source.id.in_(source_ids),
        Source.organization_id == organization_id,
    )
    result = await db.execute(stmt)
    return result.rowcount
