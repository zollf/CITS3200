from django.db import models

class Settings(models.Model):
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def getKeys():
        return [setting['key'] for setting in Settings.objects.values()]

    def getDict():
        dictionary = {}
        for setting in Settings.objects.values():
            dictionary[setting['key']] = setting['value']
        return dictionary

    class Meta:
        db_table = "admin_settings"
