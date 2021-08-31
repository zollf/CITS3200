"""
Django Urls
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from app.index.views import IndexView
from app.admin_settings.urls import settings_url
from app.authentication.urls import authentication_urls
from django.contrib.auth import urls

urlpatterns = [
    path('admin/settings/', include(settings_url)),
    path('django-admin/', admin.site.urls),
    path('', IndexView, name='index'),
    path('auth/', include(authentication_urls)),
]
