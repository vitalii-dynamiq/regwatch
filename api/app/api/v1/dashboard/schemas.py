from pydantic import BaseModel, Field


class DashboardWidgetsResponse(BaseModel):
    sources_count: int = Field(..., description="Total number of sources")
    active_sources_count: int = Field(..., description="Number of sources with monitoring enabled")
    obligations_count: int = Field(..., description="Total number of obligations")
    resolved_obligations_count: int = Field(..., description="Number of resolved obligations (not new or in-progress)")
