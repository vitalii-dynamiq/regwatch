"""Models file for Regulatory Sources."""

from datetime import datetime
from enum import StrEnum
from functools import cache
from typing import TYPE_CHECKING, Any, Self

from sqlalchemy import ARRAY, UUID, ForeignKey, Select, Text
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import Mapped, mapped_column, relationship, selectinload

from app.db.pg.models.base import CreatableBase, IdPkBase, Item, UpdatableBase

if TYPE_CHECKING:
    from app.db.pg.models.alerts import Alert
    from app.db.pg.models.jurisdictions import Jurisdiction
    from app.db.pg.models.obligations import Obligation
    from app.db.pg.models.organizations import Organization
    from app.db.pg.models.pages import MonitoredPage


class ContentType(StrEnum):
    """Enum for content types."""

    PRUDENTIAL_RISK = "prudential_risk"
    CONDUCT_CUSTOMER_PROTECTION = "conduct_customer_protection"
    PAYMENTS_MARKET_INFRASTRUCTURE = "payments_market_infrastructure"
    CORPORATE_GOVERNANCE_REPORTING = "corporate_governance_reporting"
    AML_CFT_SANCTIONS = "aml_cft_sanctions"
    DATA_PRIVACY_CYBERSECURITY = "data_privacy_cybersecurity"
    LABOUR_EMPLOYMENT = "labour_employment"
    ESG_SUSTAINABILITY = "esg_sustainability"
    TAXATION_SOCIAL_SECURITY = "taxation_social_security"
    HEALTH_SAFETY_ENVIRONMENT = "health_safety_environment"

    @classmethod
    @cache
    def get_content_type_data(cls) -> dict[str, Item]:
        return {
            cls.PRUDENTIAL_RISK: Item(
                id=cls.PRUDENTIAL_RISK.value,
                name="Prudential & Risk",
                description="Managing financial stability and operational risks.",
            ),
            cls.CONDUCT_CUSTOMER_PROTECTION: Item(
                id=cls.CONDUCT_CUSTOMER_PROTECTION.value,
                name="Conduct & Customer Protection",
                description="Fair treatment of customers and market integrity.",
            ),
            cls.PAYMENTS_MARKET_INFRASTRUCTURE: Item(
                id=cls.PAYMENTS_MARKET_INFRASTRUCTURE.value,
                name="Payments & Market Infrastructure",
                description="Ensuring secure and efficient financial transactions.",
            ),
            cls.CORPORATE_GOVERNANCE_REPORTING: Item(
                id=cls.CORPORATE_GOVERNANCE_REPORTING.value,
                name="Corporate Governance & Reporting",
                description="Company oversight, structure, and disclosure.",
            ),
            cls.AML_CFT_SANCTIONS: Item(
                id=cls.AML_CFT_SANCTIONS.value,
                name="AML / CFT & Sanctions",
                description="Combating financial crime and terrorist financing.",
            ),
            cls.DATA_PRIVACY_CYBERSECURITY: Item(
                id=cls.DATA_PRIVACY_CYBERSECURITY.value,
                name="Data, Privacy & Cyber-security",
                description="Protecting sensitive information and digital systems.",
            ),
            cls.LABOUR_EMPLOYMENT: Item(
                id=cls.LABOUR_EMPLOYMENT.value,
                name="Labour & Employment",
                description="Workplace laws, rights, and employee relations.",
            ),
            cls.ESG_SUSTAINABILITY: Item(
                id=cls.ESG_SUSTAINABILITY.value,
                name="ESG & Sustainability",
                description="Environmental, social, and governance practices.",
            ),
            cls.TAXATION_SOCIAL_SECURITY: Item(
                id=cls.TAXATION_SOCIAL_SECURITY.value,
                name="Taxation & Social-security",
                description="Compliance with tax codes and social contributions.",
            ),
            cls.HEALTH_SAFETY_ENVIRONMENT: Item(
                id=cls.HEALTH_SAFETY_ENVIRONMENT.value,
                name="Health, Safety & Environment",
                description="Workplace well-being and environmental impact.",
            ),
        }

    @classmethod
    def get_content_type_data_by_id(cls, content_type_id: str) -> Item:
        return cls.get_content_type_data().get(content_type_id)


class MonitoringFrequency(StrEnum):
    """Enum for monitoring frequencies with human-readable names stored in DB."""

    DAILY = "daily"
    EVERY_8_HOURS = "every_8_hours"
    EVERY_4_HOURS = "every_4_hours"
    HOURLY = "hourly"
    WEEKLY = "weekly"

    @classmethod
    def get_cron(cls, frequency: str) -> str:
        """Get cron expression for APScheduler from human-readable frequency."""
        cron_expressions = {
            cls.DAILY: "0 0 * * *",  # Daily at midnight
            cls.EVERY_8_HOURS: "0 */8 * * *",  # Every 8 hours
            cls.EVERY_4_HOURS: "0 */4 * * *",  # Every 4 hours
            cls.HOURLY: "0 * * * *",  # Every hour
            cls.WEEKLY: "0 0 * * 0",  # Weekly on Sunday at midnight
        }
        return cron_expressions.get(frequency, "0 0 * * *")  # Default to daily

    @classmethod
    def get_interval_minutes(cls, frequency: str) -> int:
        """Get interval in minutes for a monitoring frequency."""
        intervals = {
            cls.HOURLY: 60,
            cls.EVERY_4_HOURS: 240,
            cls.EVERY_8_HOURS: 480,
            cls.DAILY: 1440,
            cls.WEEKLY: 10080,
        }
        return intervals.get(frequency, 1440)  # Default to daily


class Source(IdPkBase, CreatableBase, UpdatableBase):
    """Model representing a regulatory source being monitored."""

    __tablename__ = "regulatory_sources"

    name: Mapped[str] = mapped_column(index=True)
    base_url: Mapped[str] = mapped_column(index=True)
    description: Mapped[str | None]

    jurisdiction_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("jurisdictions.id", ondelete="SET NULL"), index=True, nullable=True
    )
    organization_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("organizations.id", ondelete="SET NULL"), index=True, nullable=True
    )
    content_types: Mapped[list[str]] = mapped_column(ARRAY(Text), default=[])

    monitoring_enabled: Mapped[bool] = mapped_column(default=True, index=True)
    monitoring_frequency: Mapped[str] = mapped_column(default=MonitoringFrequency.DAILY.value)

    last_monitoring_scheduled_at: Mapped[datetime | None] = mapped_column(index=True)
    last_monitoring_started_at: Mapped[datetime | None] = mapped_column(index=True)
    last_monitoring_completed_at: Mapped[datetime | None] = mapped_column(index=True)

    monitored_pages: Mapped[list["MonitoredPage"]] = relationship(
        back_populates="source", cascade="all, delete-orphan", order_by="MonitoredPage.last_monitored_at.desc()"
    )
    obligations: Mapped[list["Obligation"]] = relationship(back_populates="source", cascade="all, delete-orphan")
    alerts: Mapped[list["Alert"]] = relationship(back_populates="source", cascade="all, delete-orphan")
    jurisdiction: Mapped["Jurisdiction"] = relationship(back_populates="sources")
    organization: Mapped["Organization"] = relationship(back_populates="sources")

    @hybrid_property
    def monitoring_frequency_item(self) -> Item:
        return Item(id=self.monitoring_frequency, name=self.monitoring_frequency.replace("_", " ").title())

    @hybrid_property
    def content_types_items(self) -> list[Item]:
        content_types = []
        for content_type in self.content_types:
            if content_type_data := ContentType.get_content_type_data_by_id(content_type):
                content_types.append(Item.model_validate(content_type_data))
        return content_types

    @classmethod
    def get_query(cls, with_jurisdiction: bool = False, **kwargs: Any) -> Select[tuple[Self]]:
        """Get query for all entities."""
        query = super().get_query(**kwargs)
        if with_jurisdiction:
            query = query.options(selectinload(Source.jurisdiction))
        return query
