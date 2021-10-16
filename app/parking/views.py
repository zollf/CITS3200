from django.shortcuts import redirect
from django.http.response import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import JSONParser

from .models import CarPark, CarBay
from app.authentication.models import User
from .serializers import *

@login_required(login_url="/login")
@csrf_protect
@api_view(['GET', 'POST'])
def carparks_list(request):
    if request.method == 'GET':
        data = CarPark.objects.all()
        serializer = CarParkSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if 'pk' in request.data:
            carpark = CarPark.objects.get(pk=request.data['pk'])
            serializer = CarParkSerializer(carpark, data=request.data)
        else:
            serializer = CarParkSerializer(data=request.data)

        if not serializer.is_valid():
            if 'redirect' in request.data:
                errors = [str(error[1][0]).replace("this field", error[0]) for error in serializer.errors.items()]
                if 'pk' in request.data:
                    request.session["edit_carpark_errors"] = errors
                    return redirect(f"/admin/carparks/view/{request.data.get('pk', '')}")
                else:
                    request.session["new_carpark_errors"] = errors
                    return redirect(f"/admin/carparks/add")

            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        if 'redirect' in request.data:
            return redirect(request.data['redirect'])
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

@login_required(login_url="/login")
@csrf_protect
@api_view(['GET', 'PUT', 'DELETE'])
def carpark_detail(request, pk):
    try:
        carpark = CarPark.objects.get(pk=pk)
    except CarPark.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarParkSerializer(carpark)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        carpark_data = JSONParser().parse(request)
        serializer = CarParkSerializer(carpark, data=carpark_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        carpark.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def carbay_list(request):
    if request.method == 'GET':
        data = CarBay.objects.all()
        serializer = CarBaySerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if 'pk' in request.data:
            carpark = CarBay.objects.get(pk=request.data['pk'])
            serializer = CarBaySerializer(carpark, data=request.data)
        else:
            serializer = CarBaySerializer(data=request.data)

        if not serializer.is_valid():
            if 'redirect' in request.data:
                request.session["bay_errors"] = [str(error[1][0]).replace("this field", error[0])
                                                 for error in serializer.errors.items()]
                return redirect(f"/admin/carparks/{request.data.get('carpark', '')}/bay/add")
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        if 'redirect' in request.data:
            return redirect(request.data['redirect'])
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def carbay_detail(request, pk):
    try:
        carbay: CarBay = CarBay.objects.get(pk=pk)
    except CarBay.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarBaySerializer(carbay)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        carbay_data = JSONParser().parse(request)
        serializer = CarBaySerializer(carbay, data=carbay_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        carbay.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

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

@login_required(login_url="/login")
@api_view(['GET', 'POST'])
def bookings(request):
    if request.method == 'GET':
        bookings = Bookings.objects.all()
        bookingsSerializer = BookingsSerializer(bookings, context={'request': request}, many=True)
        return Response(bookingsSerializer.data)

    elif request.method == 'POST':
        """
        {
          "booking": {
            "carpark": 1,
            "date": "2000-01-01", # YYYY-MM-DD
            "name": "uniart",
            "email": "test@test.com",
            "rego": "1234",
            "company": "uni",
            "phone": 1234
            "user": "1"
          },
          "bays": [
            {
              "bay": 1,
              "start_time": "00:00",
              "end_time": "12:00"
            },
            {
              "bay": 2,
              "start_time": "00:00",
              "end_time": "12:00"
            }
          ]
        }
        """
        if 'booking' not in request.data or 'bays' not in request.data:
            return JsonResponse({
                'error': 'Please supply a booking and the bay(s) booked.'
            }, status=status.HTTP_400_BAD_REQUEST)

        booking = request.data['booking']

        # Find carpark for booking
        try:
            carpark = CarPark.objects.get(pk=booking['carpark'])
        except CarPark.DoesNotExist:
            return JsonResponse({
                'error': 'No carpark could be found given the id.'
            }, status=status.HTTP_400_BAD_REQUEST)

        booking['carpark_id'] = carpark.pk

        # Find user for booking
        try:
            user = User.objects.get(pk=booking['user'])
        except User.DoesNotExist:
            return JsonResponse({
                'error': 'No user could be found given the id.'
            }, status=status.HTTP_400_BAD_REQUEST)

        booking['user_id'] = user.pk

        bookingsSerializer = BookingsSerializer(data=request.data['booking'])

        if not bookingsSerializer.is_valid():
            return JsonResponse({
                'errors': bookingsSerializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        bookingsSerializer.save()

        # Save Bays
        for bay in request.data['bays']:

            try:
              CarBay.objects.get(pk=bay['bay'])
            except CarBay.DoesNotExist:
                return JsonResponse({
                    'error': 'No Carpark bay could be found given the id.'
                }, status=status.HTTP_400_BAD_REQUEST)

            bayBooked = bay
            bayBooked['booking_id'] = bookingsSerializer.data['pk']
            bayBooked['bay_id'] = bay['bay']

            baysBookedSerializer = BaysBookedSerializer(data=bayBooked)

            if not baysBookedSerializer.is_valid():
                return JsonResponse({
                    'errors': baysBookedSerializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)

            baysBookedSerializer.save()

        return JsonResponse({'success': True, 'booking_id': bookingsSerializer.data['pk']},
                            status=status.HTTP_201_CREATED)

@login_required(login_url="/login")
@api_view(['GET', 'DELETE'])
def booking(request, pk):
    if request.method == 'GET':
        try:
            booking = Bookings.objects.get(pk=pk)
        except Bookings.DoesNotExist:
            return JsonResponse({'error': 'Booking cannot be found.'}, status=status.HTTP_400_BAD_REQUEST)

        bookingsSerializer = BookingsSerializer(booking, context={'request': request})

        try:
            bays = BaysBooked.objects.filter(booking__id=pk)
        except Bookings.DoesNotExist:
            return JsonResponse({'error': 'No bays can be found for this booking.'}, status=status.HTTP_400_BAD_REQUEST)

        baysBookedSerializer = BaysBookedSerializer(bays, context={'request': request}, many=True)

        baysCleaned = []
        for bay in baysBookedSerializer.data:
            baysCleaned.append({
                'pk': bay['pk'],
                'bay': bay['bay'],
                'start_time': bay['start_time'],
                'end_time': bay['end_time'],
            })

        return JsonResponse({'booking': bookingsSerializer.data, 'bays': baysCleaned}, status=status.HTTP_200_OK)

    if request.method == 'DELETE':
        booking = Bookings.objects.get(pk=pk)
        booking.delete()
        bays = BaysBooked.objects.filter(booking__id=pk)
        for bay in bays:
            bay.delete()

        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
