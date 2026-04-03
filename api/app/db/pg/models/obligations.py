"""Models file for Obligations."""

from datetime import datetime
from enum import StrEnum
from typing import TYPE_CHECKING, Any, Optional, Self

from sqlalchemy import JSON, UUID, ForeignKey, Select
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import Mapped, mapped_column, relationship, selectinload

from app.db.pg.models.alerts import ObligationAlertType, RiskLevel
from app.db.pg.models.base import CreatableBase, IdPkBase, Item, UpdatableBase
from app.db.pg.models.sources import ContentType
from app.db.pg.models.users import User

if TYPE_CHECKING:
    from app.db.pg.models.alerts import Alert
    from app.db.pg.models.organizations import Organization
    from app.db.pg.models.sources import Source


class ObligationStatus(StrEnum):
    NEW = "new"
    IN_PROGRESS = "in_progress"
    COMPLIANT = "compliant"
    NON_COMPLIANT = "non_compliant"
    ARCHIVED = "archived"


class Obligation(IdPkBase, CreatableBase, UpdatableBase):
    """Model representing a regulatory obligation identified from a monitored page."""

    __tablename__ = "obligations"

    organization_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"), index=True, nullable=True
    )
    source_id: Mapped[UUID] = mapped_column(
        ForeignKey("regulatory_sources.id", ondelete="CASCADE"), index=True, nullable=False
    )
    alert_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("alerts.id", ondelete="SET NULL"), nullable=True, index=True
    )

    title: Mapped[str] = mapped_column(index=True)
    obligation_type: Mapped[str | None] = mapped_column(index=True, nullable=True)
    content_type: Mapped[str] = mapped_column(index=True)
    description: Mapped[str | None]

    risk_level: Mapped[RiskLevel | None] = mapped_column(index=True)
    status: Mapped[str] = mapped_column(default=ObligationStatus.NEW.value, index=True)

    due_date: Mapped[datetime | None]
    effective_date: Mapped[datetime | None]
    completed_at: Mapped[datetime | None]

    regulatory_metadata: Mapped[dict | None] = mapped_column(JSON)

    assigned_to: Mapped[User | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), index=True)
    assigned_at: Mapped[datetime | None]
    last_updated_by: Mapped[User | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), index=True)

    organization: Mapped[Optional["Organization"]] = relationship(back_populates="obligations")
    source: Mapped[Optional["Source"]] = relationship(back_populates="obligations")
    alert: Mapped[Optional["Alert"]] = relationship(back_populates="obligations")

    @classmethod
    def get_query(cls, with_source: bool = False, **kwargs: Any) -> Select[tuple[Self]]:
        """Get query for all entities."""
        query = super().get_query(**kwargs)
        if with_source:
            query = query.options(selectinload(Obligation.source))
        return query

    @hybrid_property
    def status_item(self) -> Item:
        return Item(id=self.status, name=self.status.replace("_", " ").title())

    @hybrid_property
    def risk_level_item(self) -> Item:
        return Item(id=self.risk_level, name=self.risk_level.value.title())

    @hybrid_property
    def obligation_type_item(self) -> Item:
        item = ObligationAlertType.get_obligation_alert_type_data_by_id(self.obligation_type)
        return Item.model_validate(item) if item else None

    @hybrid_property
    def content_type_item(self) -> Item:
        item = ContentType.get_content_type_data_by_id(self.content_type)
        return Item.model_validate(item) if item else None
