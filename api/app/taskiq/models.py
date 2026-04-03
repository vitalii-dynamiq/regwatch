"""Pydantic models for Taskiq task results and database operations."""

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field

from app.services.crawler.models import CrawlStatus


class CrawlTaskResult(BaseModel):
    """Result model for crawl tasks."""

    session_id: str = Field(..., description="Crawl session ID")
    status: CrawlStatus = Field(..., description="Crawl status")
    total_processed: int = Field(0, description="Total URLs processed")
    total_regulatory: int = Field(0, description="Total regulatory pages found")
    total_obligations: int = Field(0, description="Total obligations extracted")
    processing_time_seconds: float | None = Field(None, description="Processing time")
    error_message: str | None = Field(None, description="Error message if failed")


class ClassificationResult(BaseModel):
    """Result model for classification tasks."""

    is_regulatory: bool = Field(..., description="Whether content is regulatory")
    confidence: float = Field(..., description="Classification confidence")
    categories: list[str] = Field(default_factory=list, description="Regulatory categories")
    content_length: int = Field(..., description="Content length processed")
    error_message: str | None = Field(None, description="Error message if failed")


class ObligationExtractionResult(BaseModel):
    """Result model for obligation extraction tasks."""

    no_obligations_found: bool = Field(..., description="Whether any obligations were found")
    obligations_count: int = Field(0, description="Number of obligations extracted")
    obligations: list[dict[str, Any]] = Field(default_factory=list, description="Extracted obligations")
    content_length: int = Field(..., description="Content length processed")
    extracted_at: datetime = Field(default_factory=datetime.utcnow, description="Extraction time")
    error_message: str | None = Field(None, description="Error message if failed")


class CombinedClassificationResult(BaseModel):
    """Result model for combined classification and extraction tasks."""

    classification: ClassificationResult = Field(..., description="Classification results")
    extraction: ObligationExtractionResult | None = Field(None, description="Extraction results if regulatory")
