from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import ConfigDict, Field

from app.db.pg.models.pages import MonitoredPage
from app.db.pg.models.sources import MonitoringFrequency, Source


class SourceFilter(Filter):
    """Filter class for Source."""

    order_by: list[str] | None = ["name", "created_at"]
    search: str | None = None
    jurisdiction_id__in: list[str] | None = Field(default=None, validation_alias="jurisdiction__in")
    monitoring_enabled: bool | None = None
    monitoring_frequency: MonitoringFrequency | None = None

    model_config = ConfigDict(populate_by_name=True)

    class Constants(Filter.Constants):
        model = Source
        search_model_fields = ["name", "base_url"]
        order_by_fields = [
            "name",
            "monitoring_enabled",
            "monitoring_frequency",
            "last_monitoring_started_at",
            "last_monitoring_completed_at",
            "created_at",
            "updated_at",
        ]


class SourcePageFilter(Filter):
    """Filter class for SourcePage."""

    order_by: list[str] | None = ["created_at", "title"]
    is_regulatory: bool | None = None

    model_config = ConfigDict(populate_by_name=True)

    class Constants(Filter.Constants):
        model = MonitoredPage
        search_model_fields = ["title", "url"]
        order_by_fields = [
            "is_regulatory",
            "alerts_count",
            "title",
            "url",
            "last_monitored_at",
            "created_at",
            "updated_at",
        ]
