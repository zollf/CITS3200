from django.db import models

class CarPark(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    google_maps_link = models.TextField()

    def __str__(self):
        return self.name
