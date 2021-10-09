from django.apps import AppConfig

class EmailAppConfig(AppConfig):
    name = 'app.emails'
    label = 'email_app'
    verbose_name = 'Emails App'

default_app_config = 'app.emails.EmailAppConfig'
