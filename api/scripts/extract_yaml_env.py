import json
import os
import sys

import yaml


def load_env_file(env_file):
    """Load environment variables from .env file."""
    env_vars = {}
    if os.path.exists(env_file):
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    # Remove quotes if present
                    value = value.strip("\"'")
                    env_vars[key.strip()] = value
    return env_vars


def extract_env_vars(yaml_file, service_name=None):
    """Extract environment variables from YAML file and corresponding .env file."""
    try:
        env_vars = {}

        # First, load from YAML file
        with open(yaml_file) as f:
            data = yaml.safe_load(f)

        # Extract from run.env
        if "run" in data and "env" in data["run"]:
            for env in data["run"]["env"]:
                env_vars[env["name"]] = env["value"]

        # Extract from run.network.env
        if "run" in data and "network" in data["run"] and "env" in data["run"]["network"]:
            for env in data["run"]["network"]["env"]:
                env_vars[env["name"]] = env["value"]

        # Then, load from .env file (this will override YAML values)
        if service_name:
            env_file = f".env.{service_name}"
            env_file_vars = load_env_file(env_file)
            env_vars.update(env_file_vars)

        return json.dumps(env_vars)

    except Exception:
        # Return empty JSON on error
        return "{}"


if __name__ == "__main__":
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("{}")
        sys.exit(1)

    yaml_file = sys.argv[1]
    service_name = sys.argv[2] if len(sys.argv) == 3 else None
    result = extract_env_vars(yaml_file, service_name)
    print(result)
