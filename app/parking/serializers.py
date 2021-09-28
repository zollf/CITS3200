from rest_framework import serializers
from .models import CarBay, CarPark, Bookings, BaysBooked

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

class BookingsSerializer(serializers.ModelSerializer):
    carpark_id = serializers.IntegerField(write_only=True)
    user_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Bookings
        fields = ('pk', 'carpark', 'carpark_id', 'date', 'name', 'email', 'rego', 'company', 'phone', 'user', 'user_id')
        depth = 1

class BaysBookedSerializer(serializers.ModelSerializer):
    booking_id = serializers.IntegerField(write_only=True)
    bay_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = BaysBooked
        fields = ('pk', 'booking', 'booking_id', 'bay', 'bay_id', 'start_time', 'end_time')
        depth = 1
