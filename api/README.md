# RegWatch API

An asynchronous regulatory monitoring API that identifies and extracts regulatory documents using AI-powered classification.

## Features

- **Smart Content Extraction**: Uses Jina ReaderLM-v2 to convert HTML/PDF/DOCX to clean markdown
- **AI Classification**: Together AI's DeepSeek-R-1 model for single-pass regulatory content identification
- **Selective Storage**: Only regulatory pages are persisted to reduce noise
- **Change Detection**: SHA256 fingerprinting to track content changes
- **Cloud-Ready**: Built for PostgreSQL cloud services like Neon
- **Async Architecture**: High-performance async I/O with configurable concurrency
- **FastAPI Backend**: RESTful API with automatic documentation

## Project Structure

```
├── app/                     # Main application package
│   ├── api/                # API routes and endpoints
│   │   └── v1/            # API version 1
│   ├── core/              # Core application components
│   │   ├── clients/       # HTTP clients and connections
│   │   ├── exceptions.py  # Custom exceptions
│   │   ├── loggers.py     # Logging configuration
│   │   └── settings.py    # Application settings
│   ├── db/                # Database layer
│   │   └── pg/           # PostgreSQL specific code
│   │       └── models/   # SQLAlchemy models
│   ├── services/          # Business logic services
│   │   ├── classifier/   # AI classification service
│   │   └── crawler/      # Web crawling service
│   └── main.py           # FastAPI application
├── server.py              # Application entry point
├── docker-compose.yaml    # Docker Compose configuration
├── Dockerfile            # Container configuration
├── Makefile              # Development and deployment commands
├── env.prod.example      # Production environment reference
└── pyproject.toml        # Python dependencies (Poetry)
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd regwatch-api
   ```

2. **Install dependencies (using Poetry)**
   ```bash
   make install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and database URL
   ```

4. **Run database migrations**
   ```bash
   make db-migrate-local
   ```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `JINA_API_KEY` | Jina Search Foundation API key | `jina_...` |
| `TOGETHER_API_KEY` | Together AI API key | `...` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+asyncpg://user:pass@host/db` |

### Getting API Keys

- **Jina API**: Sign up at [jina.ai](https://jina.ai/)
- **Together AI**: Get your key from [api.together.xyz](https://api.together.xyz/)
- **Neon PostgreSQL**: Create a database at [neon.tech](https://neon.tech/)

## Usage

There are two main ways to run the RegWatch API:

### 1. Local Development (CLI)

Run the FastAPI server locally for development:

```bash
# Start the API server locally
make run-local

# The API will be available at http://localhost:8082
# API documentation at http://localhost:8082/docs
```

### 2. Docker Compose (Recommended)

Run the full application stack with Docker Compose:

```bash
# Start all services (API + Database)
make docker-up

# Run in detached mode (background)
make docker-up-detach

# Stop all services
make docker-down

# Build Docker images
make docker-build

# Run only the app service
make docker-up-app-env

# Run tests in Docker
make docker-up-test-env
```

## Regulatory Categories

The classifier identifies content in these categories:

- Banking & Finance
- AML / KYC
- Capital Adequacy
- Taxation
- Labour & Employment
- Data Protection & Privacy
- Consumer Protection
- Licensing / Registration
- Reporting & Disclosure
- Environmental
- Health & Safety

## Configuration

Adjust settings in `app/core/settings.py`:

- `CRAWLER_MAX_CONCURRENCY`: Concurrent HTTP requests (default: 8)
- `CRAWLER_MAX_REDIRECTS`: Max redirect hops to follow (default: 5)
- `CLASSIFIER_MODEL`: AI model name (default: "deepseek-ai/DeepSeek-R1")
- `SERVER_PORT`: API server port (default: 8082)
- `DB_POOL_MAX_SIZE`: Database connection pool size (default: 5)

## Development

### Running Tests
```bash
# Run tests
make test

# Run tests with coverage
make test-cov
```

### Code Quality
```bash
# Run linting and formatting
make prepare

# Install development dependencies
make install-dependencies-dev
```

### Database Management
```bash
# Run migrations
make db-migrate-local

# Create new migration
make db-create-migration-local

# Rollback migration
make db-downgrade-local
```

### Docker Development
```bash
# Build Docker image
make docker-build

# Run tests in Docker
make docker-up-test-env
```

## License

MIT License - see LICENSE file for details.
