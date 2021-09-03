from app.parking.views import carparks_list, carpark_detail, carpark_delete
from django.urls import path

parking_urls = [
    path('', carparks_list),
    path('<int:pk>', carpark_detail),
    path('delete/<int:pk>', carpark_delete),
]
