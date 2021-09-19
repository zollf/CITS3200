"""
Django Urls
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from app.index.views import IndexView
from app.admin.urls import admin_urls
from app.authentication.urls import authentication_urls, api_urls
from app.parking.urls import parking_urls

urlpatterns = [
    path('admin/', include(admin_urls)),
    path('api/carparks/', include(parking_urls)),
    path('api/users/', include(api_urls)),
    path('', IndexView, name='index'),
    path('', include(authentication_urls)),
]
