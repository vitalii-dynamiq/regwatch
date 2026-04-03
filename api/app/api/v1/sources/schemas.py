from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field, HttpUrl

from app.core.schemas import IdCreatedUpdatedSchema
from app.db.pg.models.base import Item
from app.db.pg.models.sources import MonitoringFrequency


class CreateSourceRequest(BaseModel):
    name: str
    base_url: HttpUrl
    description: str = None
    jurisdiction_id: UUID = None
    content_types: list[str] = Field(default_factory=list, min_length=1)
    monitoring_enabled: bool = True
    monitoring_frequency: MonitoringFrequency = MonitoringFrequency.DAILY


class UpdateSourceRequest(BaseModel):
    name: str = None
    description: str = None
    content_types: list[str] = Field(default_factory=list, min_length=1)
    monitoring_enabled: bool = None
    monitoring_frequency: MonitoringFrequency = None


class GetSourceResponse(IdCreatedUpdatedSchema):
    name: str
    base_url: str
    description: str | None
    jurisdiction: Item | None
    content_types: list[Item] | None = Field(..., validation_alias="content_types_items")
    monitoring_enabled: bool
    monitoring_frequency: Item = Field(..., validation_alias="monitoring_frequency_item")
    last_monitoring_started_at: datetime | None
    last_monitoring_completed_at: datetime | None


class GetSourceDetailResponse(GetSourceResponse):
    pages_count: int = 0
    obligations_count: int = 0
    alerts_count: int = 0


class GetSourcePageResponse(IdCreatedUpdatedSchema):
    last_monitored_at: datetime
    url: str
    path: str | None
    title: str | None
    is_regulatory: bool
    alerts_count: int


class CreateSourceResponse(GetSourceResponse):
    pass


class UpdateSourceResponse(GetSourceResponse):
    pass


class JurisdictionItem(Item):
    code: str


class BulkDeleteSourcesRequest(BaseModel):
    ids: list[UUID] = Field(..., min_length=1, description="List of source IDs to delete")


class BulkUpdateSourcesMonitoringRequest(BaseModel):
    ids: list[UUID] = Field(..., min_length=1, description="List of source IDs to update")
    monitoring_enabled: bool = Field(..., description="Enable or disable monitoring for all specified sources")


class SourceAssetsResponse(BaseModel):
    jurisdictions: list[JurisdictionItem]
    content_types: list[Item]
    monitoring_frequency: list[Item]
