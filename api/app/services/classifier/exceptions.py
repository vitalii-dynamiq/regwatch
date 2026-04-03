"""Custom exceptions for the classifier service."""


class ClassifierError(Exception):
    """Base exception for classifier service errors."""

    def __init__(self, message: str, details: dict = None):
        super().__init__(message)
        self.message = message
        self.details = details or {}


class ClassificationError(ClassifierError):
    """Exception raised when content classification fails."""
    pass


class ObligationExtractionError(ClassifierError):
    """Exception raised when obligation extraction fails."""
    pass


class LLMConnectionError(ClassifierError):
    """Exception raised when LLM connection fails."""
    pass


class LLMResponseError(ClassifierError):
    """Exception raised when LLM response is invalid or unparseable."""
    pass


class ContentValidationError(ClassifierError):
    """Exception raised when input content validation fails."""
    pass


class JSONParsingError(ClassifierError):
    """Exception raised when JSON response parsing fails."""
    pass
