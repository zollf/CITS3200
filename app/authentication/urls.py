from django.contrib.auth import views as auth_views
from django.urls import path
from .views import LogoutView

authentication_urls = [
    path('login/', auth_views.LoginView.as_view(template_name="login.html"), name="login"),
    path('logout/', LogoutView, name="logout"),
]
