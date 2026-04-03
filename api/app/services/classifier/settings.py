"""Configuration for the classifier service."""

from pydantic import BaseModel

from app.core.settings import settings


class ClassifierConfig(BaseModel):
    """Classifier service configuration."""

    api_key: str
    model: str
    max_content_chars: int
    max_tokens: int
    temperature: float
    extraction_temperature: float

    @classmethod
    def from_settings(cls) -> "ClassifierConfig":
        """Build configuration from application settings."""
        return cls(
            api_key=settings.TOGETHER_API_KEY,
            model=settings.CLASSIFIER_MODEL,
            max_content_chars=settings.CLASSIFIER_MAX_CONTENT_CHARS,
            max_tokens=settings.CLASSIFIER_MAX_TOKENS,
            temperature=settings.CLASSIFIER_TEMPERATURE,
            extraction_temperature=settings.CLASSIFIER_EXTRACTION_TEMPERATURE,
        )
