from datetime import datetime, timezone
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.db.pg.models.sources import ContentType
from app.services.classifier.models import LLMExtractedObligationAlert


class DocumentExtraction(BaseModel):
    """Model representing extracted document content."""

    model_config = ConfigDict(validate_assignment=True)

    url: str = Field(..., description="Document URL")
    title: str | None = Field(None, description="Document title")
    content: str = Field(..., description="Extracted text content")
    markdown: str = Field(..., description="Content in markdown format")
    links: list[str] = Field(default_factory=list, description="Extracted links")
    fingerprint: str = Field(..., description="Content fingerprint for change detection")
    status_code: int = Field(..., description="HTTP status code")
    content_length: int = Field(..., description="Content length in bytes")
    extracted_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="When content was extracted",
    )


class CrawlResult(BaseModel):
    """Model representing a single crawl result."""

    model_config = ConfigDict(validate_assignment=True)

    url: str = Field(..., description="Crawled URL")
    title: str | None = Field(None, description="Title of the content")
    success: bool = Field(..., description="Whether crawl was successful")
    status_code: int | None = Field(None, description="HTTP status code")
    content_length: int | None = Field(None, description="Content length")
    is_regulatory: bool | None = Field(None, description="Whether content is regulatory")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Classification confidence between 0.0 and 1.0")
    categories: list[ContentType] = Field(default_factory=list, description="Regulatory categories/content types")
    obligations_alerts_count: int | None = Field(None, description="Number of obligations alerts found")
    obligation_alerts: list[LLMExtractedObligationAlert] | None = Field(
        None, description="Extracted obligation alerts for the page"
    )
    fingerprint: str | None = Field(None, description="Content fingerprint for change detection")
    error_message: str | None = Field(None, description="Error message if crawl failed")
    processed_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="When URL was processed",
    )


class CrawlProgress(BaseModel):
    """Model representing crawl progress and statistics."""

    model_config = ConfigDict(validate_assignment=True)

    total_discovered: int = Field(..., description="Total URLs discovered")
    total_processed: int = Field(..., description="Total URLs processed")
    total_regulatory: int = Field(..., description="Total regulatory pages found")
    total_obligation_alerts: int = Field(..., description="Total obligation alerts extracted")
    active_tasks: int = Field(..., description="Current active crawler tasks")
    queue_size: int = Field(..., description="URLs remaining in queue")
    started_at: datetime = Field(..., description="When crawl started")
    last_updated: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="Last progress update",
    )
    processing_time: float | None = Field(None, description="Total processing time in seconds")


class CrawlStatus(StrEnum):
    """Enum for crawl session statuses."""

    INITIALIZING = "initializing"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    STOPPED = "stopped"


class CrawlSession(BaseModel):
    """Model representing a crawl session."""

    model_config = ConfigDict(validate_assignment=True)

    session_id: str = Field(..., description="Unique session identifier")
    base_url: str = Field(..., description="Base URL for this session")
    allowed_domains: list[str] = Field(..., description="Allowed domains")
    content_types: list[ContentType] = Field(..., description="Source content types")
    status: CrawlStatus = Field(..., description="Session status (running, completed, failed, stopped)")
    max_pages: int | None = Field(None, description="Maximum number of pages to process in this session")
    progress: CrawlProgress = Field(..., description="Current progress")
    results: list[CrawlResult] = Field(default_factory=list, description="Crawl results")
    error_message: str | None = Field(None, description="Error message if session failed")
    regulatory_source_id: UUID | None = Field(None, description="ID of the regulatory source being crawled")
    organization_id: UUID | None = Field(None, description="ID of the organization owning the source")
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="When session was created",
    )
    completed_at: datetime | None = Field(None, description="When session completed")
