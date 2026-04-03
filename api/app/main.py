from contextlib import asynccontextmanager
from typing import Callable

import sentry_sdk
from fastapi import APIRouter, FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import ORJSONResponse
from fastapi_pagination import add_pagination
from pydantic import ValidationError

from app.api.v1.alerts.routers import router as alerts_router
from app.api.v1.dashboard.routers import router as dashboard_router
from app.api.v1.obligations.routers import router as obligations_router
from app.api.v1.organizations.routers import router as organizations_router
from app.api.v1.sources.routers import router as sources_router
from app.api.v1.tasks.routers import router as tasks_router
from app.api.v1.users.routers import router as users_router
from app.app_ctx import AppCtx
from app.core.exceptions import ErrorCode, ErrorResponse, ErrorResponseDetails, ErrorResponseError, RespondWithError
from app.core.loggers import logger
from app.core.settings import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await AppCtx.startup()
    yield
    await AppCtx.shutdown()


app = FastAPI(
    title="regwatch",
    version=settings.VERSION,
    debug=settings.DEBUG,
    lifespan=lifespan,
    default_response_class=ORJSONResponse,
    responses={
        status.HTTP_400_BAD_REQUEST: {"description": "Processing error", "model": ErrorResponse},
        status.HTTP_404_NOT_FOUND: {"description": "Not found", "model": ErrorResponse},
        status.HTTP_422_UNPROCESSABLE_ENTITY: {"description": "Validation error", "model": ErrorResponse},
    },
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

v1_router = APIRouter(prefix="/v1")
v1_router.include_router(organizations_router)
v1_router.include_router(sources_router)
v1_router.include_router(alerts_router)
v1_router.include_router(obligations_router)
v1_router.include_router(tasks_router)
v1_router.include_router(users_router)
v1_router.include_router(dashboard_router)
app.include_router(v1_router)

add_pagination(app)


@app.exception_handler(RequestValidationError)
@app.exception_handler(ValidationError)
async def validation_error_exc_handler(
    request: Request, exc: ValidationError | RequestValidationError
) -> ORJSONResponse:
    return ORJSONResponse(
        status_code=422,
        content=ErrorResponse(
            error=ErrorResponseError(
                status=422,
                code=ErrorCode.VALIDATION,
                message="Validation error",
                details=ErrorResponseDetails(errors=jsonable_encoder(exc.errors())),
            )
        ).model_dump(),
    )


@app.exception_handler(RespondWithError)
async def respond_with_error_exc_handler(request: Request, ex: RespondWithError) -> ORJSONResponse:
    return ORJSONResponse(
        status_code=ex.status_code,
        content=ErrorResponse(
            error=ErrorResponseError(
                status=ex.status_code,
                code=ex.code,
                message=ex.message,
                details=ex.details or ErrorResponseDetails(),
            )
        ).model_dump(),
    )


@app.exception_handler(Exception)
async def unexpected_exc_handler(request: Request, exc: Exception) -> ORJSONResponse:
    logger.exception(f"Unhandled exception: {exc!r}")
    return ORJSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(
            error=ErrorResponseError(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                code=ErrorCode.INTERNAL,
                message="Internal error",
                details=ErrorResponseDetails(),
            )
        ).model_dump(),
    )


@app.middleware("http")
async def request_ctx_middleware(request: Request, call_next: Callable) -> Response:
    AppCtx.set_request_ctx(request.headers)
    sentry_sdk.set_context(
        "Request",
        {
            "request_id": AppCtx.request_id,
            "method": request.method,
            "url": str(request.url),
            "headers": dict(request.headers),
            "client": request.client.host if request.client else None,
        },
    )
    sentry_sdk.set_context("Metadata", AppCtx.get_request_ctx())

    response = await call_next(request)

    AppCtx.clear_request_ctx()

    return response


@app.get(path="/health", include_in_schema=False)
def health():
    return {"status": "ok"}
