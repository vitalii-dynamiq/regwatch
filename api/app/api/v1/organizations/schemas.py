import re
from typing import ClassVar

from pydantic import BaseModel, field_validator

from app.api.v1.sources.schemas import JurisdictionItem
from app.core.schemas import IdCreatedUpdatedSchema
from app.db.pg.models.jurisdictions import JurisdictionCode


class CreateOrganizationRequest(BaseModel):
    """Schema for creating a new organization."""

    DOMAIN_PATTERN: ClassVar[re.Pattern] = re.compile(
        r"^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$"
    )

    name: str
    description: str = None
    domains: list[str] = []
    jurisdictions: list[str] | None = None

    @field_validator("domains")
    @classmethod
    def validate_domains(cls, v: list[str]) -> list[str]:
        """Validate domain formats and remove duplicates."""
        seen_domains = set()

        for domain in v:
            clean_domain = domain.strip().lower()
            if not cls.DOMAIN_PATTERN.match(clean_domain):
                raise ValueError(f"Invalid domain format: '{domain}'")
            seen_domains.add(clean_domain)

        return list(seen_domains)

    @field_validator("jurisdictions")
    @classmethod
    def validate_jurisdictions(cls, v: list[str] | None) -> list[str] | None:
        """Validate jurisdiction codes and remove duplicates"""
        if v is None:
            return v

        seen_codes = set()
        for code in v:
            if code not in JurisdictionCode:
                raise ValueError(f"Invalid jurisdiction code: '{code}'")
            seen_codes.add(code)

        return list(seen_codes)


class GetOrganizationResponse(IdCreatedUpdatedSchema):
    """Schema for organization response."""

    name: str
    description: str | None


class CreateOrganizationResponse(GetOrganizationResponse):
    """Schema for organization creation response."""

    pass


class OrganizationAssetsResponse(BaseModel):
    """Schema for organization assets response."""

    jurisdictions: list[JurisdictionItem]
