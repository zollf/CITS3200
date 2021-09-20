from django.db import models

class CarPark(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    google_maps_link = models.TextField()

    def __str__(self):
        return self.name


class CarBay(models.Model):
    carpark = models.ForeignKey(
        CarPark,
        related_name='carbays',
        on_delete=models.CASCADE,
    )
    bay_number = models.CharField(max_length=50)
    description = models.TextField()

class Bookings(models.Model):
    carpark = models.ForeignKey(
        CarPark,
        related_name='booking_carpark',
        on_delete=models.CASCADE,
    )
    date = models.DateField()
    name = models.CharField(max_length=50)
    email = models.EmailField(blank=False)
    rego = models.CharField(max_length=20)
    company = models.CharField(max_length=50)
    phone = models.CharField(max_length=10)

class BaysBooked(models.Model):
    booking = models.ForeignKey(
        Bookings,
        related_name='bays_booked',
        on_delete=models.CASCADE,
    )
    bay = models.ForeignKey(
        CarBay,
        related_name='booking_bay',
        on_delete=models.CASCADE,
    )
    start_time = models.TimeField()
    end_time = models.TimeField()
