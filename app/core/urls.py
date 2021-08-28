"""
Django Urls
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from app.index.views import AdminPanel, IndexView
from app.admin_settings.urls import settings_url

urlpatterns = [
    path('admin/settings/', include(settings_url)),
    path('django-admin/', admin.site.urls),
    path('', IndexView, name='index'),
    path('admin',  AdminPanel, name='admin'),
]
