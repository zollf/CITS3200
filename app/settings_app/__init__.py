from django.apps import AppConfig

class SettingsAppConfig(AppConfig):
    name = 'app.settings_app'
    label = 'settings_app'
    verbose_name = 'Settings App'

default_app_config = 'app.settings_app.SettingsAppConfig'
