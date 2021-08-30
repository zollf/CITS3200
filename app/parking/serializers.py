from rest_framework import serializers
from .models import CarPark

class CarParkSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarPark
        fields = ('pk', 'name', 'description', 'google_maps_link')