from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Settings
from app.parking.models import CarPark
from app.authentication.models import User

from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required

@staff_member_required
@login_required(login_url="/login")
def AdminView(request):
    return render(request, "admin.html")

@staff_member_required
@login_required(login_url="/login")
@csrf_protect
@api_view(['GET', 'POST'])
def SettingsView(request):
    if (request.method == 'POST'):
        for key in Settings.getKeys():
            setting = Settings.objects.get(key=key)
            setting.value = request.data[key]
            setting.save()
        return redirect('/admin/settings')
    elif (request.method == 'GET'):
        return render(request, 'settings.html', {'settings': Settings.objects.all()})

@staff_member_required
@login_required(login_url="/login")
@csrf_protect
@api_view(['GET'])
def CarparksView(request):
    if (request.method == 'GET'):
        return render(request, 'carparks.html', {'carparks': CarPark.objects.values('id', 'name', 'description')})

@staff_member_required
@login_required(login_url="/login")
@csrf_protect
@api_view(['GET'])
def CarparkAdd(request):
    if (request.method == 'GET'):
        return render(request, 'carpark.html', {'carpark': CarPark()})

@staff_member_required
@login_required(login_url="/login")
@csrf_protect
@api_view(['GET'])
def CarparkEdit(request, pk):
    if (request.method == 'GET'):
        return render(request, 'carpark.html', {'carpark': CarPark.objects.values(
            'id', 'name', 'description', 'google_maps_link').get(pk=pk)})

@staff_member_required
@login_required(login_url="/login")
@csrf_protect
@api_view(['GET'])
def UsersView(request):
    if (request.method == 'GET'):
        return render(request, 'users.html', {'users': User.objects.values('id', 'username')})

@staff_member_required
@login_required(login_url="/login")
@csrf_protect
@api_view(['GET'])
def UsersAdd(request):
    if (request.method == 'GET'):
        return render(request, 'user.html', {'user': User()})

@staff_member_required
@login_required(login_url="/login")
@csrf_protect
@api_view(['GET'])
def UsersEdit(request, pk):
    if (request.method == 'GET'):
        return render(request, 'user.html', {'user': User.objects.values('id', 'username', 'email', 'phone', 'is_staff')
                                             .get(pk=pk)})
