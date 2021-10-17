"""
Open views is for api purposes
We don't want to open routes that have DELETE or POST methods to do those
We would need to spend excessive time to do that.
"""
from django.http.response import JsonResponse
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import CarPark, CarBay
from app.authentication.models import User
from .serializers import *

@api_view(['GET'])
def carparks_list(request):
    if request.method == 'GET':
        data = CarPark.objects.all()
        serializer = CarParkSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def carpark_detail(request, pk):
    try:
        carpark = CarPark.objects.get(pk=pk)
    except CarPark.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarParkSerializer(carpark)
        return JsonResponse(serializer.data)

@api_view(['GET'])
def carbay_list(request):
    if request.method == 'GET':
        data = CarBay.objects.all()
        serializer = CarBaySerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def carbay_detail(request, pk):
    try:
        carbay: CarBay = CarBay.objects.get(pk=pk)
    except CarBay.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarBaySerializer(carbay)
        return JsonResponse(serializer.data)

@api_view(['GET'])
def carbays_list(request, pk):
    if request.method == 'GET':
        data = CarBay.objects.all().filter(carpark=pk)
        serializer = CarBaySerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def bays_booked(request):
    if request.method == 'POST':
        """
        {
          "date": "2000-01-01",
          "carpark": 1
        }
        """
        if 'date' not in request.data and 'carpark' not in request.data:
            return JsonResponse({
                'error': 'Please supply what carpark and date you want.'
            }, status=status.HTTP_400_BAD_REQUEST)

        if 'bay' in request.data:
            bays = BaysBooked.objects.filter(
                booking__date=request.data['date'], bay__carpark=request.data['carpark'], bay__id=request.data['bay'])
        else:
            bays = BaysBooked.objects.filter(booking__date=request.data['date'], bay__carpark=request.data['carpark'])
        baysBookedSerializer = BaysBookedSerializer(bays, context={'request': request}, many=True)
        baysCleaned = []
        # Do not return any information on bookings
        for bay in baysBookedSerializer.data:
            baysCleaned.append({
                'pk': bay['pk'],
                'bay': bay['bay'],
                'start_time': bay['start_time'],
                'end_time': bay['end_time'],
            })

        return JsonResponse({'success': True, 'bays': baysCleaned}, status=status.HTTP_200_OK)
