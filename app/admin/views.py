from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Settings
from rest_framework.response import Response
from app.parking.models import CarPark, CarBay, Bookings, BaysBooked
from app.authentication.models import User

from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required

from .utils import common_decorators, renderPDF

@staff_member_required(login_url="/admin/staff_required")
@login_required(login_url="/login")
def AdminView(request):
    return render(request, "admin.html")

@login_required(login_url="/login")
def StaffRequiredView(request):
    return render(request, "staff_required.html")

@common_decorators(['GET', 'POST'])
def SettingsView(request):
    if (request.method == 'POST'):
        for key in Settings.getKeys():
            setting = Settings.objects.get(key=key)
            setting.value = request.data[key]
            setting.save()
        return redirect('/admin/settings')
    elif (request.method == 'GET'):
        return render(request, 'settings.html', {'settings': Settings.objects.all()})

@login_required(login_url="/login")
@csrf_protect
@api_view(['GET'])
def settings_list(request):
    return Response(Settings.getDict())

@common_decorators(['GET'])
def CarparksView(request):
    if (request.method == 'GET'):
        return render(request, 'carparks.html', {'carparks': CarPark.objects.values('id', 'name', 'description')})

@common_decorators(['GET'])
def CarparkAdd(request):
    if (request.method == 'GET'):
        return render(request, 'carpark.html', {'carpark': CarPark(), 'add_bays': False})

@common_decorators(['GET'])
def CarparkEdit(request, pk):
    if (request.method == 'GET'):
        carpark = CarPark.objects.values('id', 'name', 'description', 'google_maps_link').get(pk=pk)
        carbays = CarBay.objects.values('id', 'bay_number', 'description').filter(carpark=pk)
        add_url = f"/admin/carparks/{carpark['id']}/bay/add"
        carbay_redirect = f"/admin/carparks/view/{carpark['id']}"
        data = {
            'carpark': carpark,
            'carbays': carbays,
            'add_url': add_url,
            'id': carpark['id'],
            'carbay_redirect': carbay_redirect,
            'add_bays': True
        }
        return render(request, 'carpark.html', data)

@common_decorators(['GET'])
def UsersView(request):
    if (request.method == 'GET'):
        return render(request, 'users.html', {'users': User.objects.values('id', 'username'),
                                              'current_user_id': request.user.id})

@common_decorators(['GET'])
def UsersAdd(request):
    if (request.method == 'GET'):
        return render(request, 'new_user.html', {'user': User(), 'current_user_id': request.user.id})

@common_decorators(['GET'])
def UsersEdit(request, pk):
    if (request.method == 'GET'):
        data = {
            'user': User.objects.values('id', 'username', 'email', 'phone', 'is_staff', 'hub').get(pk=pk),
            'current_user_id': request.user.id
        }
        return render(request, 'user.html', data)

@common_decorators(['GET'])
def BayAdd(request, pk):
    if (request.method == 'GET'):
        back_url = f"/admin/carparks/view/{pk}"
        form_config = f"bay_number:number:Bay Number|description:textarea|carpark:hidden:{pk}"
        return render(request, 'bay.html', {'bay': CarBay(), 'back_url': back_url, 'form': form_config})

@common_decorators(['GET'])
def BayEdit(request, pk, pk2):
    if (request.method == 'GET'):
        data = {
            'back_url': f"/admin/carparks/view/{pk}",
            'form': f"bay_number:number:Bay Number|description:textarea|carpark:hidden:{pk}",
            'bay': CarBay.objects.values('id', 'bay_number', 'description').get(pk=pk2)
        }
        return render(request, 'bay.html', data)

@common_decorators(['GET'])
def BookingsView(request):
    if (request.method == 'GET'):
        bookings = Bookings.objects.values('id', 'date', 'email').all()
        return render(request, 'bookings.html', {'bookings': bookings})

@common_decorators(['GET'])
def BookingView(request, pk):
    if (request.method == 'GET'):
        booking = Bookings.objects.values('id', 'carpark', 'date', 'name', 'email',
                                          'rego', 'company', 'phone', 'user').get(pk=pk)
        bays = BaysBooked.objects.filter(booking__id=pk)
        user = User.objects.values('id', 'username', 'hub', 'email').get(pk=booking['user'])
        carpark = CarPark.objects.values('id', 'name', 'description').get(pk=booking['carpark'])
        return render(request, 'booking.html', {'booking': booking, 'bays': bays, 'user': user, 'carpark': carpark})

@login_required(login_url="/admin/login")
def BookingPDF(request, pk):
    if (request.method == 'GET'):
        booking = Bookings.objects.get(pk=pk)
        # Todo fix pdf static url
        url = settings.LIVE_URL if settings.IS_PROD else 'http://localhost:8000'
        bays = BaysBooked.objects.filter(booking__id=pk)
        return renderPDF('bookingPDF.html', {'booking': booking, 'url': url, 'bays': bays})
