from django.shortcuts import redirect
from django.http.response import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import JSONParser

from .models import CarPark
from .serializers import *

@csrf_protect
@api_view(['GET', 'POST'])
def carparks_list(request):
    if request.method == 'GET':
        data = CarPark.objects.all()
        serializer = CarParkSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CarParkSerializer(data=request.data)

        if not serializer.is_valid():
            if 'redirect' in request.data:
                return redirect('/admin/carparks')
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        if 'redirect' in request.data:
            return redirect('/admin/carparks')
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

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
