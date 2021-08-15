#!/usr/bin/env python
import os
import sys
import dotenv
from pathlib import Path


def main():
    dotenv.read_dotenv(Path(__file__).resolve().parent.joinpath('.env'))
    if (sys.argv[1] == 'test'):
        # Set ENV to test, useful for changing settings
        os.environ['ENV'] = 'test'

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.core.settings')

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
