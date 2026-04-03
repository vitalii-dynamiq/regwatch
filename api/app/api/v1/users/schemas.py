from pydantic import BaseModel, EmailStr

from app.api.v1.organizations.schemas import GetOrganizationResponse
from app.core.schemas import IdCreatedUpdatedSchema


class CreateUserRequest(BaseModel):
    email: EmailStr
    first_name: str = None
    last_name: str = None


class UpdateUserRequest(BaseModel):
    first_name: str = None
    last_name: str = None


class GetUserResponse(IdCreatedUpdatedSchema):
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    organization: GetOrganizationResponse | None = None


class CreateUserResponse(GetUserResponse):
    pass


class UpdateUserResponse(GetUserResponse):
    pass
