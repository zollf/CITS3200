from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Settings
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required

@login_required
def AdminView(request):
    return render(request, "admin.html")

@staff_member_required
@login_required
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