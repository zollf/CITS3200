from django.shortcuts import render

def IndexView(request):
    return render(request, "index.html")
    
def AdminPanel(request):
    return render(request, "admin.html")
