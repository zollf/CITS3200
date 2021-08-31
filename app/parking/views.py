from django.http.response import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import JSONParser

from .models import CarPark
from .serializers import *

@api_view(['GET', 'POST'])
def carparks_list(request):
    if request.method == 'GET':
        data = CarPark.objects.all()
        serializer = CarParkSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        carpark_data = JSONParser().parse(request)
        serializer = CarParkSerializer(data=carpark_data)

        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save() 
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
