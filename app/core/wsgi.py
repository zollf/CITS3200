"""
Production build
"""

import os
from pathlib import Path
import dotenv
from django.core.wsgi import get_wsgi_application

dotenv.read_dotenv(Path(__file__).resolve(
).parent.parent.parent.joinpath('.env'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.core.settings')

application = get_wsgi_application()
