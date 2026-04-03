from uuid import UUID

from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import ConfigDict, Field

from app.db.pg.models.alerts import Alert, AlertStatus, ObligationAlertType, RiskLevel
from app.db.pg.models.sources import ContentType


class AlertFilter(Filter):
    """Filter class for Obligation."""

    order_by: list[str] | None = ["created_at", "title"]
    search: str | None = None

    risk_level: RiskLevel | None = None
    status: AlertStatus | None = None
    alert_type: ObligationAlertType | None = None
    source_id__in: list[str] | None = Field(default=None, validation_alias="source__in")
    content_type__in: list[ContentType] | None = None
    assigned_to: UUID | None = None

    model_config = ConfigDict(populate_by_name=True)

    class Constants(Filter.Constants):
        model = Alert
        search_model_fields = ["title", "description"]
        order_by_fields = [
            "title",
            "risk_level",
            "status",
            "alert_type",
            "content_type",
            "due_date",
            "effective_date",
            "assigned_to",
            "assigned_at",
            "last_updated_by",
            "created_at",
            "updated_at",
        ]
