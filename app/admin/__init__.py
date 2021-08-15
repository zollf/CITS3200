from django.apps import AppConfig


class AdminAppConfig(AppConfig):
    name = 'app.admin'
    label = 'admin_panel'
    verbose_name = 'Admin Panel'


default_app_config = 'app.admin.AdminAppConfig'
