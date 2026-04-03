"""create taskiq schema

Revision ID: a1b2c3d4e5f6
Revises: 61c646d81ba6
Create Date: 2025-11-18 20:00:00.000000

"""

from alembic import op

# revision identifiers, used by Alembic.
revision = "a1b2c3d4e5f6"
down_revision = "61c646d81ba6"
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Create taskiq schema for taskiq-related tables.

    This schema will contain:
    - taskiq.tasks: Task queue
    - taskiq.results: Task results
    - taskiq.schedules: Schedule state (last_run, next_run)

    Note: The taskiq components auto-create their tables on startup,
    so this migration only creates the schema.
    """
    op.execute("CREATE SCHEMA IF NOT EXISTS taskiq")


def downgrade() -> None:
    """Drop taskiq schema and all its tables."""
    op.execute("DROP SCHEMA IF EXISTS taskiq CASCADE")
