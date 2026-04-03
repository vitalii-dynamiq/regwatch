from datetime import datetime
from typing import Generic, TypeVar
from uuid import UUID

from fastapi import Query
from fastapi_pagination import Page, Params
from pydantic import BaseModel, ConfigDict

T = TypeVar("T")


class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class IdCreatedUpdatedSchema(BaseSchema):
    id: UUID
    created_at: datetime
    updated_at: datetime


class PaginatedResponseParams(Params):
    size: int = Query(50, ge=1, le=100_000, description="Page size")


class PaginatedResponse(Page[T], Generic[T]):
    __params_type__ = PaginatedResponseParams
