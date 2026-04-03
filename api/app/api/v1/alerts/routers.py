from typing import Any
from uuid import UUID

from fastapi import APIRouter, status
from fastapi_filter import FilterDepends
from fastapi_pagination.ext.sqlalchemy import apaginate

from app.api.v1.alerts.filters import AlertFilter
from app.api.v1.alerts.schemas import (
    AlertAssetsResponse,
    BulkDeleteAlertsRequest,
    GetAlertResponse,
    UpdateAlertRequest,
    UpdateAlertResponse,
)
from app.auth.depends import AuthUser
from app.core.exceptions import RespondWith404NotFound, RespondWith422ValidationError
from app.core.schemas import PaginatedResponse
from app.db.pg.base import DbSession
from app.db.pg.models.alerts import Alert, AlertStatus, ObligationAlertType, RiskLevel
from app.db.pg.models.base import Item
from app.db.pg.models.sources import ContentType
from app.services import alerts as alert_service

router = APIRouter(prefix="/alerts", tags=["Alerts"])


@router.get(
    "",
    response_model=PaginatedResponse[GetAlertResponse],
    status_code=status.HTTP_200_OK,
    operation_id="get_alerts",
)
async def get_alerts(
    db: DbSession,
    user: AuthUser,
    filtering: AlertFilter = FilterDepends(AlertFilter),
) -> PaginatedResponse[GetAlertResponse]:
    """Get a list of regulatory alerts with filtering and pagination."""
    query = Alert.get_query(with_source=True).where(Alert.organization_id == user.organization_id)
    query = filtering.sort(query)
    query = filtering.filter(query)
    return await apaginate(db, query)


@router.get(
    "/assets",
    response_model=AlertAssetsResponse,
    status_code=status.HTTP_200_OK,
    operation_id="get_alert_assets",
)
async def get_alert_assets(_: AuthUser) -> AlertAssetsResponse:
    """Get available assets for alerts."""
    statuses_data = [Item(id=status.value, name=status.value.replace("_", " ").title()) for status in AlertStatus]
    risks_levels_data = [Item(id=risk.value, name=risk.value.title()) for risk in RiskLevel]
    alert_types_data = [
        Item.model_validate(alert_type) for alert_type in ObligationAlertType.get_obligation_alert_type_data().values()
    ]
    content_types_data = [
        Item.model_validate(content_type) for content_type in ContentType.get_content_type_data().values()
    ]

    return AlertAssetsResponse(
        statuses=statuses_data,
        risk_levels=risks_levels_data,
        alert_types=alert_types_data,
        content_types=content_types_data,
    )


@router.get(
    "/{alert_id}",
    response_model=GetAlertResponse,
    status_code=status.HTTP_200_OK,
    operation_id="get_alert",
)
async def get_alert(
    db: DbSession,
    user: AuthUser,
    alert_id: UUID,
) -> Any:
    """Get a regulatory alert by ID."""
    alert = await alert_service.get_alert_by_id_and_filters(
        db=db,
        alert_id=alert_id,
        organization_id=user.organization_id,
        with_source=True,
    )
    if not alert:
        raise RespondWith404NotFound(message="Alert not found")

    return alert


@router.patch(
    "/{alert_id}",
    response_model=UpdateAlertResponse,
    status_code=status.HTTP_200_OK,
    operation_id="update_alert",
)
async def update_alert(db: DbSession, user: AuthUser, alert_id: UUID, payload: UpdateAlertRequest) -> Any:
    """Update a regulatory alert."""
    alert = await alert_service.get_alert_by_id_and_filters(
        db=db, alert_id=alert_id, organization_id=user.organization_id
    )
    if not alert:
        raise RespondWith404NotFound(message="Alert not found")

    try:
        await alert_service.update_alert(db=db, alert=alert, payload=payload, user=user)
    except ValueError as e:
        raise RespondWith422ValidationError(details={"message": str(e)})

    return await alert_service.get_alert_by_id_and_filters(db=db, alert_id=alert.id, with_source=True)


@router.delete(
    "/{alert_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    operation_id="delete_alert",
)
async def delete_alert(db: DbSession, user: AuthUser, alert_id: UUID) -> None:
    """Delete a regulatory alert."""
    alert = await alert_service.get_alert_by_id_and_filters(
        db=db, alert_id=alert_id, organization_id=user.organization_id
    )
    if not alert:
        raise RespondWith404NotFound(message="Alert not found")

    await db.delete(alert)
    await db.commit()


@router.delete(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
    operation_id="bulk_delete_alerts",
)
async def bulk_delete_alerts(db: DbSession, user: AuthUser, payload: BulkDeleteAlertsRequest) -> None:
    """Bulk delete regulatory alerts."""
    deleted_count = await alert_service.bulk_delete_alerts_by_ids(
        db=db, alert_ids=payload.ids, organization_id=user.organization_id
    )

    if deleted_count == 0:
        raise RespondWith404NotFound(message="No alerts found to delete")

    await db.commit()
