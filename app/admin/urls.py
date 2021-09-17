from .views import SettingsView, AdminView, CarparksView, CarparkAdd, CarparkEdit, UsersView, UsersEdit, UsersAdd
from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views


admin_urls = [
    path('', AdminView, name='admin'),

    path('settings/', SettingsView, name='settings'),

    path('users/', UsersView, name='users'),
    path('users/add', UsersAdd, name='user_add'),
    path('users/view/<int:pk>', UsersEdit, name='user_view'),
    path('users/view/password_change', auth_views.PasswordChangeView.as_view(success_url=reverse_lazy("login"),
         template_name="password.html"), name="password_change"),

    path('carparks/', CarparksView, name='carparks'),
    path('carparks/add/', CarparkAdd, name="carpark_add"),
    path('carparks/view/<int:pk>', CarparkEdit, name="carpark_view"),
]
