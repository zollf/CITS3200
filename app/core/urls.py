"""
Django Urls
"""

from django.urls import path
from django.conf.urls import include
from app.index.views import IndexView
from app.admin.urls import admin_urls
from app.authentication.urls import authentication_urls, api_urls
from app.parking.urls import parking_urls
from app.parking.open_urls import open_api_urls
from app.emails.urls import email_urls

urlpatterns = [
    path('admin/', include(admin_urls)),
    path('api/', include(parking_urls)),
    path('api/users/', include(api_urls)),
    path('api/emails/', include(email_urls)),
    path('api/v1/open/', include(open_api_urls)),
    path('', IndexView, name='index'),
    path('', include(authentication_urls)),
]
