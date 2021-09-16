from django.contrib.auth import logout
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser

from .models import User
from .serializers import *

def LogoutView(request):
    logout(request)
    return redirect('/')

@login_required(login_url="/login")
@csrf_protect
@api_view(["GET", "POST"])
def users_list(request):
    # list all users in database. Note that table.html does not use this.
    if request.method == 'GET':
        data = User.objects.all()
        serializer = UserSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # update existing user
        if 'pk' in request.data:
            user = User.objects.get(pk=request.data['pk'])
            serializer = UserSerializer(user, data=request.data)
        # create new user
        else:
            serializer = UserSerializer(data=request.data)
        
        if not serializer.is_valid():
            # redirect to given page if exists or return JSON
            if 'redirect' in request.data:
                return redirect(request.data['redirect'])
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        if 'redirect' in request.data:
            return redirect(request.data['redirect'])
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

@login_required(login_url="/login")
@csrf_protect
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    # Get info of specifc user
    if request.method == 'GET':
        serializer = UserSerializer(User)
        return JsonResponse(serializer.data)

    # Update data/fields of specific user
    elif request.method == 'PUT':
        User_data = JSONParser().parse(request)
        serializer = UserSerializer(User, data=User_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete specific user from database
    elif request.method == 'DELETE':
        User.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    