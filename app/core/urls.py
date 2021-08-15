"""
Django Urls
"""

from django.contrib import admin
from django.urls import path
from app.index.views import IndexView
from app.admin.views import AdminView

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('', IndexView, name='index'),
    path('admin/', AdminView, name="admin"),
]
