from rest_framework import serializers
from .models import CarBay, CarPark

class CarBaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CarBay
        fields = ('pk', 'carpark', 'bay_number', 'description')

class CarParkSerializer(serializers.ModelSerializer):
    carbays = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = CarPark
        fields = ('pk', 'name', 'description', 'google_maps_link', 'carbays')
        depth = 1
