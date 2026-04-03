from typing import Any

from fastapi import APIRouter, Depends, status
from fastapi_filter import FilterDepends
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy.exc import IntegrityError

from app.api.v1.organizations.schemas import CreateOrganizationRequest
from app.api.v1.users.filters import UserFilter
from app.api.v1.users.schemas import (
    CreateUserRequest,
    CreateUserResponse,
    GetUserResponse,
    UpdateUserRequest,
    UpdateUserResponse,
)
from app.auth.depends import AuthUser, AuthUserExternalId, verify_admin_token
from app.core.exceptions import RespondWith422ValidationError
from app.core.schemas import PaginatedResponse
from app.db.pg.base import DbSession, create_entity, update_entity
from app.db.pg.models.users import User
from app.services import organizations as organization_service
from app.services import users as user_service

router = APIRouter(prefix="/users", tags=["Users"])


@router.post(
    path="",
    response_model=CreateUserResponse,
    status_code=status.HTTP_201_CREATED,
    operation_id="create_user",
)
async def create_user(db: DbSession, user_external_id: AuthUserExternalId, payload: CreateUserRequest) -> Any:
    """Create a new user with automatic organization assignment based on email domain."""
    organization_name_prefix = (
        " ".join(name for name in (payload.first_name, payload.last_name) if name) or payload.email.split("@")[0]
    ).title()
    organization_name = f"{organization_name_prefix} Organization"

    organization = await organization_service.create_organization(
        db=db, payload=CreateOrganizationRequest(name=organization_name)
    )

    try:
        user = await create_entity(
            db=db,
            entity_class=User,
            payload=payload,
            extra_values={
                "external_id": user_external_id,
                "organization_id": organization.id,
            },
            commit=False,
            flush=True,
        )
    except IntegrityError:
        raise RespondWith422ValidationError(details={"message": "User already exists or invalid data"})

    await db.commit()
    return await user_service.get_user_by_id(db=db, user_id=user.id, with_organization=True)


@router.get(
    path="/me",
    response_model=GetUserResponse,
    status_code=status.HTTP_200_OK,
    operation_id="get_user",
)
async def get_user(db: DbSession, user: AuthUser) -> Any:
    return await user_service.get_user_by_id(db=db, user_id=user.id, with_organization=True)


@router.patch(
    path="/me",
    response_model=UpdateUserResponse,
    status_code=status.HTTP_200_OK,
    operation_id="partial_update_user",
)
async def partial_update_user(db: DbSession, user: AuthUser, payload: UpdateUserRequest) -> Any:
    await update_entity(db=db, payload=payload, entity=user, partial=True)
    return await user_service.get_user_by_id(db=db, user_id=user.id, with_organization=True)


@router.get(
    "",
    response_model=PaginatedResponse[GetUserResponse],
    status_code=status.HTTP_200_OK,
    operation_id="get_organization_users",
)
async def get_users_by_organization(
    db: DbSession,
    user: AuthUser,
    filtering: UserFilter = FilterDepends(UserFilter),
) -> Any:
    """Get a list of users by organization with filtering and pagination."""
    query = User.get_query().where(User.organization_id == user.organization_id)
    query = filtering.sort(query)
    query = filtering.filter(query)
    return await paginate(db, query)


@router.get(
    "",
    response_model=PaginatedResponse[GetUserResponse],
    status_code=status.HTTP_200_OK,
    operation_id="get_users",
    dependencies=[Depends(verify_admin_token)],
    tags=["Admin"],
)
async def get_users(
    db: DbSession,
    filtering: UserFilter = FilterDepends(UserFilter),
) -> Any:
    """Get a list of users with filtering and pagination."""
    query = User.get_query()
    query = filtering.sort(query)
    query = filtering.filter(query)
    return await paginate(db, query)
