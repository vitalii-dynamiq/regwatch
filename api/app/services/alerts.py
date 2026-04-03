from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import delete

from app.api.v1.alerts.schemas import UpdateAlertRequest
from app.db.pg.base import DbSession, update_entity
from app.db.pg.models.alerts import Alert
from app.db.pg.models.users import User
from app.services.users import get_user_by_id


async def get_alert_by_id_and_filters(
    db: DbSession,
    alert_id: UUID,
    organization_id: UUID | None = None,
    with_source: bool = False,
) -> Alert | None:
    """Get alert by ID and filters."""
    stmt = Alert.get_query(with_source=with_source).where(Alert.id == alert_id)
    if organization_id:
        stmt = stmt.where(Alert.organization_id == organization_id)
    alert = await db.scalar(stmt)
    return alert


async def update_alert(
    db: DbSession,
    alert: Alert,
    payload: UpdateAlertRequest,
    user: User,
) -> Alert:
    extra_values = {"last_updated_by": user.id}

    if payload.assigned_to:
        assigned_user = await get_user_by_id(db=db, user_id=payload.assigned_to)
        if not assigned_user or assigned_user.organization_id != user.organization_id:
            raise ValueError("Assigned user not found or not in the same organization")

        if payload.assigned_to != alert.assigned_to:
            extra_values["assigned_to"] = assigned_user.id
            extra_values["assigned_at"] = datetime.now(timezone.utc)

    await update_entity(
        db=db,
        entity=alert,
        payload=payload,
        extra_values=extra_values,
        partial=True,
    )

    return alert


async def bulk_delete_alerts_by_ids(
    db: DbSession,
    alert_ids: list[UUID],
    organization_id: UUID,
) -> int:
    """Bulk delete alerts by IDs and organization."""
    stmt = delete(Alert).where(
        Alert.id.in_(alert_ids),
        Alert.organization_id == organization_id,
    )
    result = await db.execute(stmt)
    return result.rowcount
