from uuid import UUID

from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import ConfigDict, Field

from app.db.pg.models.alerts import ObligationAlertType, RiskLevel
from app.db.pg.models.obligations import Obligation
from app.db.pg.models.sources import ContentType


class ObligationFilter(Filter):
    """Filter class for Obligation."""

    order_by: list[str] | None = ["created_at", "title"]
    search: str | None = None

    risk_level: RiskLevel | None = None
    status: str | None = None
    source_id__in: list[str] | None = Field(default=None, validation_alias="source__in")
    content_type__in: list[ContentType] | None = None
    obligation_type: ObligationAlertType | None = None
    assigned_to: UUID | None = None

    model_config = ConfigDict(populate_by_name=True)

    class Constants(Filter.Constants):
        model = Obligation
        search_model_fields = ["title", "description"]
        order_by_fields = [
            "title",
            "risk_level",
            "status",
            "obligation_type",
            "due_date",
            "effective_date",
            "assigned_to",
            "assigned_at",
            "last_updated_by",
            "created_at",
            "updated_at",
        ]
