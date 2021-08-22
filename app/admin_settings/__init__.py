from django.apps import AppConfig

class AdminSettingsConfig(AppConfig):
    name = 'app.admin_settings'
    label = 'admin_settings'
    verbose_name = 'Admin Settings'

default_app_config = 'app.admin_settings.AdminSettingsConfig'
