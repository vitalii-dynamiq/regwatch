from enum import StrEnum

from fastapi import status
from pydantic import BaseModel, ConfigDict


class ErrorCode(StrEnum):
    VALIDATION = "validation_error"
    EXECUTION = "execution_error"
    PROCESSING = "processing_error"
    NOT_FOUND = "not_found"
    UNAUTHORIZED = "auth_error"
    INTERNAL = "internal_error"


class ErrorResponseDetails(BaseModel):
    message: str | None = None

    model_config = ConfigDict(extra="allow")


class ErrorResponseError(BaseModel):
    status: int
    code: ErrorCode
    message: str | None = None
    details: ErrorResponseDetails | None = None


class ErrorResponse(BaseModel):
    error: ErrorResponseError


class RespondWithError(Exception):
    def __init__(
        self,
        *args,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        details: dict | None = None,
        code: ErrorCode = ErrorCode.INTERNAL,
        message: str = "Internal error"
    ):
        super().__init__(*args)
        self.status_code = status_code
        self.details = details
        self.code = code
        self.message = message


class RespondWith400ProcessingError(RespondWithError):
    def __init__(self, *args, details: dict):
        super().__init__(
            *args,
            status_code=status.HTTP_400_BAD_REQUEST,
            details=ErrorResponseDetails(**details).model_dump(),
            code=ErrorCode.PROCESSING,
            message="Processing error",
        )


class RespondWith400ExecutionError(RespondWithError):
    def __init__(self, *args, details: dict):
        super().__init__(
            *args,
            status_code=status.HTTP_400_BAD_REQUEST,
            details=ErrorResponseDetails(**details).model_dump(),
            code=ErrorCode.EXECUTION,
            message="Execution error",
        )


class RespondWith422ValidationError(RespondWithError):
    def __init__(self, *args, details: dict):
        super().__init__(
            *args,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            details=ErrorResponseDetails(**details).model_dump(),
            code=ErrorCode.VALIDATION,
            message="Validation error",
        )


class RespondWith500InternalError(RespondWithError):
    def __init__(self, *args, details: dict):
        super().__init__(
            *args,
            details=ErrorResponseDetails(**details).model_dump(),
        )


class RespondWith404NotFound(RespondWithError):
    def __init__(self, *args, details: dict | None = None, message: str = "Not found"):
        super().__init__(
            *args,
            status_code=status.HTTP_404_NOT_FOUND,
            details=ErrorResponseDetails(**details).model_dump() if details else None,
            code=ErrorCode.NOT_FOUND,
            message=message,
        )


class RespondWith401Unauthorized(RespondWithError):
    def __init__(self, *args, details: dict | None = None, message: str = "Unauthorized"):
        super().__init__(
            *args,
            status_code=status.HTTP_401_UNAUTHORIZED,
            details=ErrorResponseDetails(**details).model_dump() if details else None,
            code=ErrorCode.UNAUTHORIZED,
            message=message,
        )
