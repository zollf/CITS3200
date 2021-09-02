from django.shortcuts import render, redirect
from .models import Settings
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required

@staff_member_required
@login_required
@api_view(['GET'])
def SettingsView(request):
    return render(request, 'settings.html', {'settings': Settings.objects.all()})

@api_view(['POST'])
@csrf_protect
def SettingsSave(request):
    for key in Settings.getKeys():
        setting = Settings.objects.get(key=key)
        setting.value = request.data[key]
        setting.save()
    return redirect('/admin/settings')
