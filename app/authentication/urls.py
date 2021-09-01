from django.contrib.auth import views as auth_views
from django.urls import path

authentication_urls = [
    path('', auth_views.LoginView.as_view(template_name="login.html"), name="login")
]