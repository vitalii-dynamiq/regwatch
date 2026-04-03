from uuid import UUID

from app.db.pg.base import DbSession
from app.db.pg.models.jurisdictions import Jurisdiction


async def get_jurisdictions_by_organization(db: DbSession, organization_id: UUID) -> list[Jurisdiction]:
    query = Jurisdiction.get_query().where(Jurisdiction.organization_id == organization_id)
    jurisdictions = await db.scalars(query)
    return list(jurisdictions)
