"""
Django Settings
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

IS_PROD = os.getenv("ENV") == "prod"
LIVE_URL = os.getenv("LIVE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = not IS_PROD

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_components',
    'rest_framework',
    'app.index',
    'app.parking',
    'app.authentication',
    'app.admin',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'app.core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "resources/templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'builtins': [
                'django_components.templatetags.component_tags',
            ]
        },
    },
]

WSGI_APPLICATION = 'app.core.wsgi.application'

DB_CONFIGS = {
    'mysql': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv("MYSQL_DATABASE"),
        'USER': os.getenv("MYSQL_USERNAME"),
        'PASSWORD': os.getenv("MYSQL_PASSWORD"),
        'HOST': os.getenv("MYSQL_HOST"),
        'PORT': os.getenv("MYSQL_PORT"),
    },
    'sqlite3': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'test_db'
    }
}

DATABASES = {
    'default': DB_CONFIGS['mysql'] if os.getenv("ENV") != 'test' else DB_CONFIGS['sqlite3']
}


AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

AUTH_USER_MODEL = 'authentication.User'
LOGIN_URL = "login/"
LOGIN_REDIRECT_URL = "/"  # in case next parameter is not specified in GET request
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
#EMAIL_HOST = 
#EMAIL_PORT = 25
#EMAIL_HOST_USER = 
#EMAIL_HOST_PASSWORD = 

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'

if os.getenv("ENV") == 'prod':
    # We only use this is prod as it will be using gunicorn
    STATIC_ROOT = os.path.join(BASE_DIR, "resources/static/")
else:
    STATICFILES_DIRS = [os.path.join(BASE_DIR, "resources/static/")]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
