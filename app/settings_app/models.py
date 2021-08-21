from django.db import models

class Settings(models.Model):
  key = models.CharField(max_length=255)
  value = models.CharField(max_length=255)
  
  def __str__(self):
    return self.name

  def getKeys():
    return ['phone']

  class Meta:
    db_table = "app_settings"