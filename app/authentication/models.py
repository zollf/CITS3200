from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

class CustomUserManager(UserManager):
    def create_user(self, email, password, phone, **extra_fields):
        if not email:
            raise ValueError('Email for user must be set.')

        if not phone:
            raise ValueError('Phone number must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, phone, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, phone, **extra_fields)

class User(AbstractUser):
    email = models.EmailField(blank=False)
    hub = models.TextField(null=True)
    phone = models.CharField(max_length=15)
    locked = models.BooleanField(default=False)
    login_count = models.IntegerField(default=0)
    last_login = models.DateTimeField(null=True)

    objects = CustomUserManager()

    REQUIRED_FIELDS = ['email', 'phone']
