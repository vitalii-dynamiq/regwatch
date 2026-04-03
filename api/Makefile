# Configuration
compose := DOCKER_BUILDKIT=1 BUILDKIT_INLINE_CACHE=1 docker compose -f docker-compose.yaml

# AWS Configuration (override via environment variables if needed)
AWS_REGION ?= us-east-1
PROJECT_NAME ?= regwatch-api
ECR_REPOSITORY ?= regwatch-api
IMAGE_TAG ?= latest

# Computed values
ACCOUNT_ID := $(shell aws sts get-caller-identity --query 'Account' --output text 2>/dev/null)
ECR_REGISTRY := $(ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com
FULL_IMAGE := $(ECR_REGISTRY)/$(ECR_REPOSITORY):$(IMAGE_TAG)


help:
	@echo "Available commands:"
	@echo ""
	@echo "Development:"
	@echo "  install                - Install dependencies and pre-commit hooks"
	@echo "  test                   - Run tests"
	@echo "  test-cov               - Run tests with coverage report"
	@echo "  lint                   - Run linting and pre-commit checks"
	@echo ""
	@echo "Local Development:"
	@echo "  run-local              - Run app locally"
	@echo "  docker-up              - Start all services with docker-compose"
	@echo "  docker-down            - Stop all services"
	@echo "  docker-build           - Build Docker images"
	@echo ""
	@echo "Database:"
	@echo "  db-migrate-local       - Run database migrations"
	@echo "  db-downgrade-local     - Rollback database migration"
	@echo "  db-create-migration-local - Create new migration"
	@echo "  db-migrate-run           - Run database migrations and run app"
	@echo ""
	@echo "Docker & ECR Operations:"
	@echo "  ecr-login              - Login to Amazon ECR"
	@echo "  docker-build-push      - Build and push Docker image to ECR"

install-dependencies-dev:
	poetry install --only dev --no-root

install-pre-commit:
	pre-commit install --install-hooks

install:
	poetry install --no-root
	make install-pre-commit

prepare:
	pre-commit run --all-files

lint: prepare

lock:
	poetry lock --no-update

test:
	pytest tests

test-cov:
	mkdir -p ./reports
	coverage run -m pytest --junitxml=./reports/test-results.xml tests
	coverage report --skip-empty
	coverage html -d ./reports/htmlcov --omit="*/test_*,*/tests.py"
	coverage xml -o ./reports/coverage.xml --omit="*/test_*,*/tests.py"

docker-build:
	${compose} build --progress plain

docker-up:
	${compose} up --build

docker-up-detach:
	${compose} up --build -d

docker-down:
	${compose} down

docker-up-app-env:
	${compose} up --build regwatch-api-app

docker-up-test-env:
	${compose} up --build --abort-on-container-exit regwatch-api-app-test

docker-up-test-cov-env:
	docker-compose -f docker-compose.dev.yaml up --build --abort-on-container-exit regwatch-api-app-test-cov

run-local:
	ENV=local python server.py

db-migrate-local:
	ENV=local alembic upgrade head

db-downgrade-local:
	ENV=local alembic downgrade -1

db-create-migration-local:
	ENV=local alembic revision --autogenerate -m "add obligations source foreign key"

db-migrate-run:
	alembic upgrade head
	python server.py

# ECR and Docker operations
ecr-login:
	@echo "🔐 Logging into Amazon ECR..."
	@aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(ECR_REGISTRY)

docker-build-push: ecr-login
	@echo "🏗️ Building and pushing Docker image..."
	$(eval GIT_HASH := $(shell git rev-parse --short HEAD))
	$(eval LATEST_IMAGE := $(ECR_REGISTRY)/$(ECR_REPOSITORY):latest)
	$(eval HASH_IMAGE := $(ECR_REGISTRY)/$(ECR_REPOSITORY):$(GIT_HASH))
	@echo "Building image with platform linux/amd64..."
	@echo "Tags: latest, $(GIT_HASH)"
	@docker build --platform linux/amd64 -f Dockerfile -t $(LATEST_IMAGE) -t $(HASH_IMAGE) .
	@echo "Pushing images to ECR..."
	@docker push $(LATEST_IMAGE)
	@docker push $(HASH_IMAGE)
	@echo "✅ Successfully built and pushed:"
	@echo "  $(LATEST_IMAGE)"
	@echo "  $(HASH_IMAGE)"
