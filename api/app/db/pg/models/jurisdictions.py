"""Models file for Jurisdictions."""

from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import UUID, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.pg.models.base import CreatableBase, IdPkBase, UpdatableBase

if TYPE_CHECKING:
    from app.db.pg.models.sources import Source


class JurisdictionCode(StrEnum):
    """Enum for jurisdiction codes."""

    US = "US"
    EU = "EU"
    CA = "CA"
    UK = "UK"
    DE = "DE"
    AE = "AE"
    CH = "CH"
    FR = "FR"
    IT = "IT"
    ES = "ES"
    NL = "NL"
    BE = "BE"
    SE = "SE"
    JP = "JP"


JURISDICTIONS = {
    JurisdictionCode.US: {
        "name": "United States",
        "description": "United States",
    },
    JurisdictionCode.EU: {
        "name": "European Union",
        "description": "European Union",
    },
    JurisdictionCode.CA: {
        "name": "Canada",
        "description": "Canada",
    },
    JurisdictionCode.UK: {
        "name": "United Kingdom",
        "description": "United Kingdom",
    },
    JurisdictionCode.DE: {
        "name": "Germany",
        "description": "Germany",
    },
    JurisdictionCode.AE: {
        "name": "United Arab Emirates",
        "description": "United Arab Emirates",
    },
    JurisdictionCode.CH: {
        "name": "Switzerland",
        "description": "Switzerland",
    },
    JurisdictionCode.FR: {
        "name": "France",
        "description": "France",
    },
    JurisdictionCode.IT: {
        "name": "Italy",
        "description": "Italy",
    },
    JurisdictionCode.ES: {
        "name": "Spain",
        "description": "Spain",
    },
    JurisdictionCode.NL: {
        "name": "Netherlands",
        "description": "Netherlands",
    },
    JurisdictionCode.BE: {
        "name": "Belgium",
        "description": "Belgium",
    },
    JurisdictionCode.SE: {
        "name": "Sweden",
        "description": "Sweden",
    },
    JurisdictionCode.JP: {
        "name": "Japan",
        "description": "Japan",
    },
}


class Jurisdiction(IdPkBase, CreatableBase, UpdatableBase):
    """Model representing a regulatory jurisdiction (e.g., US, EU)."""

    __tablename__ = "jurisdictions"

    organization_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"), index=True, nullable=True
    )

    code: Mapped[str] = mapped_column(index=True)
    name: Mapped[str] = mapped_column(index=True)
    description: Mapped[str | None] = mapped_column(Text)

    sources: Mapped[list["Source"]] = relationship(back_populates="jurisdiction")
