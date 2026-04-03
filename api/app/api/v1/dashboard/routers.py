import asyncio

from fastapi import APIRouter, status
from sqlalchemy import func, select

from app.auth.depends import AuthUser
from app.db.pg.base import DbSession
from app.db.pg.models.obligations import Obligation, ObligationStatus
from app.db.pg.models.sources import Source

from .schemas import DashboardWidgetsResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/widgets", response_model=DashboardWidgetsResponse, status_code=status.HTTP_200_OK)
async def get_dashboard(db: DbSession, user: AuthUser) -> DashboardWidgetsResponse:
    """Get dashboard widgets statistics for the user's organization."""
    sources_count_query = select(func.count(Source.id)).where(Source.organization_id == user.organization_id)
    active_sources_count_query = select(func.count(Source.id)).where(
        Source.organization_id == user.organization_id, Source.monitoring_enabled == True  # noqa: E712
    )
    obligations_count_query = select(func.count(Obligation.id)).where(
        Obligation.organization_id == user.organization_id
    )
    resolved_obligations_count_query = select(func.count(Obligation.id)).where(
        Obligation.organization_id == user.organization_id,
        Obligation.status.not_in([ObligationStatus.NEW.value, ObligationStatus.IN_PROGRESS.value]),
    )

    sources_count, active_sources_count, obligations_count, resolved_obligations_count = await asyncio.gather(
        db.scalar(sources_count_query),
        db.scalar(active_sources_count_query),
        db.scalar(obligations_count_query),
        db.scalar(resolved_obligations_count_query),
    )

    return DashboardWidgetsResponse(
        sources_count=sources_count or 0,
        active_sources_count=active_sources_count or 0,
        obligations_count=obligations_count or 0,
        resolved_obligations_count=resolved_obligations_count or 0,
    )
