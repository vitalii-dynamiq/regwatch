from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field


class TaskStatus(StrEnum):
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class RunTaskRequest(BaseModel):
    regulatory_source_id: UUID
    max_pages: int | None = Field(None, description="Maximum number of pages to crawl")
    wait_for_result: bool = Field(True, description="Whether to wait for task completion before responding")


class RunTaskResponse(BaseModel):
    """Response model for worker task submission."""

    task_id: str = Field(..., description="Taskiq task identifier")
    source_id: str = Field(..., description="Regulatory source ID")
    source_name: str = Field(..., description="Regulatory source name")
    status: str = Field(..., description="Task status (queued, completed, or failed)")
    message: str = Field(..., description="Status message")
    result: dict | None = Field(None, description="Task result if wait_for_result=True")
