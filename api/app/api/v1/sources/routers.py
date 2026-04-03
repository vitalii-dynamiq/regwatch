from typing import Any
from uuid import UUID

from fastapi import APIRouter, status
from fastapi_filter import FilterDepends
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import undefer

from app.api.v1.sources.filters import SourceFilter, SourcePageFilter
from app.api.v1.sources.schemas import (
    BulkDeleteSourcesRequest,
    BulkUpdateSourcesMonitoringRequest,
    CreateSourceRequest,
    GetSourceDetailResponse,
    GetSourcePageResponse,
    GetSourceResponse,
    JurisdictionItem,
    SourceAssetsResponse,
    UpdateSourceRequest,
    UpdateSourceResponse,
)
from app.auth.depends import AuthUser
from app.core.exceptions import RespondWith404NotFound, RespondWith422ValidationError
from app.core.schemas import PaginatedResponse
from app.db.pg.base import DbSession, create_entity, update_entity
from app.db.pg.models.base import Item
from app.db.pg.models.pages import MonitoredPage
from app.db.pg.models.sources import ContentType, MonitoringFrequency, Source
from app.services import jurisdictions as jurisdiction_service
from app.services import sources as source_service

router = APIRouter(prefix="/sources", tags=["Sources"])


@router.post(
    "",
    response_model=GetSourceDetailResponse,
    status_code=status.HTTP_201_CREATED,
    operation_id="create_source",
)
async def create_source(db: DbSession, user: AuthUser, payload: CreateSourceRequest) -> Any:
    """Create a new regulatory source."""
    try:
        source = await create_entity(
            db=db,
            entity_class=Source,
            payload=payload,
            extra_values={
                "organization_id": user.organization_id,
                "base_url": str(payload.base_url),
            },
        )
    except IntegrityError:
        raise RespondWith422ValidationError(details={"message": "Source already exists or invalid data"})

    return await source_service.get_source_by_id_and_filters(db=db, source_id=source.id, with_jurisdiction=True)


@router.get(
    "",
    response_model=PaginatedResponse[GetSourceResponse],
    status_code=status.HTTP_200_OK,
    operation_id="get_sources",
)
async def get_sources(
    db: DbSession,
    user: AuthUser,
    filtering: SourceFilter = FilterDepends(SourceFilter),
) -> PaginatedResponse[GetSourceResponse]:
    """Get a list of regulatory sources with filtering and pagination."""
    query = Source.get_query(with_jurisdiction=True).where(Source.organization_id == user.organization_id)
    query = filtering.sort(query)
    query = filtering.filter(query)
    return await paginate(db, query)


@router.get(
    "/assets",
    response_model=SourceAssetsResponse,
    status_code=status.HTTP_200_OK,
    operation_id="get_source_assets",
)
async def get_source_assets(db: DbSession, user: AuthUser) -> SourceAssetsResponse:
    """Get available assets for sources."""
    jurisdictions = await jurisdiction_service.get_jurisdictions_by_organization(
        db=db, organization_id=user.organization_id
    )
    jurisdictions_data = [
        JurisdictionItem(id=str(j.id), name=j.name, code=j.code, description=j.description) for j in jurisdictions
    ]
    content_types_data = [
        Item.model_validate(content_type) for content_type in ContentType.get_content_type_data().values()
    ]
    monitoring_frequency_data = [
        Item(
            id=freq.value,
            name=freq.value.replace("_", " ").title(),
        )
        for freq in MonitoringFrequency
    ]

    return SourceAssetsResponse(
        jurisdictions=jurisdictions_data,
        content_types=content_types_data,
        monitoring_frequency=monitoring_frequency_data,
    )


@router.get(
    "/{source_id}",
    response_model=GetSourceDetailResponse,
    status_code=status.HTTP_200_OK,
    operation_id="get_source",
)
async def get_source(
    db: DbSession,
    user: AuthUser,
    source_id: UUID,
) -> Any:
    """Get a regulatory source by ID."""
    source = await source_service.get_source_by_id_and_filters(
        db=db, source_id=source_id, organization_id=user.organization_id, with_jurisdiction=True, with_counts=True
    )
    if not source:
        raise RespondWith404NotFound(message="Source not found")

    return source


@router.patch(
    "/{source_id}",
    response_model=UpdateSourceResponse,
    status_code=status.HTTP_200_OK,
    operation_id="update_source",
)
async def update_source(db: DbSession, user: AuthUser, source_id: UUID, payload: UpdateSourceRequest) -> Any:
    """Update a regulatory source."""
    source = await source_service.get_source_by_id_and_filters(
        db=db, source_id=source_id, organization_id=user.organization_id
    )
    if not source:
        raise RespondWith404NotFound(message="Source not found")

    await update_entity(db=db, entity=source, payload=payload, partial=True)

    return await source_service.get_source_by_id_and_filters(db=db, source_id=source.id, with_jurisdiction=True)


@router.delete(
    "/{source_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    operation_id="delete_source",
)
async def delete_source(db: DbSession, user: AuthUser, source_id: UUID) -> None:
    """Delete a regulatory source."""
    source = await source_service.get_source_by_id_and_filters(
        db=db, source_id=source_id, organization_id=user.organization_id
    )
    if not source:
        raise RespondWith404NotFound(message="Source not found")

    await db.delete(source)
    await db.commit()


@router.patch(
    "",
    status_code=status.HTTP_200_OK,
    operation_id="bulk_update_sources_monitoring",
)
async def bulk_update_sources_monitoring(
    db: DbSession, user: AuthUser, payload: BulkUpdateSourcesMonitoringRequest
) -> None:
    """Bulk update sources monitoring settings."""
    updated_count = await source_service.bulk_update_sources_monitoring_by_ids(
        db=db,
        organization_id=user.organization_id,
        payload=payload,
    )

    if updated_count == 0:
        raise RespondWith404NotFound(message="No sources found to update")

    await db.commit()
    return {}


@router.delete(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
    operation_id="bulk_delete_sources",
)
async def bulk_delete_sources(db: DbSession, user: AuthUser, payload: BulkDeleteSourcesRequest) -> None:
    """Bulk delete regulatory sources."""
    deleted_count = await source_service.bulk_delete_sources_by_ids(
        db=db, source_ids=payload.ids, organization_id=user.organization_id
    )

    if deleted_count == 0:
        raise RespondWith404NotFound(message="No sources found to delete")

    await db.commit()


@router.get(
    "/{source_id}/pages",
    response_model=PaginatedResponse[GetSourcePageResponse],
    status_code=status.HTTP_200_OK,
    operation_id="get_source_pages",
)
async def get_source_pages(
    db: DbSession,
    user: AuthUser,
    source_id: UUID,
    filtering: SourcePageFilter = FilterDepends(SourcePageFilter),
) -> Any:
    """Get a list of pages for a regulatory source."""
    query = (
        MonitoredPage.get_query()
        .options(undefer(MonitoredPage.alerts_count))
        .where(
            MonitoredPage.source_id == source_id,
            MonitoredPage.organization_id == user.organization_id,
        )
    )
    query = filtering.sort(query)
    query = filtering.filter(query)
    return await paginate(db, query)
