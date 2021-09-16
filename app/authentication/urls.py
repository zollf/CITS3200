from django.contrib.auth import views as auth_views
from django.urls import path
from .views import LogoutView, user_detail, users_list

authentication_urls = [
    path('login/', auth_views.LoginView.as_view(template_name="login.html"), name="login"),
    path('logout/', LogoutView, name="logout"),
]

api_urls = [
    path('', users_list),
    path('<int:pk>', user_detail)
]
