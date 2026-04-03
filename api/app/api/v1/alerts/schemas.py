from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.core.schemas import IdCreatedUpdatedSchema
from app.db.pg.models.alerts import AlertStatus
from app.db.pg.models.base import Item


class AlertSource(BaseModel):
    id: UUID
    name: str
    base_url: str


class UpdateAlertRequest(BaseModel):
    status: AlertStatus = None
    assigned_to: UUID | None = None
    regulatory_metadata: dict | None = None


class GetAlertResponse(IdCreatedUpdatedSchema):
    title: str
    alert_type: Item = Field(..., validation_alias="alert_type_item")
    content_type: Item = Field(..., validation_alias="content_type_item")
    description: str | None
    risk_level: Item | None = Field(..., validation_alias="risk_level_item")
    status: Item = Field(..., validation_alias="status_item")
    due_date: datetime | None
    effective_date: datetime | None
    detected_at: datetime
    completed_at: datetime | None
    regulatory_metadata: dict | None
    assigned_to: UUID | None
    assigned_at: datetime | None
    last_updated_by: UUID | None
    source: AlertSource


class UpdateAlertResponse(GetAlertResponse):
    pass


class BulkDeleteAlertsRequest(BaseModel):
    ids: list[UUID] = Field(..., min_length=1, description="List of alert IDs to delete")


class AlertAssetsResponse(BaseModel):
    statuses: list[Item]
    risk_levels: list[Item]
    alert_types: list[Item]
    content_types: list[Item]
