from typing import Annotated, Any, AsyncGenerator, TypeVar

from fastapi import Depends
from pydantic import BaseModel
from sqlalchemy import inspect
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import relationship

from app.core.settings import settings
from app.db.pg.models.base import Base

engine = create_async_engine(
    settings.db_async_url,
    echo=settings.DB_ECHO_SQL,
    pool_size=settings.DB_POOL_MAX_SIZE,
    max_overflow=settings.DB_POOL_MAX_OVERFLOW,
    pool_pre_ping=True,
    pool_timeout=settings.DB_POOL_TIMEOUT,
    pool_recycle=settings.DB_POOL_RECYCLE,
)
SessionLocal = async_sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)
Entity = TypeVar("Entity", bound=Base)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        yield session


# Dependency to get a database session
DbSession = Annotated[AsyncSession, Depends(get_session)]

# Lazy load is not supported in async SQLAlchemy and leads to errors
# that are hard to debug
relationship.__kwdefaults__["lazy"] = "raise_on_sql"


def init_entity(
    entity_class: type[Entity],
    payload: BaseModel | None = None,
    payload_exclude_values: set[str] | None = None,
    extra_values: dict[str, Any] | None = None,
) -> Entity:
    extra_values = (extra_values or {}).copy()
    entity_payload = {}
    if payload:
        entity_payload |= payload.model_dump(exclude=payload_exclude_values)
    entity_payload |= extra_values

    return entity_class(**entity_payload)


async def create_entity(
    db: AsyncSession,
    entity_class: type[Entity],
    payload: BaseModel | None = None,
    payload_exclude_values: set[str] | None = None,
    extra_values: dict[str, Any] | None = None,
    flush: bool = False,
    commit: bool = True,
) -> Entity:
    entity = init_entity(
        entity_class=entity_class,
        payload=payload,
        payload_exclude_values=payload_exclude_values,
        extra_values=extra_values,
    )
    db.add(entity)

    if flush:
        await db.flush(objects=[entity])

    if commit:
        await db.commit()

    return entity


async def create_entities(
    db: AsyncSession,
    entities: list[Entity],
    flush: bool = False,
    commit: bool = True,
) -> list[Entity]:
    db.add_all(entities)
    if flush:
        await db.flush(objects=entities)

    if commit:
        await db.commit()

    return entities


async def update_entity(
    db: AsyncSession,
    entity: Entity,
    payload: BaseModel | None = None,
    payload_exclude_values: set[str] | None = None,
    partial: bool = False,
    extra_values: dict[str, Any] | None = None,
    flush: bool = False,
    commit: bool = True,
) -> Entity:
    entity_type = entity.__class__
    extra_values = (extra_values or {}).copy()
    entity_payload = {}
    if payload:
        entity_payload |= payload.model_dump(exclude=payload_exclude_values, exclude_unset=partial)
    entity_payload |= extra_values

    columns = inspect(entity_type).all_orm_descriptors
    for field, value in entity_payload.items():
        if field not in columns:
            raise ValueError(f"Field '{field}' not found in entity '{entity_type.__name__}'")

        setattr(entity, field, value)

    if flush:
        await db.flush(objects=[entity])

    if commit:
        await db.commit()

    return entity


async def refresh_entities(
    db: AsyncSession,
    entity_class: type[Entity],
    entities: list[Entity],  # the same type of entities
) -> list[Entity]:
    query = entity_class.get_query().where(entity_class.id.in_([e.id for e in entities]))
    result = await db.scalars(query)
    return result.all()


async def refresh_entity(
    db: AsyncSession,
    entity: Entity,
) -> None:
    await db.refresh(entity)
