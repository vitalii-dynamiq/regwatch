import signal
import sys
from datetime import datetime
from typing import Any

import psutil

from app.core.loggers import logger
from app.core.settings import settings


def handle_termination_signal(signum: int, frame: Any | None = None) -> None:
    """Handle termination signals with maximum logging information.

    Args:
        signum: The signal number received
        frame: The current stack frame
    """
    try:
        signal_name: str = signal.Signals(signum).name
    except ValueError:
        signal_name: str = f"UNKNOWN({signum})"

    current_process: psutil.Process = psutil.Process()

    system_info = {
        "cpu_count": psutil.cpu_count(),
        "memory_total": psutil.virtual_memory().total,
        "memory_available": psutil.virtual_memory().available,
        "memory_percent": psutil.virtual_memory().percent,
    }

    process_info = {
        "pid": current_process.pid,
        "ppid": current_process.ppid(),
        "name": current_process.name(),
        "cpu_percent": current_process.cpu_percent(),
        "memory_info": current_process.memory_info()._asdict(),
        "memory_percent": current_process.memory_percent(),
        "num_threads": current_process.num_threads(),
        "status": current_process.status(),
        "create_time": datetime.fromtimestamp(current_process.create_time()).isoformat(),
    }

    termination_data = {
        "signal": {"name": signal_name, "number": signum},
        "system": {
            "python_version": sys.version,
            "platform": sys.platform,
            "version": settings.VERSION,
            "system_info": system_info,
        },
        "process": process_info,
    }

    logger.info(f"Termination signal received. Data: {termination_data}")


def init_signal_handlers() -> None:
    signal.signal(signal.SIGTERM, handle_termination_signal)
    signal.signal(signal.SIGINT, handle_termination_signal)
