from django.db import models

class Settings(models.Model):
    key = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    @staticmethod
    def getKeys():
        return [setting['key'] for setting in Settings.objects.values()]

    @staticmethod
    def getDict():
        dictionary = {}
        for setting in Settings.objects.values():
            dictionary[setting['key']] = setting['value']
        return dictionary

    class Meta:
        db_table = "admin_settings"
