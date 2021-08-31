from django.contrib.auth.admin import UserAdmin
from .models import User
from django.contrib import admin

admin.site.register(User, UserAdmin)