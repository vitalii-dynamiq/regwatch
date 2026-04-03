"""Configuration module for the regulatory crawler."""

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8"
    )

    jina_api_key: str = Field(validation_alias="JINA_API_KEY")
    together_api_key: str = Field(validation_alias="TOGETHER_API_KEY")
    database_url: str = Field(
        "postgresql+asyncpg://user:pass@localhost:5432/louis",
        validation_alias="DATABASE_URL",
    )
    max_concurrency: int = 8
    max_redirects: int = 5
    jina_endpoint: str = "https://r.jina.ai/"
    classification_model: str = "deepseek-ai/DeepSeek-R1"
    tracking_params: frozenset[str] | list[str] = frozenset(
        {
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_term",
            "utm_content",
            "fbclid",
            "gclid",
            "mc_cid",
            "mc_eid",
            "ref",
            "source",
            "btm_source",
        }
    )
    # Supabase specific settings (optional)
    supabase_url: str | None = Field(None, validation_alias="SUPABASE_URL")
    supabase_anon_key: str | None = Field(None, validation_alias="SUPABASE_ANON_KEY")
    supabase_service_role_key: str | None = Field(None, validation_alias="SUPABASE_SERVICE_ROLE_KEY")


# Global settings instance
settings = Settings()

# Regulatory categories for classification
CATEGORIES: list[str] = [
    "Banking & Finance",
    "AML / KYC",
    "Capital Adequacy",
    "Taxation",
    "Labour & Employment",
    "Data Protection & Privacy",
    "Consumer Protection",
    "Licensing / Registration",
    "Reporting & Disclosure",
    "Environmental",
    "Health & Safety",
]
