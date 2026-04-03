from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.core.schemas import IdCreatedUpdatedSchema
from app.db.pg.models.alerts import ObligationAlertType, RiskLevel
from app.db.pg.models.base import Item
from app.db.pg.models.obligations import ObligationStatus
from app.db.pg.models.sources import ContentType


class ObligationSource(BaseModel):
    id: UUID
    name: str
    base_url: str


class CreateObligationRequest(BaseModel):
    source_id: UUID
    alert_id: UUID | None = None
    title: str
    obligation_type: ObligationAlertType | None = None
    content_type: ContentType
    description: str | None = None
    risk_level: RiskLevel
    due_date: datetime | None = None
    effective_date: datetime | None = None
    assigned_to: UUID | None = None
    regulatory_metadata: dict | None = None


class UpdateObligationRequest(BaseModel):
    title: str = None
    description: str | None = None
    risk_level: RiskLevel = None
    content_type: ContentType = None
    status: ObligationStatus | None = None
    assigned_to: UUID | None = None
    due_date: datetime | None = None
    effective_date: datetime | None = None
    regulatory_metadata: dict | None = None


class GetObligationResponse(IdCreatedUpdatedSchema):
    title: str
    obligation_type: Item | None = Field(..., validation_alias="obligation_type_item")
    content_type: Item = Field(..., validation_alias="content_type_item")
    description: str | None
    risk_level: Item | None = Field(..., validation_alias="risk_level_item")
    status: Item = Field(..., validation_alias="status_item")
    due_date: datetime | None
    effective_date: datetime | None
    completed_at: datetime | None
    regulatory_metadata: dict | None
    assigned_to: UUID | None
    assigned_at: datetime | None
    last_updated_by: UUID | None
    source: ObligationSource


class CreateObligationResponse(GetObligationResponse):
    pass


class UpdateObligationResponse(GetObligationResponse):
    pass


class BulkDeleteObligationsRequest(BaseModel):
    ids: list[UUID] = Field(..., min_length=1, description="List of obligation IDs to delete")


class ObligationAssetsResponse(BaseModel):
    statuses: list[Item]
    risk_levels: list[Item]
    obligation_types: list[Item]
    content_types: list[Item]
