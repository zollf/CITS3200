from django.apps import AppConfig

class IndexAppConfig(AppConfig):
    name = 'app.index'
    label = 'index'
    verbose_name = 'Index'

default_app_config = 'app.index.IndexAppConfig'
