from app.parking.views import carparks_list, carpark_detail
from django.urls import path

parking_urls = [
    path('', carparks_list),
    path('<int:pk>', carpark_detail),
]
