"""
Script to set up a new organization with jurisdictions and regulatory sources.

This script provides functions to:
- Create a new organization with all jurisdictions automatically
- Add regulatory sources with proper content type mapping

Usage:
    python scripts/setup_organization.py

Or import functions for programmatic use:
    from scripts.setup_organization import setup_organization_complete, add_regulatory_source
"""

import asyncio
import sys
from pathlib import Path
from typing import Any
from uuid import UUID

from pydantic import BaseModel, Field, HttpUrl
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.organizations.schemas import CreateOrganizationRequest
from app.api.v1.sources.schemas import CreateSourceRequest
from app.services.organizations import create_organization

# Add the project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from app.core.loggers import logger  # noqa: E402
from app.core.utils import discover_models  # noqa: E402
from app.db.pg.base import SessionLocal, create_entity  # noqa: E402
from app.db.pg.models.jurisdictions import Jurisdiction, JurisdictionCode  # noqa: E402
from app.db.pg.models.organizations import Organization  # noqa: E402
from app.db.pg.models.sources import ContentType, MonitoringFrequency, Source  # noqa: E402

# Discover all models to ensure SQLAlchemy relationships are properly configured
discover_models()


class SourceSetupData(BaseModel):
    """Pydantic model for regulatory source setup data with jurisdiction mapping."""

    id: UUID | None = Field(None, description="Optional UUID for the regulatory source")
    name: str = Field(..., description="Name of the regulatory source")
    base_url: HttpUrl = Field(..., description="Base URL of the regulatory source")
    description: str | None = Field(None, description="Optional description")
    jurisdiction_code: JurisdictionCode | None = Field(None, description="Code of the jurisdiction to link to")
    content_types: list[ContentType] | None = Field(None, description="List of content types")
    monitoring_enabled: bool = Field(True, description="Whether monitoring is enabled")
    monitoring_frequency: MonitoringFrequency = Field(
        default=MonitoringFrequency.DAILY, description="Monitoring frequency"
    )


class OrganizationSetupData(BaseModel):
    """Pydantic model for complete organization setup data."""

    id: UUID | None = Field(None, description="Optional UUID for the organization")
    name: str = Field(..., description="Name of the organization")
    description: str | None = Field(None, description="Optional description")
    domains: list[str] = Field(default_factory=list, description="List of organization domains")
    regulatory_sources: list[SourceSetupData] = Field(default_factory=list, description="Regulatory sources to create")


async def ensure_jurisdictions_for_all_organizations(min_jurisdictions: int = 5) -> dict[str, Any]:
    """Ensure all organizations have at least the minimum number of jurisdictions."""
    async with SessionLocal() as db:
        try:
            from sqlalchemy import func, select

            # Get all organizations with their jurisdiction counts
            stmt = (
                select(Organization.id, Organization.name, func.count(Jurisdiction.id).label("jurisdiction_count"))
                .outerjoin(Jurisdiction, Organization.id == Jurisdiction.organization_id)
                .group_by(Organization.id, Organization.name)
            )

            result = await db.execute(stmt)
            organizations_data = result.all()

            updated_organizations = []
            total_jurisdictions_created = 0

            for org_id, org_name, jurisdiction_count in organizations_data:
                if jurisdiction_count < min_jurisdictions:
                    logger.info(
                        f"Organization '{org_name}' ({org_id}) has only {jurisdiction_count} jurisdictions, "
                        f"creating all standard jurisdictions"
                    )

                    # Create all jurisdictions for this organization
                    jurisdictions_created = await _create_jurisdictions_for_organization(db, org_id, min_jurisdictions)
                    total_jurisdictions_created += len(jurisdictions_created)

                    updated_organizations.append(
                        {
                            "id": str(org_id),
                            "name": org_name,
                            "jurisdictions_before": jurisdiction_count,
                            "jurisdictions_created": len(jurisdictions_created),
                        }
                    )
                else:
                    logger.info(
                        f"Organization '{org_name}' ({org_id}) already has {jurisdiction_count} jurisdictions "
                        f"(≥{min_jurisdictions})"
                    )

            if updated_organizations:
                await db.commit()
                logger.info(
                    f"Updated {len(updated_organizations)} organizations, "
                    f"created {total_jurisdictions_created} jurisdictions total"
                )
            else:
                logger.info(f"All organizations already have at least {min_jurisdictions} jurisdictions")

            return {
                "updated_organizations": updated_organizations,
                "total_jurisdictions_created": total_jurisdictions_created,
                "min_jurisdictions_required": min_jurisdictions,
            }

        except Exception as e:
            logger.error(f"Failed to ensure jurisdictions for organizations: {e}")
            await db.rollback()
            raise


async def ensure_organization_exists(organization_id: UUID) -> dict[str, Any]:
    """Ensure an organization exists with all jurisdictions. Create if missing.

    Args:
        organization_id: UUID of the organization to check/create

    Returns:
        Dictionary with organization and jurisdictions info
    """
    async with SessionLocal() as db:
        try:
            from sqlalchemy import select

            # Check if organization exists
            organization = await db.scalar(select(Organization).where(Organization.id == organization_id))

            if not organization:
                # Create the default organization (Dynamiq example)
                setup_data = get_example_setup_data()
                if setup_data.id == organization_id:
                    logger.info(f"Creating missing organization with ID {organization_id}")
                    return await setup_organization_complete(setup_data)
                else:
                    raise ValueError(f"Organization {organization_id} not found and no default setup available")

            # Organization exists, ensure it has jurisdictions
            jurisdictions_result = await db.execute(
                select(Jurisdiction).where(Jurisdiction.organization_id == organization_id)
            )
            jurisdictions = list(jurisdictions_result.scalars().all())

            if not jurisdictions:
                logger.info(f"Adding missing jurisdictions to organization {organization_id}")
                jurisdictions_created = await _create_jurisdictions_for_organization(db, organization_id)
                await db.commit()
                logger.info(f"Added {len(jurisdictions_created)} jurisdictions to organization {organization_id}")

                # Re-fetch jurisdictions
                jurisdictions_result = await db.execute(
                    select(Jurisdiction).where(Jurisdiction.organization_id == organization_id)
                )
                jurisdictions = list(jurisdictions_result.scalars().all())

            return {
                "organization": {
                    "id": str(organization.id),
                    "name": organization.name,
                    "description": organization.description,
                },
                "jurisdictions": [
                    {
                        "id": str(j.id),
                        "name": j.name,
                        "code": j.code,
                    }
                    for j in jurisdictions
                ],
            }

        except Exception as e:
            logger.error(f"Failed to ensure organization exists: {e}")
            raise


async def _create_jurisdictions_for_organization(
    db: AsyncSession, organization_id: UUID, min_jurisdictions: int = 5
) -> list[Jurisdiction]:
    """Create all standard jurisdictions for an organization. Ensures at least min_jurisdictions are created."""
    from app.db.pg.models.jurisdictions import JURISDICTIONS

    jurisdiction_entities = []
    for code, jurisdiction_data in JURISDICTIONS.items():
        jurisdiction = Jurisdiction(
            organization_id=organization_id,
            code=code,
            name=jurisdiction_data["name"],
            description=jurisdiction_data["description"],
        )
        jurisdiction_entities.append(jurisdiction)

    db.add_all(jurisdiction_entities)

    # Log with jurisdiction count verification
    jurisdiction_count = len(jurisdiction_entities)
    if jurisdiction_count < min_jurisdictions:
        logger.warning(f"Only {jurisdiction_count} jurisdictions available, but {min_jurisdictions} required")
    else:
        logger.info(
            f"Created {jurisdiction_count} jurisdictions for organization {organization_id} "
            f"(minimum {min_jurisdictions} required)"
        )

    return jurisdiction_entities


async def add_regulatory_source(db: AsyncSession, organization_id: UUID, source_data: SourceSetupData) -> Source:
    """Add a regulatory source for an organization.

    Args:
        db: Database session
        organization_id: UUID of the organization
        source_data: Regulatory source setup data

    Returns:
        Created Source instance
    """
    logger.info(f"Creating regulatory source: {source_data.name}")

    # Find jurisdiction ID if jurisdiction_code is provided
    jurisdiction_id = None
    if source_data.jurisdiction_code:
        from sqlalchemy import select

        jurisdiction = await db.scalar(
            select(Jurisdiction).where(
                Jurisdiction.organization_id == organization_id,
                Jurisdiction.code == source_data.jurisdiction_code.value,
            )
        )
        if jurisdiction:
            jurisdiction_id = jurisdiction.id
        else:
            logger.warning(f"Jurisdiction '{source_data.jurisdiction_code}' not found for organization")

    # Create source request payload
    content_types_list = None
    if source_data.content_types:
        content_types_list = [ct.value for ct in source_data.content_types]

    source_request = CreateSourceRequest(
        name=source_data.name,
        base_url=source_data.base_url,  # HttpUrl type matching schema
        description=source_data.description,
        jurisdiction_id=jurisdiction_id,
        content_types=content_types_list,
        monitoring_enabled=source_data.monitoring_enabled,
        monitoring_frequency=source_data.monitoring_frequency,  # Keep as enum as expected by schema
    )

    extra_values = {
        "organization_id": organization_id,
        "base_url": str(source_data.base_url),  # Ensure database gets string, not HttpUrl object
        "monitoring_frequency": source_data.monitoring_frequency.value,  # Ensure database gets string, not enum object
    }

    # Use hardcoded UUID if provided
    if source_data.id:
        extra_values["id"] = source_data.id

    regulatory_source = await create_entity(
        db=db,
        entity_class=Source,
        payload=source_request,
        extra_values=extra_values,
    )

    logger.info(f"Created regulatory source with ID: {regulatory_source.id}")
    return regulatory_source


async def setup_organization_complete(setup_data: OrganizationSetupData) -> dict[str, Any]:
    """Set up a complete organization with jurisdictions and regulatory sources.

    Args:
        setup_data: Complete organization setup data

    Returns:
        Dictionary containing created entities and their IDs
    """
    async with SessionLocal() as db:
        try:
            # Check if organization already exists (for hardcoded UUIDs)
            if setup_data.id:
                from sqlalchemy import select

                existing_org = await db.scalar(select(Organization).where(Organization.id == setup_data.id))

                if existing_org:
                    logger.info(f"Organization with ID {setup_data.id} already exists, using existing one")
                    organization = existing_org
                else:
                    # Create organization with hardcoded UUID
                    organization = await create_entity(
                        db=db,
                        entity_class=Organization,
                        payload=CreateOrganizationRequest(
                            name=setup_data.name,
                            description=setup_data.description,
                            domains=setup_data.domains,
                        ),
                        payload_exclude_values={"jurisdictions"},
                        extra_values={"id": setup_data.id},
                        commit=True,  # Commit organization first
                    )

                    # Manually create jurisdictions (since we bypassed create_organization service)
                    jurisdictions_created = await _create_jurisdictions_for_organization(db, organization.id)
                    await db.commit()  # Commit jurisdictions
                    logger.info(
                        f"Created organization with ID {setup_data.id} and {len(jurisdictions_created)} jurisdictions"
                    )
            else:
                # Use existing service for auto-generated UUID (this creates jurisdictions automatically)
                organization = await create_organization(
                    db=db,
                    payload=CreateOrganizationRequest(
                        name=setup_data.name,
                        description=setup_data.description,
                        domains=setup_data.domains,
                    ),
                )
                await db.commit()

            # Ensure jurisdictions exist for the organization
            from sqlalchemy import select

            jurisdictions_result = await db.execute(
                select(Jurisdiction).where(Jurisdiction.organization_id == organization.id)
            )
            jurisdictions = list(jurisdictions_result.scalars().all())

            # If no jurisdictions exist, create them
            if not jurisdictions:
                logger.info(f"No jurisdictions found for organization {organization.id}, creating them")
                jurisdictions_created = await _create_jurisdictions_for_organization(db, organization.id)
                await db.commit()
                logger.info(f"Created {len(jurisdictions_created)} jurisdictions for organization {organization.id}")

                # Re-fetch jurisdictions
                jurisdictions_result = await db.execute(
                    select(Jurisdiction).where(Jurisdiction.organization_id == organization.id)
                )
                jurisdictions = list(jurisdictions_result.scalars().all())

            # Create regulatory sources
            regulatory_sources = []
            for source_data in setup_data.regulatory_sources:
                source = await add_regulatory_source(
                    db=db,
                    organization_id=organization.id,
                    source_data=source_data,
                )
                regulatory_sources.append(source)

            result = {
                "organization": {
                    "id": str(organization.id),
                    "name": organization.name,
                    "description": organization.description,
                    "domains": organization.domains,
                },
                "jurisdictions": [
                    {
                        "id": str(j.id),
                        "name": j.name,
                        "code": j.code,
                        "description": j.description,
                    }
                    for j in jurisdictions
                ],
                "regulatory_sources": [
                    {
                        "id": str(rs.id),
                        "name": rs.name,
                        "base_url": rs.base_url,
                        "description": rs.description,
                        "content_types": rs.content_types,
                        "monitoring_enabled": rs.monitoring_enabled,
                        "monitoring_frequency": rs.monitoring_frequency,
                    }
                    for rs in regulatory_sources
                ],
            }

            logger.info("Organization setup completed successfully")
            return result

        except Exception as e:
            logger.error(f"Failed to set up organization: {e}")
            await db.rollback()
            raise


def get_example_setup_data() -> OrganizationSetupData:
    """Get example organization setup data for Dynamiq with hardcoded UUIDs."""
    return OrganizationSetupData(
        id=UUID("12345678-1234-5678-9abc-123456789000"),  # Hardcoded organization UUID
        name="Dynamiq",
        description="Advanced AI platform focused on regulatory compliance and enterprise solutions",
        domains=["getdynamiq.ai", "otakoyi.com"],
        regulatory_sources=[
            SourceSetupData(
                id=UUID("12345678-1234-5678-9abc-123456789001"),  # US FTC UUID
                name="US FTC - AI Guidance",
                base_url="https://www.ftc.gov",
                description="Federal Trade Commission AI and algorithmic accountability guidance",
                jurisdiction_code=JurisdictionCode.US,
                content_types=[ContentType.CONDUCT_CUSTOMER_PROTECTION, ContentType.DATA_PRIVACY_CYBERSECURITY],
                monitoring_enabled=True,
                monitoring_frequency=MonitoringFrequency.DAILY,
            ),
            SourceSetupData(
                id=UUID("12345678-1234-5678-9abc-123456789002"),  # EU AI Act UUID
                name="EU AI Act Implementation",
                base_url="https://digital-strategy.ec.europa.eu",
                description="European Union AI Act implementation guidelines and updates",
                jurisdiction_code=JurisdictionCode.EU,
                content_types=[ContentType.DATA_PRIVACY_CYBERSECURITY, ContentType.CONDUCT_CUSTOMER_PROTECTION],
                monitoring_enabled=True,
                monitoring_frequency=MonitoringFrequency.DAILY,
            ),
            SourceSetupData(
                id=UUID("12345678-1234-5678-9abc-123456789003"),  # UK ICO UUID
                name="UK ICO - AI and Data Protection",
                base_url="https://ico.org.uk",
                description="UK Information Commissioner's Office guidance on AI and data protection",
                jurisdiction_code=JurisdictionCode.UK,
                content_types=[ContentType.DATA_PRIVACY_CYBERSECURITY, ContentType.CONDUCT_CUSTOMER_PROTECTION],
                monitoring_enabled=True,
                monitoring_frequency=MonitoringFrequency.EVERY_8_HOURS,
            ),
            SourceSetupData(
                id=UUID("12345678-1234-5678-9abc-123456789004"),  # NIST UUID
                name="NIST AI Risk Management",
                base_url="https://www.nist.gov",
                description="US National Institute of Standards and Technology AI risk management framework",
                jurisdiction_code=JurisdictionCode.US,
                content_types=[ContentType.CONDUCT_CUSTOMER_PROTECTION, ContentType.CORPORATE_GOVERNANCE_REPORTING],
                monitoring_enabled=True,
                monitoring_frequency=MonitoringFrequency.WEEKLY,
            ),
            SourceSetupData(
                id=UUID("12345678-1234-5678-9abc-123456789005"),  # GDPR UUID
                name="GDPR Compliance Center",
                base_url="https://gdpr.eu",
                description="GDPR compliance requirements and updates relevant to AI systems",
                jurisdiction_code=JurisdictionCode.EU,
                content_types=[ContentType.DATA_PRIVACY_CYBERSECURITY, ContentType.CONDUCT_CUSTOMER_PROTECTION],
                monitoring_enabled=True,
                monitoring_frequency=MonitoringFrequency.EVERY_8_HOURS,
            ),
            SourceSetupData(
                id=UUID("12345678-1234-5678-9abc-123456789006"),  # UK FCA UUID
                name="Apple Regulation",
                base_url="https://regulatoryinfo.apple.com",
                description="Apple regulation",
                jurisdiction_code=JurisdictionCode.US,
                content_types=[ContentType.ESG_SUSTAINABILITY, ContentType.DATA_PRIVACY_CYBERSECURITY],
                monitoring_enabled=True,
                monitoring_frequency=MonitoringFrequency.EVERY_8_HOURS,
            ),
        ],
    )


async def main() -> None:
    """Main function to run the organization setup script."""
    logger.info("Starting organization setup script")

    try:
        print("\n🚀 Organization Setup Script")
        print("1. Create new organization with example data (Dynamiq)")
        print("2. Ensure all existing organizations have at least 5 jurisdictions")
        print("3. Exit")

        choice = input("\nSelect an option (1-3): ").strip()

        if choice == "1":
            await _create_example_organization()
        elif choice == "2":
            await _ensure_all_organizations_have_jurisdictions()
        elif choice == "3":
            print("👋 Goodbye!")
            return
        else:
            print("❌ Invalid choice")
            sys.exit(1)

    except Exception as e:
        logger.error(f"Setup failed: {e}")
        print(f"\n❌ Setup failed: {e}")
        sys.exit(1)


async def _create_example_organization() -> None:
    """Create the example Dynamiq organization."""
    # Get example setup data
    setup_data = get_example_setup_data()

    # Display what will be created
    print(f"\n📋 Setting up organization: {setup_data.name}")
    if setup_data.id:
        print(f"🆔 Organization UUID: {setup_data.id}")
        print(f"📝 Description: {setup_data.description}")
        print(f"🌐 Domains: {setup_data.domains}")
    print("🏛️  Jurisdictions: All predefined jurisdictions will be created automatically (14 total)")
    print(f"🔍 Regulatory sources to create: {len(setup_data.regulatory_sources)}")
    for rs in setup_data.regulatory_sources:
        print(f"   - {rs.name} ({rs.base_url})")
        if rs.id:
            print(f"     UUID: {rs.id}")
        print(f"     Jurisdiction: {rs.jurisdiction_code.value if rs.jurisdiction_code else 'None'}")
        if rs.content_types:
            content_type_data = ContentType.get_content_type_data()
            content_type_names = [content_type_data[ct].name for ct in rs.content_types]
            print(f"     Content types: {content_type_names}")
        else:
            print("     Content types: []")
        print(f"     Monitoring: {rs.monitoring_frequency.value} (enabled: {rs.monitoring_enabled})")

    # Confirm before proceeding
    response = input("\n❓ Proceed with setup? (y/N): ").strip().lower()
    if response != "y":
        print("❌ Setup cancelled")
        return

    # Execute setup
    result = await setup_organization_complete(setup_data)

    # Display results
    print("\n✅ Organization setup completed successfully!")
    print(f"🏢 Organization ID: {result['organization']['id']}")
    print(f"🏛️  Created {len(result['jurisdictions'])} jurisdictions")
    print(f"🔍 Created {len(result['regulatory_sources'])} regulatory sources")

    print("\n📊 Summary:")
    print(f"   Organization: {result['organization']['name']}")
    for jurisdiction in result["jurisdictions"]:
        print(f"   Jurisdiction: {jurisdiction['name']} ({jurisdiction['code']}) - {jurisdiction['id']}")
    for source in result["regulatory_sources"]:
        print(f"   Source: {source['name']} - {source['id']}")


async def _ensure_all_organizations_have_jurisdictions() -> None:
    """Ensure all organizations have at least 5 jurisdictions."""
    print("\n🏛️  Checking all organizations for jurisdiction requirements...")

    min_jurisdictions = 5
    print(f"📋 Requirement: Each organization must have at least {min_jurisdictions} jurisdictions")
    print("📊 Available jurisdictions: 14 (US, EU, CA, UK, DE, AE, CH, FR, IT, ES, NL, BE, SE, JP)")

    # Confirm before proceeding
    response = (
        input(f"\n❓ Ensure all organizations have at least {min_jurisdictions} jurisdictions? (y/N): ").strip().lower()
    )
    if response != "y":
        print("❌ Operation cancelled")
        return

    # Execute jurisdiction creation
    result = await ensure_jurisdictions_for_all_organizations(min_jurisdictions)

    # Display results
    if result["updated_organizations"]:
        print(f"\n✅ Updated {len(result['updated_organizations'])} organizations")
        print(f"🏛️  Created {result['total_jurisdictions_created']} jurisdictions total")

        for org in result["updated_organizations"]:
            print(f"   Organization: {org['name']} ({org['id']})")
            print(f"     Before: {org['jurisdictions_before']} jurisdictions")
            print(f"     Created: {org['jurisdictions_created']} jurisdictions")
    else:
        print(f"\n✅ All organizations already have at least {min_jurisdictions} jurisdictions")
        print("🎉 No action needed!")


if __name__ == "__main__":
    # Run the main setup function
    asyncio.run(main())
