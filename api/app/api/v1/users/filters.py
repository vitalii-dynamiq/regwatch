from fastapi_filter.contrib.sqlalchemy import Filter

from app.db.pg.models.users import User


class UserFilter(Filter):
    """Filter class for User."""

    order_by: list[str] | None = ["email", "created_at"]

    class Constants(Filter.Constants):
        model = User
        order_by_fields = [
            "email",
            "created_at",
            "updated_at",
        ]
