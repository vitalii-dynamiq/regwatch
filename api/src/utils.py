"""Utility functions for the regulatory crawler."""

import hashlib
import re
from urllib.parse import (
    parse_qsl,
    urlencode,
    urljoin,
    urlparse,
    urlunparse,
)

import aiohttp

from .config import settings


def sha256(data: bytes) -> str:
    """Generate SHA256 hash of the given data.

    Args:
        data: Bytes to hash

    Returns:
        Hexadecimal string representation of the hash
    """
    return hashlib.sha256(data).hexdigest()


def canonical_url(raw: str) -> str:
    """Normalize URL by stripping fragment and tracking parameters.

    Removes fragment, drops known tracking parameters, and sorts
    remaining query parameters for consistent URL representation.

    Args:
        raw: Raw URL string to normalize

    Returns:
        Canonical URL string
    """
    parsed = urlparse(raw)
    parsed = parsed._replace(fragment="")
    qs = [
        (k, v)
        for k, v in parse_qsl(parsed.query, keep_blank_values=True)
        if k.lower() not in settings.tracking_params
    ]
    parsed = parsed._replace(query=urlencode(sorted(qs)))
    return urlunparse(parsed).rstrip("/")


async def resolve_redirects(
    session: aiohttp.ClientSession, url: str, max_hops: int
) -> str:
    """Follow HTTP redirects up to the specified maximum hops.

    Args:
        session: aiohttp client session
        url: Initial URL to follow
        max_hops: Maximum number of redirects to follow

    Returns:
        Final URL after following redirects
    """
    for _ in range(max_hops):
        try:
            async with session.head(
                url, allow_redirects=False, ssl=False, timeout=10
            ) as resp:
                if resp.status in (301, 302, 303, 307, 308):
                    next_url = resp.headers.get("Location")
                    if next_url:
                        url = urljoin(url, next_url)
                        continue
        except Exception:
            pass
        break
    return url


# Regex pattern to extract Markdown links
MD_LINK_RE = re.compile(r"\[.*?\]\((https?://[^\)\s]+)\)", re.I)
