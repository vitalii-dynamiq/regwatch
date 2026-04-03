"""Organizations management API endpoints."""

from typing import Any

from fastapi import APIRouter, Depends, status
from fastapi_filter import FilterDepends
from fastapi_pagination.ext.sqlalchemy import paginate

from app.api.v1.organizations.filters import OrganizationFilter
from app.api.v1.organizations.schemas import (
    CreateOrganizationRequest,
    CreateOrganizationResponse,
    GetOrganizationResponse,
    OrganizationAssetsResponse,
)
from app.api.v1.sources.schemas import JurisdictionItem
from app.auth.depends import verify_admin_token
from app.core.schemas import PaginatedResponse
from app.db.pg.base import DbSession
from app.db.pg.models.jurisdictions import JURISDICTIONS
from app.db.pg.models.organizations import Organization
from app.services import organizations as organization_service

router = APIRouter(
    prefix="/organizations",
    tags=["Admin"],
    dependencies=[Depends(verify_admin_token)],
)


@router.get(
    "",
    response_model=PaginatedResponse[GetOrganizationResponse],
    status_code=status.HTTP_200_OK,
    operation_id="get_organizations",
)
async def get_organizations(
    db: DbSession,
    filtering: OrganizationFilter = FilterDepends(OrganizationFilter),
) -> Any:
    """Get a list of organizations with filtering and pagination."""
    query = Organization.get_query()
    query = filtering.sort(query)
    query = filtering.filter(query)
    return await paginate(db, query)


@router.post(
    "",
    response_model=CreateOrganizationResponse,
    status_code=status.HTTP_201_CREATED,
    operation_id="create_organization",
)
async def create_organization(
    db: DbSession,
    payload: CreateOrganizationRequest,
) -> CreateOrganizationResponse:
    """Create a new organization with all jurisdictions."""
    organization = await organization_service.create_organization(db, payload=payload)
    await db.commit()
    return organization


@router.get(
    "/assets",
    response_model=OrganizationAssetsResponse,
    status_code=status.HTTP_200_OK,
    operation_id="get_organization_assets",
)
async def get_organization_assets() -> OrganizationAssetsResponse:
    """Get available assets for organizations."""
    jurisdictions_data = [
        JurisdictionItem(id=code, name=data["name"], code=code, description=data["description"])
        for code, data in JURISDICTIONS.items()
    ]

    return OrganizationAssetsResponse(
        jurisdictions=jurisdictions_data,
    )
