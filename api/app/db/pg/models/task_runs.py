"""Task runs database model for high-level business operations."""

from datetime import datetime
from enum import StrEnum
from typing import TYPE_CHECKING, Any
from uuid import UUID as UUIDType

from sqlalchemy import JSON, UUID, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.pg.models.base import CreatableBase, IdPkBase, UpdatableBase

if TYPE_CHECKING:
    from app.db.pg.models.organizations import Organization
    from app.db.pg.models.sources import Source


class TaskRunType(StrEnum):
    """Enum for high-level business task run types."""

    CRAWL_AND_CLASSIFY = "crawl_and_classify"
    PERIODIC_MONITORING = "periodic_monitoring"
    MANUAL_CRAWL = "manual_crawl"


class TaskStatus(StrEnum):
    """Enum for task execution statuses."""

    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class TaskRun(IdPkBase, CreatableBase, UpdatableBase):
    """Model for tracking task runs."""

    __tablename__ = "task_runs"

    # Relationships
    organization_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("organizations.id", ondelete="SET NULL"), index=True, nullable=True
    )
    source_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("regulatory_sources.id", ondelete="SET NULL"), index=True, nullable=True
    )

    # Task run metadata
    task_run_type: Mapped[str] = mapped_column(index=True)
    status: Mapped[TaskStatus] = mapped_column(index=True, default=TaskStatus.PENDING)

    # For individual task tracking (replaces TaskLog functionality)
    task_id: Mapped[str | None] = mapped_column(index=True, unique=True, nullable=True)
    task_name: Mapped[str | None] = mapped_column(index=True, nullable=True)

    # Timing
    started_at: Mapped[datetime | None] = mapped_column(index=True)
    completed_at: Mapped[datetime | None] = mapped_column(index=True)

    # Error handling
    error_message: Mapped[str | None] = mapped_column(Text)

    # Statistics (JSON structure with total_pages, total_obligations, total_alerts, skipped_pages)
    stats: Mapped[dict[str, Any] | None] = mapped_column(JSON, comment="Task run statistics and metrics")

    # Additional metadata for extensibility
    extra_metadata: Mapped[dict[str, Any] | None] = mapped_column(JSON, comment="Additional task run metadata")

    # Relationships
    organization: Mapped["Organization | None"] = relationship()
    source: Mapped["Source | None"] = relationship()

    @property
    def duration_seconds(self) -> float | None:
        """Calculate task run duration in seconds."""
        if self.completed_at and self.started_at:
            return (self.completed_at - self.started_at).total_seconds()
        return None

    @property
    def is_completed(self) -> bool:
        """Check if task run is completed (success or failure)."""
        return self.status in (TaskStatus.COMPLETED, TaskStatus.FAILED, TaskStatus.CANCELLED)

    @property
    def is_running(self) -> bool:
        """Check if task run is currently running."""
        return self.status == TaskStatus.RUNNING

    @property
    def total_pages(self) -> int:
        """Get total pages processed from stats."""
        return self.stats.get("total_pages", 0) if self.stats else 0

    @property
    def total_obligations(self) -> int:
        """Get total obligations found from stats."""
        return self.stats.get("total_obligations", 0) if self.stats else 0

    @property
    def total_alerts(self) -> int:
        """Get total alerts generated from stats."""
        return self.stats.get("total_alerts", 0) if self.stats else 0

    @property
    def skipped_pages(self) -> int:
        """Get total skipped pages from stats."""
        return self.stats.get("skipped_pages", 0) if self.stats else 0

    def update_stats(
        self,
        total_pages: int | None = None,
        total_obligation_alerts: int | None = None,
        total_alerts: int | None = None,
        skipped_pages: int | None = None,
        **additional_stats: Any,
    ) -> None:
        """Update task run statistics.

        Args:
            total_pages: Total pages processed
            total_obligation_alerts: Total obligation alert s found
            total_alerts: Total alerts generated
            skipped_pages: Total pages skipped
            **additional_stats: Additional statistics to store
        """
        if self.stats is None:
            self.stats = {}

        if total_pages is not None:
            self.stats["total_pages"] = total_pages
        if total_obligation_alerts is not None:
            self.stats["total_obligation_alerts"] = total_obligation_alerts
        if total_alerts is not None:
            self.stats["total_alerts"] = total_alerts
        if skipped_pages is not None:
            self.stats["skipped_pages"] = skipped_pages

        # Add any additional statistics
        for key, value in additional_stats.items():
            self.stats[key] = value

    def set_started(self) -> None:
        """Mark task run as started."""
        self.status = TaskStatus.RUNNING
        self.started_at = datetime.utcnow()

    def set_completed(self, error_message: str | None = None) -> None:
        """Mark task run as completed.

        Args:
            error_message: Error message if task failed
        """
        self.completed_at = datetime.utcnow()
        if error_message:
            self.status = TaskStatus.FAILED
            self.error_message = error_message
        else:
            self.status = TaskStatus.COMPLETED

    @classmethod
    def create_for_individual_task(
        cls,
        task_id: str,
        task_name: str,
        task_run_type: TaskRunType = TaskRunType.MANUAL_CRAWL,
        organization_id: UUIDType | None = None,
        source_id: UUIDType | None = None,
    ) -> "TaskRun":
        """Create a TaskRun for tracking an individual task (replaces TaskLog).

        Args:
            task_id: Unique task identifier from Taskiq
            task_name: Name of the task
            task_run_type: Type of task run
            organization_id: Associated organization
            source_id: Associated source

        Returns:
            New TaskRun instance
        """
        return cls(
            task_id=task_id,
            task_name=task_name,
            task_run_type=task_run_type,
            organization_id=organization_id,
            source_id=source_id,
            status=TaskStatus.PENDING,
        )

    @classmethod
    def create_for_business_operation(
        cls,
        task_run_type: TaskRunType,
        organization_id: UUIDType | None = None,
        source_id: UUIDType | None = None,
    ) -> "TaskRun":
        """Create a TaskRun for tracking a high-level business operation.

        Args:
            task_run_type: Type of business operation
            organization_id: Associated organization
            source_id: Associated source

        Returns:
            New TaskRun instance
        """
        return cls(
            task_run_type=task_run_type,
            organization_id=organization_id,
            source_id=source_id,
            status=TaskStatus.PENDING,
        )
