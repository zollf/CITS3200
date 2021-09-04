from .views import SettingsView, AdminView, CarparksView, CarparkAdd, CarparkEdit, UsersView, UsersEdit, UsersAdd
from django.urls import path

admin_urls = [
    path('', AdminView, name='admin'),

    path('settings/', SettingsView, name='settings'),

    path('users/', UsersView, name='users'),
    path('users/add', UsersAdd, name='user_add'),
    path('users/view/<int:pk>', UsersEdit, name='user_view'),
    
    path('carparks/', CarparksView, name='carparks'),
    path('carparks/add/', CarparkAdd, name="carpark_add"),
    path('carparks/view/<int:pk>', CarparkEdit, name="carpark_view"),
]
