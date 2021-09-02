from django.apps import AppConfig

class AdminAppConfig(AppConfig):
    name = 'app.admin'
    label = 'booking_admin'
    verbose_name = 'admin'

default_app_config = 'app.admin.AdminAppConfig'
