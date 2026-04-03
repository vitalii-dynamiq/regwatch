#!/bin/sh
set -e

if [ -n "$SERVICE_COMMAND" ]; then
    exec $SERVICE_COMMAND
else
    alembic upgrade head
    exec python3 server.py
fi
