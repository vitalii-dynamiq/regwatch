import importlib
from pathlib import Path
from urllib.parse import unquote, urlparse

from furl import furl

import app
from app.core.loggers import logger


def replace_protocol(url: str, protocol: str) -> str:
    new_url = furl(url)
    new_url.scheme = protocol

    return unquote(str(new_url))


def autodiscover(root_path: Path, *path_parts: str) -> None:
    """
    Import all files with the given name from the app.
    Import all app/*/{path_part}.py and app/*/{path_part}/__init__.py
    """
    for path in root_path.glob("*/" + "/".join(path_parts) + "*"):
        module_path = (
            str(path).removeprefix(str(root_path.parent)).replace("/", ".").removeprefix(".").removesuffix(".py")
        )
        file_path = Path(module_path.replace(".", "/"))
        if not file_path.exists() and not file_path.with_suffix(".py").exists():
            continue

        importlib.import_module(module_path)
        logger.debug(f"Imported {module_path}")

    logger.info(
        "Autodiscovered %s.*.%s",
        root_path.name,
        ".".join(path_parts),
    )


def extract_domain_from_url(url: str) -> str:
    """Extract normalized domain from URL.

    Args:
        url: Input URL to extract domain from

    Returns:
        Normalized domain (lowercase, without www. prefix)

    Raises:
        ValueError: If URL is invalid or cannot be parsed
    """
    try:
        parsed = urlparse(url.strip())
        if not parsed.netloc:
            raise ValueError(f"Invalid URL format: {url}")

        domain = parsed.netloc.lower()
        # Remove www. prefix if present
        if domain.startswith("www."):
            domain = domain[4:]

        return domain
    except Exception as e:
        raise ValueError(f"Failed to extract domain from URL '{url}': {e}") from e


def build_base_url_from_url(url: str) -> str:
    """Build base URL from any URL (scheme://netloc format).

    Args:
        url: Input URL to normalize to base URL

    Returns:
        Base URL in scheme://netloc format (no trailing slash)

    Raises:
        ValueError: If URL is invalid or cannot be parsed
    """
    try:
        parsed = urlparse(url.strip())
        if not parsed.scheme or not parsed.netloc:
            raise ValueError(f"Invalid URL format: {url}")

        return f"{parsed.scheme}://{parsed.netloc}".rstrip("/")
    except Exception as e:
        raise ValueError(f"Failed to build base URL from '{url}': {e}") from e


def group_urls_by_domain(urls: list[str]) -> dict[str, str]:
    """Group URLs by their normalized domain.

    Args:
        urls: List of URLs to group by domain

    Returns:
        Dictionary mapping normalized domain to base URL.
        For each domain, the first encountered URL's base is used.

    Note:
        Invalid URLs are logged as errors and skipped.
    """
    domain_to_base: dict[str, str] = {}

    for url in urls:
        try:
            domain = extract_domain_from_url(url)
            base_url = build_base_url_from_url(url)
            # Use setdefault to prefer first seen base URL for each domain
            domain_to_base.setdefault(domain, base_url)
        except ValueError as e:
            logger.error(f"Failed to process URL '{url}': {e}")
            continue

    return domain_to_base


def discover_models() -> None:
    """
    Import all SQLAlchemy models from the app.
    Import all app/*/models.py and app/*/models/__init__.py
    """
    autodiscover(Path(app.__path__[0]), "db", "pg", "models")
