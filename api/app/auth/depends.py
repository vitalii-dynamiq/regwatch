from typing import Annotated

from fastapi import Depends, Header
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.app_ctx import AppCtx
from app.core.exceptions import RespondWith401Unauthorized, RespondWith404NotFound
from app.core.settings import settings
from app.db.pg.base import DbSession
from app.db.pg.models.users import User
from app.services.users import get_user_by_external_id

http_bearer = HTTPBearer(auto_error=False)

TokenHeader = Annotated[HTTPAuthorizationCredentials | None, Depends(http_bearer)]
ProfileHeader = Annotated[str | None, Header()]
FingerPrintHeader = Annotated[str | None, Header()]


async def get_user_external_id_by_jwt(credentials: TokenHeader) -> str:
    token = credentials.credentials
    jwt_payload = await AppCtx.auth0_client.verify_jwt(token)
    return jwt_payload["sub"]


async def get_user_by_jwt(
    db: DbSession,
    credentials: TokenHeader,
    raise_404_on_not_found: bool = False,
) -> User:
    if credentials is None:
        raise RespondWith401Unauthorized(message="Invalid user credentials")

    user_external_id = await get_user_external_id_by_jwt(credentials)
    if not (user := await get_user_by_external_id(db=db, external_id=user_external_id)):
        if raise_404_on_not_found:
            raise RespondWith404NotFound(message="User not found")
        raise RespondWith401Unauthorized(message="Invalid user credentials")

    return user


async def get_user_by_jwt_with_raise_404_on_not_found(db: DbSession, credentials: TokenHeader) -> User:
    return await get_user_by_jwt(db=db, credentials=credentials, raise_404_on_not_found=True)


async def get_user_by_jwt_with_raise_401_on_not_found(
    db: DbSession,
    credentials: TokenHeader,
) -> User:
    return await get_user_by_jwt(db=db, credentials=credentials, raise_404_on_not_found=False)


async def verify_admin_token(credentials: TokenHeader) -> bool:
    """Verify admin token for protected endpoints."""
    if credentials is None:
        raise RespondWith401Unauthorized(message="Admin token required")

    admin_token = settings.ADMIN_TOKEN.get_secret_value()
    if credentials.credentials != admin_token:
        raise RespondWith401Unauthorized(message="Invalid admin token")

    return True


AuthUserExternalId = Annotated[str, Depends(get_user_external_id_by_jwt)]
AuthUser = Annotated[User, Depends(get_user_by_jwt_with_raise_401_on_not_found)]
AuthUserWith404Raise = Annotated[User, Depends(get_user_by_jwt_with_raise_404_on_not_found)]
AdminAuth = Annotated[bool, Depends(verify_admin_token)]
