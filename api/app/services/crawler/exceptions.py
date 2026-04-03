"""Custom exceptions for the crawler service."""


class CrawlerError(Exception):
    """Base exception for crawler service errors."""

    def __init__(self, message: str, details: dict = None):
        super().__init__(message)
        self.message = message
        self.details = details or {}


class ContentFetchError(CrawlerError):
    """Exception raised when content fetching fails."""

    pass


class ContentExtractionError(CrawlerError):
    """Exception raised when content extraction fails."""

    pass


class URLResolutionError(CrawlerError):
    """Exception raised when URL resolution fails."""

    pass


class DatabasePersistenceError(CrawlerError):
    """Exception raised when database persistence fails."""

    pass


class CrawlerInitializationError(CrawlerError):
    """Exception raised when crawler initialization fails."""

    pass


class CrawlerConfigurationError(CrawlerError):
    """Exception raised when crawler configuration is invalid."""

    pass
