from django.db import models
from django.contrib.auth.models import AbstractUser 

class User(AbstractUser):
    hub_id = models.IntegerField()
    phone = models.CharField(max_length=10)
    locked = models.BooleanField()
    login_count = models.IntegerField()
    last_login = models.DateTimeField()

