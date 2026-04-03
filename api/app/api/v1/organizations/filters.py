from fastapi_filter.contrib.sqlalchemy import Filter

from app.db.pg.models.organizations import Organization


class OrganizationFilter(Filter):
    """Filter class for Organization."""

    order_by: list[str] | None = ["name", "created_at"]

    class Constants(Filter.Constants):
        model = Organization
        order_by_fields = [
            "name",
            "created_at",
            "updated_at",
        ]
