"""Database models for the regulatory crawler."""

from datetime import datetime

from sqlalchemy import (
    JSON,
    DateTime,
    Integer,
    Text,
    func,
)
from sqlalchemy.ext.asyncio import (
    AsyncAttrs,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from .config import settings


class Base(AsyncAttrs, DeclarativeBase):
    """Base class for all database models."""
    pass


class Source(Base):
    """Model representing a web source/URL being tracked.

    Stores metadata about URLs including fingerprints for change detection.
    """
    __tablename__ = "sources"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    canonical_url: Mapped[str] = mapped_column(
        Text, unique=True, nullable=False
    )
    host: Mapped[str] = mapped_column(Text, index=True)
    first_seen: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    last_crawled: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    last_fingerprint: Mapped[str | None] = mapped_column(Text)
    last_status: Mapped[int | None] = mapped_column(Integer)
    last_length: Mapped[int | None] = mapped_column(Integer)


class PageVersion(Base):
    """Model representing a specific version of a crawled page.

    Stores the actual content and classification results for regulatory pages.
    """
    __tablename__ = "page_versions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    run_id: Mapped[str] = mapped_column(Text, index=True)
    source_id: Mapped[int] = mapped_column(Integer, index=True)
    fingerprint: Mapped[str] = mapped_column(Text)
    scraped_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    meta: Mapped[dict] = mapped_column(JSON)
    markdown: Mapped[str] = mapped_column(Text)


# Database engine and session factory
engine = create_async_engine(
    settings.database_url,
    pool_size=20,
    max_overflow=200,
    pool_pre_ping=True,
    pool_recycle=3600,
    future=True,
    echo=False,
)
Session = async_sessionmaker(engine, expire_on_commit=False)


async def init_db() -> None:
    """Initialize the database by creating all tables."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
