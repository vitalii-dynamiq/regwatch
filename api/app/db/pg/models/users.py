"""Models file for Users."""

from typing import TYPE_CHECKING, Optional

from sqlalchemy import UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.pg.models.base import CreatableBase, IdPkBase, UpdatableBase

if TYPE_CHECKING:
    from app.db.pg.models.organizations import Organization


class User(IdPkBase, CreatableBase, UpdatableBase):
    """Model representing a user belonging to an organization."""

    __tablename__ = "users"

    organization_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("organizations.id", ondelete="SET NULL"), index=True, nullable=True
    )
    external_id: Mapped[str] = mapped_column(index=True, unique=True)
    email: Mapped[str | None] = mapped_column(index=True, unique=True)
    first_name: Mapped[str | None]
    last_name: Mapped[str | None]

    organization: Mapped[Optional["Organization"]] = relationship(back_populates="users")
