from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.db.pg.models.alerts import ObligationAlertType, RiskLevel
from app.db.pg.models.sources import ContentType


class LLMClassificationResponse(BaseModel):
    """Model for LLM classification response - used for JSON schema and validation."""

    is_regulatory: bool = Field(..., description="Whether the content contains regulatory obligations")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Classification confidence between 0.0 and 1.0")
    title: str | None = Field(None, description="Title of the content")
    categories: list[ContentType] = Field(..., description="List of applicable regulatory categories")


class LLMExtractedObligationAlert(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    obligation_type: ObligationAlertType = Field(..., description="Type of obligation")
    title: str = Field(..., description="Title of the alert")
    description: str = Field(..., description="Description/summary of the alert in plain English")
    category: ContentType = Field(..., description="Primary category")
    sub_category: ContentType | None = Field(None, description="Secondary sub-category")

    risk_level: RiskLevel | None = Field(None, description="Risk level")

    effective_date: datetime | None = Field(None, description="When the obligation becomes effective")
    deadline_date: datetime | None = Field(None, description="Compliance deadline")

    penalties: str | None = Field(None, description="Reference to penalties")
    requirements: str | None = Field(None, description="Specific requirements of the obligation")
    business_impact: str | None = Field(None, description="Business impact of the obligation")
    action_required: str | None = Field(None, description="Action required to comply with the obligation")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Extraction confidence between 0.0 and 1.0")

    @field_validator("effective_date", "deadline_date", mode="before")
    @classmethod
    def convert_empty_string_to_none(cls, v):
        """Convert empty strings to None for date fields."""
        if isinstance(v, str) and v.strip() == "":
            return None
        return v


class LLMExtractionObligationAlertResponse(BaseModel):
    """Model for LLM alert extraction response - used for JSON schema and validation."""

    no_obligations_found: bool = Field(..., description="Whether any obligations were found")
    obligations: list[LLMExtractedObligationAlert] = Field(..., description="List of extracted obligations")


class ContentTruncationInfo(BaseModel):
    """Information about content truncation."""

    was_truncated: bool = Field(..., description="Whether content was truncated")
    original_length: int = Field(..., ge=0, description="Original content length")
    truncated_length: int = Field(..., ge=0, description="Length after truncation")
    max_allowed_length: int = Field(..., ge=0, description="Maximum allowed content length")
