from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import CarPark
from .serializers import *

@api_view(['GET'])
def carparks_list(request):
    data = CarPark.objects.all()
    serializer = CarParkSerializer(data, context={'request': request}, many=True)
    return Response(serializer.data)
