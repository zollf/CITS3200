from .views import SettingsView, SettingsSave
from django.urls import path

settings_url = [
    path('save', SettingsSave, name='settings_save'),
    path('', SettingsView, name='settings'),
]
