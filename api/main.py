#!/usr/bin/env python3
"""
Regulatory Crawler
==================

Async crawler that identifies and extracts regulatory documents using:
- Jina for content extraction
- Together AI DeepSeek R1 for classification
- PostgreSQL for storage

Usage:
    python main.py <seed-url> [seed-url ...]

Environment Variables:
    JINA_API_KEY          - Jina Search Foundation API key
    TOGETHER_API_KEY      - Together AI key (OpenAI-compatible)
    DATABASE_URL          - PostgreSQL connection string
"""

import asyncio
import logging
import signal
import sys

from src.crawler import Crawler
from src import run_id

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class CrawlerRunner:
    """Simple wrapper for running the crawler with proper shutdown handling."""

    def __init__(self, crawler: Crawler):
        self.crawler = crawler
        self.shutdown_requested = False

    async def run(self):
        """Run the crawler with signal handling."""
        # Set up signal handlers for asyncio
        loop = asyncio.get_running_loop()

        def shutdown_handler():
            """Handle shutdown signals."""
            if not self.shutdown_requested:
                logger.info("Shutdown signal received. Stopping crawler...")
                self.shutdown_requested = True
                self.crawler.shutdown()

        # Add signal handlers to the event loop
        loop.add_signal_handler(signal.SIGINT, shutdown_handler)
        loop.add_signal_handler(signal.SIGTERM, shutdown_handler)

        try:
            await self.crawler.run()
            logger.info("✔ Crawl completed successfully")
        except Exception as e:
            logger.error(f"✗ Crawl failed: {e}")
            raise


async def main() -> None:
    """Main entry point for the crawler application."""
    if len(sys.argv) < 2:
        print("Usage: python main.py <seed-url> [seed-url …]")
        print("\nExample:")
        print("  python main.py https://www.sec.gov/rules")
        print("  python main.py https://www.fdic.gov/regulations")
        print("\nEnvironment variables required:")
        print("  JINA_API_KEY     - Jina API key")
        print("  TOGETHER_API_KEY - Together AI API key")
        print("  DATABASE_URL     - PostgreSQL connection string")
        sys.exit(1)

    logger.info(f"🌐 Starting crawl run {run_id}")

    crawler = Crawler(sys.argv[1:])
    runner = CrawlerRunner(crawler)

    try:
        await runner.run()
    except KeyboardInterrupt:
        logger.info("⨂ Crawl interrupted by user")
    finally:
        logger.info("Crawler finished")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n⨂ Shutting down...")
    except Exception as e:
        logger.error(f"Application failed: {e}")
        sys.exit(1)
