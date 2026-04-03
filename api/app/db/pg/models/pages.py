"""Models file for Monitored Pages."""

from datetime import datetime
from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import ARRAY, UUID, ForeignKey, Text, UniqueConstraint, func, select
from sqlalchemy.orm import Mapped, column_property, declared_attr, mapped_column, relationship
from sqlalchemy.orm.properties import MappedSQLExpression

from app.db.pg.models.base import CreatableBase, IdPkBase, UpdatableBase

if TYPE_CHECKING:
    from app.db.pg.models.alerts import Alert
    from app.db.pg.models.organizations import Organization
    from app.db.pg.models.sources import Source


class PageStatus(StrEnum):
    """Enum for page monitoring status."""

    ACTIVE = "active"
    NEW_PAGE = "new_page"
    INACTIVE = "inactive"
    ERROR = "error"
    REMOVED = "removed"


class AlertPage(CreatableBase, UpdatableBase):
    """Association model between alerts and monitored pages."""

    __tablename__ = "alert_pages"
    __table_args__ = (UniqueConstraint("alert_id", "page_id", name="uq_alert_pages_alert_id_page_id"),)

    alert_id: Mapped[UUID] = mapped_column(ForeignKey("alerts.id", ondelete="CASCADE"), primary_key=True)
    page_id: Mapped[UUID] = mapped_column(ForeignKey("monitored_pages.id", ondelete="CASCADE"), primary_key=True)


class MonitoredPage(IdPkBase, CreatableBase, UpdatableBase):
    """Model representing a specific version/snapshot of a page being monitored within a regulatory source."""

    __tablename__ = "monitored_pages"

    # Relationships
    source_id: Mapped[UUID] = mapped_column(ForeignKey("regulatory_sources.id", ondelete="CASCADE"), index=True)
    organization_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("organizations.id", ondelete="SET NULL"), index=True, nullable=True
    )

    url: Mapped[str] = mapped_column(index=True)
    url_hash: Mapped[str] = mapped_column(index=True)
    title: Mapped[str | None] = mapped_column(index=True)
    path: Mapped[str | None]  # Path component of URL (e.g., "/guidance/market-risk-disclosure-2025.pdf")

    confidence: Mapped[float]
    is_regulatory: Mapped[bool]
    content_types: Mapped[list[str]] = mapped_column(ARRAY(Text), default=[])

    # Hash of content for change detection
    content_fingerprint: Mapped[str | None]
    content_length: Mapped[int | None]
    content_mime_type: Mapped[str | None]

    status: Mapped[str] = mapped_column(default=PageStatus.ACTIVE.value, index=True)

    last_monitored_at: Mapped[datetime | None] = mapped_column(index=True)
    status_code: Mapped[int | None]

    source: Mapped["Source"] = relationship(back_populates="monitored_pages")
    organization: Mapped["Organization"] = relationship(back_populates="monitored_pages")
    alerts: Mapped[list["Alert"]] = relationship(
        secondary="alert_pages", back_populates="pages", order_by="Alert.detected_at.desc()"
    )

    @declared_attr
    @classmethod
    def alerts_count(cls) -> MappedSQLExpression[int]:
        """Get the number of alerts associated with this monitored page."""
        return column_property(
            select(func.count(AlertPage.alert_id)).where(AlertPage.page_id == cls.id).scalar_subquery(),
            deferred=True,
        )
