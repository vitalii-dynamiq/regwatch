from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.organizations.schemas import CreateOrganizationRequest
from app.db.pg.base import create_entity
from app.db.pg.models.jurisdictions import JURISDICTIONS, Jurisdiction
from app.db.pg.models.organizations import Organization


async def create_organization(db: AsyncSession, payload: CreateOrganizationRequest) -> Organization:
    """Create a new organization with specified jurisdictions or all jurisdictions if none specified."""
    organization = await create_entity(
        db=db,
        entity_class=Organization,
        payload=payload,
        payload_exclude_values={"jurisdictions"},
        commit=False,
    )

    jurisdiction_codes = payload.jurisdictions if payload.jurisdictions is not None else list(JURISDICTIONS)

    jurisdiction_entities = []
    for code in jurisdiction_codes:
        jurisdiction_data = JURISDICTIONS[code]
        jurisdiction = Jurisdiction(
            organization_id=organization.id,
            code=code,
            name=jurisdiction_data["name"],
            description=jurisdiction_data["description"],
        )
        jurisdiction_entities.append(jurisdiction)

    db.add_all(jurisdiction_entities)
    await db.flush()

    return organization


async def get_organization_by_email_domain(db: AsyncSession, email: str) -> Organization | None:
    """Find organization by email domain."""
    if "@" not in email:
        return None

    domain = email.split("@")[1].lower()

    query = Organization.get_query().where(Organization.domains.any(domain))
    result = await db.execute(query)
    return result.scalar_one_or_none()
