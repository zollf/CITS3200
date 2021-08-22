from django.apps import AppConfig

class SettingsAppConfig(AppConfig):
    name = 'app.app_settings'
    label = 'app_settings'
    verbose_name = 'Settings App'

default_app_config = 'app.app_settings.SettingsAppConfig'
