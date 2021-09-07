from django.contrib.auth import logout
from django.shortcuts import redirect

def LogoutView(request):
    logout(request)
    return redirect('/')
