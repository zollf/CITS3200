from django.db import models

class CarPark(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    google_maps_link = models.TextField()

    def __str__(self):
        return self.name


class CarBay(models.Model):
    carpark = models.ForeignKey(
        'CarPark',
        on_delete=models.CASCADE,
    )
    bay_number = models.CharField(max_length=50)
    description = models.TextField()
