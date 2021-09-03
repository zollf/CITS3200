from django.apps import AppConfig

class ParkingAppConfig(AppConfig):
    name = 'app.parking'
    verbose_name = 'admin'

default_app_config = 'app.parking.ParkingAppConfig'
