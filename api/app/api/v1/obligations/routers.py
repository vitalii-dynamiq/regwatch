from typing import Any
from uuid import UUID

from fastapi import APIRouter, status
from fastapi_filter import FilterDepends
from fastapi_pagination.ext.sqlalchemy import apaginate
from sqlalchemy.exc import IntegrityError

from app.api.v1.obligations.filters import ObligationFilter
from app.api.v1.obligations.schemas import (
    BulkDeleteObligationsRequest,
    CreateObligationRequest,
    CreateObligationResponse,
    GetObligationResponse,
    ObligationAssetsResponse,
    UpdateObligationRequest,
    UpdateObligationResponse,
)
from app.auth.depends import AuthUser
from app.core.exceptions import RespondWith404NotFound, RespondWith422ValidationError
from app.core.schemas import PaginatedResponse
from app.db.pg.base import DbSession
from app.db.pg.models.alerts import ObligationAlertType, RiskLevel
from app.db.pg.models.base import Item
from app.db.pg.models.obligations import Obligation, ObligationStatus
from app.db.pg.models.sources import ContentType
from app.services import obligations as obligation_service

router = APIRouter(prefix="/obligations", tags=["Obligations"])


@router.post(
    "",
    response_model=CreateObligationResponse,
    status_code=status.HTTP_201_CREATED,
    operation_id="create_obligation",
)
async def create_obligation(
    db: DbSession,
    user: AuthUser,
    payload: CreateObligationRequest,
) -> CreateObligationResponse:
    """Create a new regulatory obligation."""
    try:
        obligation = await obligation_service.create_obligation(db=db, payload=payload, user=user)
    except ValueError as e:
        raise RespondWith422ValidationError(details={"message": str(e)})
    except IntegrityError:
        raise RespondWith422ValidationError(details={"message": "Obligation already exists or invalid data"})

    return await obligation_service.get_obligation_by_id_and_filters(
        db=db, obligation_id=obligation.id, organization_id=user.organization_id, with_source=True
    )


@router.get(
    "",
    response_model=PaginatedResponse[GetObligationResponse],
    status_code=status.HTTP_200_OK,
    operation_id="get_obligations",
)
async def get_obligations(
    db: DbSession,
    user: AuthUser,
    filtering: ObligationFilter = FilterDepends(ObligationFilter),
) -> PaginatedResponse[GetObligationResponse]:
    """Get a list of regulatory obligations with filtering and pagination."""
    query = Obligation.get_query(with_source=True).where(Obligation.organization_id == user.organization_id)
    query = filtering.sort(query)
    query = filtering.filter(query)
    return await apaginate(db, query)


@router.get(
    "/assets",
    response_model=ObligationAssetsResponse,
    status_code=status.HTTP_200_OK,
    operation_id="get_obligation_assets",
)
async def get_obligation_assets(_: AuthUser) -> ObligationAssetsResponse:
    """Get available assets for obligations."""
    statuses_data = [Item(id=status.value, name=status.value.replace("_", " ").title()) for status in ObligationStatus]
    risks_levels_data = [Item(id=risk.value, name=risk.value.title()) for risk in RiskLevel]
    obligation_types_data = [
        Item.model_validate(obligation_type)
        for obligation_type in ObligationAlertType.get_obligation_alert_type_data().values()
    ]
    content_types_data = [
        Item.model_validate(content_type) for content_type in ContentType.get_content_type_data().values()
    ]

    return ObligationAssetsResponse(
        statuses=statuses_data,
        risk_levels=risks_levels_data,
        obligation_types=obligation_types_data,
        content_types=content_types_data,
    )


@router.get(
    "/{obligation_id}",
    response_model=GetObligationResponse,
    status_code=status.HTTP_200_OK,
    operation_id="get_obligation",
)
async def get_obligation(
    db: DbSession,
    user: AuthUser,
    obligation_id: UUID,
) -> Any:
    """Get a regulatory obligation by ID."""
    obligation = await obligation_service.get_obligation_by_id_and_filters(
        db=db,
        obligation_id=obligation_id,
        organization_id=user.organization_id,
        with_source=True,
    )
    if not obligation:
        raise RespondWith404NotFound(message="Obligation not found")

    return obligation


@router.patch(
    "/{obligation_id}",
    response_model=UpdateObligationResponse,
    status_code=status.HTTP_200_OK,
    operation_id="update_obligation",
)
async def update_obligation(
    db: DbSession, user: AuthUser, obligation_id: UUID, payload: UpdateObligationRequest
) -> Any:
    """Update a regulatory obligation."""
    obligation = await obligation_service.get_obligation_by_id_and_filters(
        db=db, obligation_id=obligation_id, organization_id=user.organization_id
    )
    if not obligation:
        raise RespondWith404NotFound(message="Obligation not found")

    try:
        await obligation_service.update_obligation(db=db, obligation=obligation, payload=payload, user=user)
    except ValueError as e:
        raise RespondWith422ValidationError(details={"message": str(e)})

    return await obligation_service.get_obligation_by_id_and_filters(
        db=db, obligation_id=obligation.id, organization_id=user.organization_id, with_source=True
    )


@router.delete(
    "/{obligation_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    operation_id="delete_obligation",
)
async def delete_obligation(db: DbSession, user: AuthUser, obligation_id: UUID) -> None:
    """Delete a regulatory obligation."""
    obligation = await obligation_service.get_obligation_by_id_and_filters(
        db=db, obligation_id=obligation_id, organization_id=user.organization_id
    )
    if not obligation:
        raise RespondWith404NotFound(message="Obligation not found")

    await db.delete(obligation)
    await db.commit()


@router.delete(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
    operation_id="bulk_delete_obligations",
)
async def bulk_delete_obligations(db: DbSession, user: AuthUser, payload: BulkDeleteObligationsRequest) -> None:
    """Bulk delete regulatory obligations."""
    deleted_count = await obligation_service.bulk_delete_obligations_by_ids(
        db=db, obligation_ids=payload.ids, organization_id=user.organization_id
    )

    if deleted_count == 0:
        raise RespondWith404NotFound(message="No obligations found to delete")

    await db.commit()
