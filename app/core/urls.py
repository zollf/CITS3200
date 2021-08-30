"""
Django Urls
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from app.index.views import IndexView
from app.admin_settings.urls import settings_url
from app.parking.views import carparks_list

urlpatterns = [
    path('admin/settings/', include(settings_url)),
    path('api/carparks/', carparks_list),
    path('django-admin/', admin.site.urls),
    path('', IndexView, name='index'),
]
