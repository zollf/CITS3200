"""
Django Urls
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from app.index.views import IndexView
from app.admin.urls import admin_urls
from app.authentication.urls import authentication_urls
from app.parking.views import carparks_list, carpark_detail

urlpatterns = [
    path('admin/', include(admin_urls)),
    path('api/carparks/', carparks_list),
    path('api/carparks/<int:pk>', carpark_detail),
    path('', IndexView, name='index'),
    path('', include(authentication_urls)),
]
