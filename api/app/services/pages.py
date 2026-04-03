from datetime import datetime, timezone
from hashlib import sha256
from typing import Any
from urllib.parse import urlparse
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.loggers import logger
from app.db.pg.base import create_entity
from app.db.pg.models.alerts import Alert, AlertStatus
from app.db.pg.models.pages import AlertPage, MonitoredPage, PageStatus
from app.db.pg.models.sources import Source
from app.services.classifier.models import LLMExtractedObligationAlert
from app.services.crawler.models import CrawlResult


def _hash_url(url: str) -> str:
    return sha256(url.encode()).hexdigest()


async def create_monitored_page_version(
    db: AsyncSession,
    *,
    result: CrawlResult,
    regulatory_source_id: Any | None = None,
    organization_id: Any | None = None,
) -> MonitoredPage:
    """Create a new `MonitoredPage` version using a `CrawlResult` payload."""
    url_hash = _hash_url(result.url)
    now = datetime.now(timezone.utc)

    # Get the latest version of this page (if any) to inherit source_id/organization_id
    previous_version = await db.scalar(
        select(MonitoredPage)
        .where(MonitoredPage.url_hash == url_hash)
        .order_by(MonitoredPage.last_monitored_at.desc(), MonitoredPage.created_at.desc())
    )

    # Determine source_id and organization_id
    source_id = regulatory_source_id
    org_id = organization_id

    if source_id is None:
        if previous_version is not None:
            source_id = previous_version.source_id
            org_id = previous_version.organization_id
        else:
            # Fall back to domain lookup for new pages
            parsed = urlparse(result.url)
            domain = parsed.netloc.lower()
            if domain.startswith("www."):
                domain = domain[4:]

            existing_source = await db.scalar(select(Source).where(Source.base_url.contains(domain)))
            if existing_source is None:
                raise ValueError(
                    f"No Source found for domain '{domain}' and no regulatory_source_id provided. "
                    f"Create sources explicitly before persisting pages."
                )
            source_id = existing_source.id
            org_id = existing_source.organization_id

    page = await create_entity(
        db=db,
        entity_class=MonitoredPage,
        payload=None,
        extra_values={
            "source_id": source_id,
            "organization_id": org_id,
            "url": result.url,
            "url_hash": url_hash,
            "title": result.title,
            "path": urlparse(result.url).path or None,
            "confidence": result.confidence,
            "is_regulatory": result.is_regulatory,
            "content_types": result.categories,
            "content_fingerprint": result.fingerprint,
            "content_length": result.content_length,
            "content_mime_type": getattr(result, "content_mime_type", None),
            "status": PageStatus.ACTIVE,
            "last_monitored_at": now,
            "status_code": result.status_code,
        },
        commit=True,
    )

    logger.info(
        f"Created MonitoredPage version: url={result.url}, regulatory={bool(result.is_regulatory)}, "
        f"confidence={result.confidence if result.confidence is not None else 0:.2f}, "
        f"categories={result.categories or []}"
    )

    # Create obligations if regulatory content was found and obligations were extracted
    if result.is_regulatory and result.obligation_alerts:
        obligations_created = await create_alerts_for_page(
            db=db, page=page, obligation_alerts=result.obligation_alerts, organization_id=page.organization_id
        )
        logger.info(f"Created {len(obligations_created)} alerts for page {page.url}")

    return page


async def create_alerts_for_page(
    db: AsyncSession,
    page: MonitoredPage,
    obligation_alerts: list[LLMExtractedObligationAlert],
    organization_id: Any | None = None,
) -> list[Alert]:
    """Create alert entities from extracted alerts and link them to the page.

    Args:
        db: Database session
        page: MonitoredPage to link alerts to
        obligation_alerts: List of extracted alerts from classifier
        organization_id: Organization ID to associate obligations with

    Returns:
        List of created Alert entities
    """
    if not obligation_alerts:
        return []

    created_alerts = []

    logger.info(f"Creating {len(obligation_alerts)} alerts for page {page.url}")

    # Process all obligations in a single transaction for better consistency
    try:
        for obligation_alert in obligation_alerts:
            alert = await create_entity(
                db=db,
                entity_class=Alert,
                payload=None,
                extra_values={
                    "source_id": page.source_id,
                    "organization_id": organization_id,
                    "title": obligation_alert.title,
                    "alert_type": obligation_alert.obligation_type,
                    "content_type": obligation_alert.category,
                    "description": obligation_alert.description,
                    "risk_level": obligation_alert.risk_level,
                    "status": AlertStatus.NEW.value,
                    "detected_at": datetime.now(timezone.utc),
                    "due_date": obligation_alert.deadline_date,
                    "effective_date": obligation_alert.effective_date,
                    "regulatory_metadata": {
                        "secondary_content_type": obligation_alert.sub_category,
                        "penalties": obligation_alert.penalties,
                        "requirements": obligation_alert.requirements,
                        "business_impact": obligation_alert.business_impact,
                        "action_required": obligation_alert.action_required,
                        "confidence": obligation_alert.confidence,
                    },
                },
                commit=False,
            )

            await db.flush()

            # Link obligation to page
            alert_page = AlertPage(
                alert_id=alert.id,
                page_id=page.id,
            )
            db.add(alert_page)

            created_alerts.append(alert)
            logger.debug(f"Prepared alert for page {page.url}: {alert.title}")

        # Commit all obligations at once for atomicity
        await db.commit()

        logger.info(f"✅ Successfully created {len(created_alerts)} alerts for page {page.url}")

    except Exception as e:
        logger.error(f"❌ Failed to create alerts for page {page.url}: {e}")
        await db.rollback()
        return []  # Return empty list if any obligation failed

    return created_alerts


async def is_content_fingerprint_unchanged(
    db: AsyncSession,
    *,
    url: str,
    fingerprint: str,
    organization_id: UUID | None = None,
    regulatory_source_id: UUID | None = None,
) -> bool:
    """Check if the provided fingerprint matches ANY stored version for the URL in the same source/org scope."""
    try:
        url_hash = _hash_url(url)
        query = (
            select(MonitoredPage)
            .where(MonitoredPage.url_hash == url_hash)
            .where(MonitoredPage.content_fingerprint.isnot(None))
            .order_by(MonitoredPage.last_monitored_at.desc(), MonitoredPage.created_at.desc())
        )
        if regulatory_source_id is not None:
            query = query.where(MonitoredPage.source_id == regulatory_source_id)
        if organization_id is not None:
            query = query.where(MonitoredPage.organization_id == organization_id)

        result = await db.scalars(query)
        pages = result.all()

        return any(page.content_fingerprint == fingerprint for page in pages)
    except Exception as e:
        logger.error(f"Fingerprint lookup failed for {url}: {e}")
        return False
