from app.parking.open_views import carparks_list, carpark_detail, carbay_list, carbay_detail, carbays_list, bays_booked

from django.urls import path

open_api_urls = [
    path('carparks/', carparks_list),
    path('carparks/<int:pk>', carpark_detail),
    path('carparks/<int:pk>/bays', carbays_list),
    path('bay/', carbay_list),
    path('bays/<int:pk>', carbay_detail),
    path('bays-booked/', bays_booked),
]
