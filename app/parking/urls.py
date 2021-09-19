from app.parking.views import carparks_list, carpark_detail, carbays_list, carbay_detail
from django.urls import path

parking_urls = [
    path('carparks/', carparks_list),
    path('carparks/<int:pk>', carpark_detail),
    path('carbays/', carbays_list),
    path('carbays/<int:pk>', carbay_detail),
]
