from .views import SettingsView, AdminView
from django.urls import path

admin_urls = [
    path('settings/', SettingsView, name='settings'),
    path('', AdminView, name='admin'),
]
