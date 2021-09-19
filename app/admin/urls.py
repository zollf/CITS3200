from django.contrib.auth.forms import AdminPasswordChangeForm
from .views import SettingsView, \
    AdminView, \
    CarparksView, \
    CarparkAdd, \
    CarparkEdit, \
    UsersView, \
    UsersEdit, \
    UsersAdd, \
    StaffRequiredView, \
    BayAdd, \
    BayEdit
from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views

admin_urls = [
    path('', AdminView, name='admin'),
    path('staff_required/', StaffRequiredView, name="staff_required"),

    path('settings/', SettingsView, name='settings'),

    path('users/', UsersView, name='users'),
    path('users/add', UsersAdd, name='user_add'),
    path('users/view/<int:pk>', UsersEdit, name='user_view'),
    path('users/view/password_change', auth_views.PasswordChangeView.as_view(success_url=reverse_lazy("login"),
         template_name="password.html", form_class=AdminPasswordChangeForm), name="password_change"),

    path('carparks/', CarparksView, name='carparks'),
    path('carparks/add/', CarparkAdd, name="carpark_add"),
    path('carparks/view/<int:pk>', CarparkEdit, name="carpark_view"),

    path('carparks/<int:pk>/bay/add', BayAdd, name="carbay_add"),
    path('carparks/<int:pk>/bay/<int:pk2>/view', BayEdit, name="carbay_edit"),
]
