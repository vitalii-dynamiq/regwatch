from uuid import UUID

from sqlalchemy.orm import selectinload

from app.db.pg.base import DbSession
from app.db.pg.models.users import User


async def get_user_by_external_id(db: DbSession, external_id: str) -> User | None:
    return await db.scalar(User.get_query().where(User.external_id == external_id))


async def get_user_by_id(
    db: DbSession,
    user_id: UUID,
    with_organization: bool = False,
) -> User | None:
    query = User.get_query().where(User.id == user_id)
    if with_organization:
        query = query.options(selectinload(User.organization))
    user = await db.scalar(query)
    return user
