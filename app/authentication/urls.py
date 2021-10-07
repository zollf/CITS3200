from django.contrib.auth import views as auth_views
from django.urls import path
from .views import LogoutView, user_detail, users_list

authentication_urls = [
    path('login/', auth_views.LoginView.as_view(template_name="login.html"), name="login"),
    path('logout/', LogoutView, name="logout"),
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name="reset/reset.html",
         email_template_name="reset/email.html", subject_template_name="reset/subject.txt", success_url="/login"),
         name="reset"),
    path('password_reset_confirm/<str:uidb64>/<str:token>', auth_views.PasswordResetConfirmView.as_view(
        template_name="reset/reset_confirm.html", success_url="/login"), name="reset_confirm")
]

api_urls = [
    path('', users_list),
    path('<int:pk>', user_detail)
]
