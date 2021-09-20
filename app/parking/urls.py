from app.parking.views import carparks_list, carpark_detail, carbay_list, carbay_detail, carbays_list, bookings, bays_booked, booking
from django.urls import path

parking_urls = [
    path('carparks/', carparks_list),
    path('carparks/<int:pk>', carpark_detail),
    path('carparks/<int:pk>/bays', carbays_list),

    path('bay/', carbay_list),
    path('bays/<int:pk>', carbay_detail),

    path('bookings', bookings),
    path('bays-booked', bays_booked),
    path('bookings/<int:pk>', booking),
]
