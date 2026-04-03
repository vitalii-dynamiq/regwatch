"""Models file for Organizations."""

from typing import TYPE_CHECKING

from sqlalchemy import ARRAY, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.pg.models.base import CreatableBase, IdPkBase, UpdatableBase

if TYPE_CHECKING:
    from app.db.pg.models.alerts import Alert
    from app.db.pg.models.obligations import Obligation
    from app.db.pg.models.pages import MonitoredPage
    from app.db.pg.models.sources import Source
    from app.db.pg.models.users import User


class Organization(IdPkBase, CreatableBase, UpdatableBase):
    """Model representing an organization (tenant)."""

    __tablename__ = "organizations"

    name: Mapped[str] = mapped_column(index=True)
    description: Mapped[str | None] = mapped_column(Text)
    domains: Mapped[list[str]] = mapped_column(ARRAY(Text), default=[])

    users: Mapped[list["User"]] = relationship(back_populates="organization")
    sources: Mapped[list["Source"]] = relationship(back_populates="organization", cascade="all, delete-orphan")
    alerts: Mapped[list["Alert"]] = relationship(back_populates="organization")
    obligations: Mapped[list["Obligation"]] = relationship(back_populates="organization")
    monitored_pages: Mapped[list["MonitoredPage"]] = relationship(back_populates="organization")
