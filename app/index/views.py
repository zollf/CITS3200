from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def IndexView(request):
    return render(request, "index.html")

