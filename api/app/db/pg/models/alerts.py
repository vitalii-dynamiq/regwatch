"""Models file for Alerts."""

from datetime import datetime
from enum import StrEnum
from functools import cache
from typing import TYPE_CHECKING, Any, Optional, Self

from sqlalchemy import JSON, UUID, ForeignKey, Select
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import Mapped, mapped_column, relationship, selectinload

from app.db.pg.models.base import CreatableBase, IdPkBase, Item, UpdatableBase
from app.db.pg.models.sources import ContentType
from app.db.pg.models.users import User

if TYPE_CHECKING:
    from app.db.pg.models.obligations import Obligation
    from app.db.pg.models.organizations import Organization
    from app.db.pg.models.pages import MonitoredPage
    from app.db.pg.models.sources import Source


class AlertStatus(StrEnum):
    """Enum for alert status."""

    NEW = "new"
    NEEDS_REVIEW = "needs_review"
    IN_PROGRESS = "in_progress"
    REVIEWED = "reviewed"
    COMPLETED = "completed"
    DEFERRED = "deferred"
    NOT_APPLICABLE = "not_applicable"


class ObligationAlertType(StrEnum):
    """Enum for alert/obligation types."""

    REGULATORY_FILING = "regulatory_filing"
    QUARTERLY_REPORTING = "quarterly_reporting"
    ANNUAL_REPORTING = "annual_reporting"
    COMPLIANCE_REQUIREMENT = "compliance_requirement"
    REPORTING_DEADLINE = "reporting_deadline"
    IMPLEMENTATION_DEADLINE = "implementation_deadline"
    DISCLOSURE_REQUIREMENT = "disclosure_requirement"
    TRAINING_REQUIREMENT = "training_requirement"
    AUDIT_REQUIREMENT = "audit_requirement"
    DOCUMENTATION_REQUIREMENT = "documentation_requirement"
    REQUIREMENT = "requirement"
    PROHIBITION = "prohibition"
    REPORTING_DUTY = "reporting_duty"
    DEADLINE = "deadline"

    @classmethod
    @cache
    def get_obligation_alert_type_data(cls) -> dict[str, Item]:
        return {
            cls.REGULATORY_FILING: Item(
                id=cls.REGULATORY_FILING.value,
                name="Regulatory Filing",
                description="Mandatory regulatory submissions",
            ),
            cls.QUARTERLY_REPORTING: Item(
                id=cls.QUARTERLY_REPORTING.value,
                name="Quarterly Reporting",
                description="Quarterly reports or disclosures",
            ),
            cls.ANNUAL_REPORTING: Item(
                id=cls.ANNUAL_REPORTING.value,
                name="Annual Reporting",
                description="Annual reports or disclosures",
            ),
            cls.COMPLIANCE_REQUIREMENT: Item(
                id=cls.COMPLIANCE_REQUIREMENT.value,
                name="Compliance Requirement",
                description="General compliance obligations",
            ),
            cls.REPORTING_DEADLINE: Item(
                id=cls.REPORTING_DEADLINE.value,
                name="Reporting Deadline",
                description="Specific reporting deadlines",
            ),
            cls.IMPLEMENTATION_DEADLINE: Item(
                id=cls.IMPLEMENTATION_DEADLINE.value,
                name="Implementation Deadline",
                description="Deadlines for implementing changes",
            ),
            cls.DISCLOSURE_REQUIREMENT: Item(
                id=cls.DISCLOSURE_REQUIREMENT.value,
                name="Disclosure Requirement",
                description="Requirements to disclose information",
            ),
            cls.TRAINING_REQUIREMENT: Item(
                id=cls.TRAINING_REQUIREMENT.value,
                name="Training Requirement",
                description="Mandatory training obligations",
            ),
            cls.AUDIT_REQUIREMENT: Item(
                id=cls.AUDIT_REQUIREMENT.value,
                name="Audit Requirement",
                description="Audit or review requirements",
            ),
            cls.DOCUMENTATION_REQUIREMENT: Item(
                id=cls.DOCUMENTATION_REQUIREMENT.value,
                name="Documentation Requirement",
                description="Record-keeping or documentation duties",
            ),
            cls.REQUIREMENT.value: Item(
                id=cls.REQUIREMENT.value,
                name="Requirement",
                description="General requirement",
            ),
            cls.PROHIBITION: Item(
                id=cls.PROHIBITION.value,
                name="Prohibition",
                description="Things organizations cannot do",
            ),
            cls.REPORTING_DUTY: Item(
                id=cls.REPORTING_DUTY.value,
                name="Reporting Duty",
                description="General reporting obligations",
            ),
            cls.DEADLINE: Item(
                id=cls.DEADLINE.value,
                name="Deadline",
                description="Specific deadlines",
            ),
        }

    @classmethod
    def get_obligation_alert_type_data_by_id(cls, obligation_alert_type_id: str) -> Item:
        return cls.get_obligation_alert_type_data().get(obligation_alert_type_id)


class RiskLevel(StrEnum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    UNKNOWN = "unknown"


class Alert(IdPkBase, CreatableBase, UpdatableBase):
    """Model representing a reviewed and processed alert with additional details and categorization."""

    __tablename__ = "alerts"

    organization_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"), index=True, nullable=True
    )
    source_id: Mapped[UUID] = mapped_column(
        ForeignKey("regulatory_sources.id", ondelete="CASCADE"), index=True, nullable=False
    )

    title: Mapped[str] = mapped_column(index=True)
    alert_type: Mapped[str | None] = mapped_column(index=True, nullable=True)
    content_type: Mapped[str] = mapped_column(index=True)
    description: Mapped[str | None]

    risk_level: Mapped[RiskLevel | None] = mapped_column(index=True)
    status: Mapped[str] = mapped_column(default=AlertStatus.NEW.value, index=True)

    due_date: Mapped[datetime | None]
    effective_date: Mapped[datetime | None]
    detected_at: Mapped[datetime]
    completed_at: Mapped[datetime | None]

    regulatory_metadata: Mapped[dict | None] = mapped_column(JSON)
    extra_metadata: Mapped[dict | None] = mapped_column(JSON)

    assigned_to: Mapped[User | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), index=True)
    assigned_at: Mapped[datetime | None]
    last_updated_by: Mapped[User | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), index=True)

    pages: Mapped[list["MonitoredPage"]] = relationship(
        secondary="alert_pages", back_populates="alerts", order_by="AlertPage.created_at.desc()"
    )
    organization: Mapped[Optional["Organization"]] = relationship(back_populates="alerts")
    source: Mapped[Optional["Source"]] = relationship(back_populates="alerts")
    obligations: Mapped[list["Obligation"]] = relationship(back_populates="alert")

    @classmethod
    def get_query(cls, with_source: bool = False, **kwargs: Any) -> Select[tuple[Self]]:
        """Get query for all entities."""
        query = super().get_query(**kwargs)
        if with_source:
            query = query.options(selectinload(Alert.source))
        return query

    @hybrid_property
    def status_item(self) -> Item:
        return Item(id=self.status, name=self.status.replace("_", " ").title())

    @hybrid_property
    def risk_level_item(self) -> Item:
        return Item(id=self.risk_level, name=self.risk_level.value.title())

    @hybrid_property
    def alert_type_item(self) -> Item:
        item = ObligationAlertType.get_obligation_alert_type_data_by_id(self.alert_type)
        return Item.model_validate(item) if item else None

    @hybrid_property
    def content_type_item(self) -> Item:
        item = ContentType.get_content_type_data_by_id(self.content_type)
        return Item.model_validate(item) if item else None
