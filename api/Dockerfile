FROM python:3.12-slim AS runtime

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VERSION=1.8.3
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PATH=${POETRY_HOME}/bin:${PATH}


RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential cmake curl libffi-dev libssl-dev libgeos-dev bash poppler-utils \
    && apt-get clean
RUN curl -sSL https://install.python-poetry.org | python3 - --yes

WORKDIR /app

COPY ./pyproject.toml /app/pyproject.toml
COPY ./poetry.lock /app/poetry.lock
COPY ./Makefile /app/Makefile

RUN poetry install --no-root

FROM runtime AS develop

COPY ./app /app/app
COPY ./migrations /app/migrations
COPY ./alembic.ini /app/alembic.ini
COPY ./server.py /app/server.py

EXPOSE 8080

CMD ["python3", "server.py"]
