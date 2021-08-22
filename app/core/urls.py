"""
Django Urls
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from app.index.views import IndexView
from app.app_settings.views import SettingsView, SettingsSave

urlpatterns = [
    path('admin/settings/save', SettingsSave, name='settings_save'),
    path('admin/settings', SettingsView, name='settings'),
    path('django-admin/', admin.site.urls),
    path('', IndexView, name='index'),
]
