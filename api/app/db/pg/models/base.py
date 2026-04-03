import uuid
from datetime import datetime
from enum import Enum
from typing import Any, Self
from uuid import UUID

from pydantic import BaseModel
from sqlalchemy import BigInteger, DateTime, Delete
from sqlalchemy import Enum as EnumField
from sqlalchemy import Select, UniqueConstraint, delete, func, inspect, select, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.asyncio import AsyncSession, async_object_session
from sqlalchemy.orm import Mapped, declarative_base, mapped_column

from app.db.pg.constants import DbColumnOrder

DryBase = declarative_base(
    type_annotation_map={
        int: BigInteger(),
        datetime: DateTime(timezone=True),
        Enum: EnumField(values_callable=lambda obj: [e.value for e in obj]),
        dict: JSONB(none_as_null=True),
    },
)


class Item(BaseModel):
    id: str | UUID
    name: str
    description: str | None = None


class Base(DryBase):
    __abstract__ = True

    def __str__(self) -> str:
        """Get string representation of entity by unique keys."""
        unique_keys = self._get_pk_values()
        unique_keys.update(self._get_secondary_unique_key_values())
        unique_keys_str = ", ".join(f"{key}={value}" for key, value in unique_keys.items())
        return f"{type(self).__name__}({unique_keys_str}, ...)"

    def _get_pk_values(self) -> dict[str, Any]:
        """Get primary key values."""
        return {key.name: getattr(self, key.name) for key in inspect(type(self)).primary_key}

    def _get_secondary_unique_key_values(self) -> dict[str, Any]:
        """Get secondary unique key values."""
        values = {}
        for constraint in inspect(type(self)).selectable.constraints:
            if isinstance(constraint, UniqueConstraint):
                for column in constraint.columns:
                    values[column.name] = getattr(self, column.name)

        return values

    @classmethod
    def get_query(cls, **kwargs: Any) -> Select[tuple[Self]]:
        """Get query for all entities."""
        return select(cls)

    @classmethod
    def delete_query(cls, **kwargs: Any) -> Delete[tuple[Self]]:
        """Delete query for all entities."""
        return delete(cls)

    async def refresh(self, **kwargs: Any) -> None:
        """Refresh entity with calling get_query.

        :param kwargs: kwargs for get_query
        """
        primary_keys = inspect(type(self)).primary_key
        filters = [getattr(type(self), key.name) == getattr(self, key.name) for key in primary_keys]

        query = self.get_query(**kwargs).filter(*filters).execution_options(populate_existing=True)
        await self.async_session.execute(query)

    @property
    def async_session(self) -> AsyncSession:
        """Get session."""
        async_session = async_object_session(self)
        return async_session


class IdPkBase(Base):
    __abstract__ = True

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
        server_default=text("gen_random_uuid()"),
        sort_order=DbColumnOrder.ID,
    )


class CreatableBase(Base):
    __abstract__ = True

    created_at: Mapped[datetime] = mapped_column(
        server_default=func.now(),
        index=True,
        sort_order=DbColumnOrder.CREATED_AT,
    )


class UpdatableBase(Base):
    __abstract__ = True

    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(),
        onupdate=func.now(),
        sort_order=DbColumnOrder.UPDATED_AT,
    )
