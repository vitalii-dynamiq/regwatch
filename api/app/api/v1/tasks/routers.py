"""Task management API endpoints."""

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, BackgroundTasks, Depends, status

from app.auth.depends import verify_admin_token
from app.core.exceptions import RespondWith404NotFound
from app.core.loggers import logger
from app.db.pg.base import DbSession
from app.services.sources import get_source_by_id_and_filters
from app.taskiq.tasks.crawler_tasks import process_regulatory_source_task

from .schemas import RunTaskRequest, RunTaskResponse, TaskStatus

router = APIRouter(prefix="/tasks", tags=["Admin"], dependencies=[Depends(verify_admin_token)])


@router.post("", response_model=RunTaskResponse, status_code=status.HTTP_202_ACCEPTED)
async def run_task(db: DbSession, request: RunTaskRequest, background_tasks: BackgroundTasks) -> RunTaskResponse:
    """Run a regulatory source crawl task."""
    source = await get_source_by_id_and_filters(db=db, source_id=request.regulatory_source_id)
    if not source:
        raise RespondWith404NotFound(message="Regulatory source not found")

    source_id = source.id
    source_name = source.name

    logger.info(
        f"Running crawl task in worker for source '{source_name}' (ID: {source_id}) "
        f"with max_pages={request.max_pages}, wait_for_result={request.wait_for_result}"
    )
    source.last_monitoring_scheduled_at = datetime.now(timezone.utc)
    await db.commit()
    task_id = str(uuid.uuid4())

    if request.wait_for_result:
        result_data = await process_regulatory_source_task(
            regulatory_source_id=source_id,
            max_pages=request.max_pages,
        )
        return RunTaskResponse(
            task_id=task_id,
            source_id=source_id,
            source_name=source_name,
            status=TaskStatus.COMPLETED,
            message=f"Crawl task completed for source '{source_name}'",
            result=(
                {
                    "session_id": result_data.session_id,
                    "status": result_data.status,
                    "total_processed": result_data.total_processed,
                    "total_regulatory": result_data.total_regulatory,
                    "total_obligations": result_data.total_obligations,
                    "processing_time_seconds": result_data.processing_time_seconds,
                    "error_message": result_data.error_message,
                }
                if result_data
                else None
            ),
        )
    else:
        background_tasks.add_task(process_regulatory_source_task, source_id, request.max_pages)
        return RunTaskResponse(
            task_id=task_id,
            source_id=source_id,
            source_name=source_name,
            status=TaskStatus.RUNNING,
            message=f"Crawl task queued for source '{source_name}'",
            result=None,
        )


@router.post("/worker", response_model=RunTaskResponse, status_code=status.HTTP_202_ACCEPTED)
async def run_task_in_worker(db: DbSession, request: RunTaskRequest) -> RunTaskResponse:
    """Queue a regulatory source crawl task to Taskiq workers."""
    source = await get_source_by_id_and_filters(db=db, source_id=request.regulatory_source_id)
    if not source:
        raise RespondWith404NotFound(message="Regulatory source not found")

    # Capture source attributes before commit to avoid lazy loading after session expiration
    source_id = str(source.id)
    source_name = source.name

    logger.info(
        f"Running crawl task in worker for source '{source_name}' (ID: {source_id}) "
        f"with max_pages={request.max_pages}, wait_for_result={request.wait_for_result}"
    )

    task = await process_regulatory_source_task.kiq(
        regulatory_source_id=source_id,
        max_pages=request.max_pages,
    )
    source.last_monitoring_scheduled_at = datetime.now(timezone.utc)
    await db.commit()

    if not request.wait_for_result:
        logger.info(f"Task {task.task_id} queued for source '{source_name}'")
        return RunTaskResponse(
            task_id=str(task.task_id),
            source_id=source_id,
            source_name=source_name,
            status=TaskStatus.RUNNING,
            message=f"Crawl task queued for source '{source_name}'",
            result=None,
        )

    logger.info(f"Waiting for task {task.task_id} to complete for source '{source_name}'")

    try:
        result = await task.wait_result()
        if result.is_err:
            logger.error(f"Task {task.task_id} failed for source '{source_name}': {result.error}")
            return RunTaskResponse(
                task_id=str(task.task_id),
                source_id=source_id,
                source_name=source_name,
                status=TaskStatus.FAILED,
                message=f"Task failed: {result.error}",
                result=None,
            )

        logger.info(f"Task {task.task_id} completed for source '{source_name}'")
        result_data = result.return_value

        return RunTaskResponse(
            task_id=str(task.task_id),
            source_id=source_id,
            source_name=source_name,
            status=TaskStatus.COMPLETED,
            message=f"Crawl task completed for source '{source_name}'",
            result=(
                {
                    "session_id": result_data.session_id,
                    "status": result_data.status,
                    "total_processed": result_data.total_processed,
                    "total_regulatory": result_data.total_regulatory,
                    "total_obligations": result_data.total_obligations,
                    "processing_time_seconds": result_data.processing_time_seconds,
                    "error_message": result_data.error_message,
                }
                if result_data
                else None
            ),
        )

    except Exception as e:
        logger.error(f"Error waiting for task {task.task_id} result: {e}")
        return RunTaskResponse(
            task_id=str(task.task_id),
            source_id=source_id,
            source_name=source_name,
            status="failed",
            message=f"Error retrieving task result: {str(e)}",
            result=None,
        )
