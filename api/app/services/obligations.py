from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import delete

from app.api.v1.obligations.schemas import CreateObligationRequest, UpdateObligationRequest
from app.db.pg.base import DbSession, create_entity, update_entity
from app.db.pg.models.obligations import Obligation, ObligationStatus
from app.db.pg.models.users import User
from app.services.sources import get_source_by_id_and_filters
from app.services.users import get_user_by_id


async def create_obligation(
    db: DbSession,
    payload: CreateObligationRequest,
    user: User,
) -> Obligation:
    """Create a new obligation."""
    source = await get_source_by_id_and_filters(
        db=db, source_id=payload.source_id, organization_id=user.organization_id
    )
    if not source:
        raise ValueError("Source not found")

    assigned_at = None
    if payload.assigned_to:
        assigned_user = await get_user_by_id(db=db, user_id=payload.assigned_to)
        if not assigned_user or assigned_user.organization_id != user.organization_id:
            raise ValueError("Assigned user not found")
        assigned_at = datetime.now(timezone.utc)

    obligation = await create_entity(
        db=db,
        entity_class=Obligation,
        payload=payload,
        extra_values={
            "organization_id": user.organization_id,
            "last_updated_by": user.id,
            "status": ObligationStatus.NEW.value,
            "assigned_at": assigned_at,
        },
    )

    return obligation


async def get_obligation_by_id_and_filters(
    db: DbSession,
    obligation_id: UUID,
    organization_id: UUID | None = None,
    with_source: bool = False,
) -> Obligation | None:
    """Get obligation by ID and filters."""
    stmt = Obligation.get_query(with_source=with_source).where(Obligation.id == obligation_id)
    if organization_id:
        stmt = stmt.where(Obligation.organization_id == organization_id)
    obligation = await db.scalar(stmt)
    return obligation


async def update_obligation(
    db: DbSession,
    obligation: Obligation,
    payload: UpdateObligationRequest,
    user: User,
) -> Obligation:
    """Update an obligation with validation logic."""
    extra_values = {"last_updated_by": user.id}

    # Handle assigned_to validation and auto-setting assigned_at
    if payload.assigned_to:
        assigned_user = await get_user_by_id(db=db, user_id=payload.assigned_to)
        if not assigned_user or assigned_user.organization_id != user.organization_id:
            raise ValueError("Assigned user not found or not in the same organization")

        if payload.assigned_to != obligation.assigned_to:
            extra_values["assigned_to"] = assigned_user.id
            extra_values["assigned_at"] = datetime.now(timezone.utc)

    await update_entity(
        db=db,
        entity=obligation,
        payload=payload,
        extra_values=extra_values,
        partial=True,
    )

    return obligation


async def bulk_delete_obligations_by_ids(
    db: DbSession,
    obligation_ids: list[UUID],
    organization_id: UUID,
) -> int:
    """Bulk delete obligations by IDs and organization."""
    stmt = delete(Obligation).where(
        Obligation.id.in_(obligation_ids),
        Obligation.organization_id == organization_id,
    )
    result = await db.execute(stmt)
    return result.rowcount
