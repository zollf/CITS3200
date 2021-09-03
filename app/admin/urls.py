from .views import SettingsView, AdminView, CarparksView, CarparkAdd, CarparkEdit, UsersView
from django.urls import path

admin_urls = [
    path('', AdminView, name='admin'),

    path('settings/', SettingsView, name='settings'),

    path('users/', UsersView, name='users'),

    path('carparks/', CarparksView, name='carparks'),
    path('carparks/add/', CarparkAdd, name="carpark_new"),
    path('carparks/view/<int:pk>', CarparkEdit, name="carpark_view"),
]
