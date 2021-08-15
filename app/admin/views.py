from django.shortcuts import render


def AdminView(request):
    return render(request, "admin.html")
