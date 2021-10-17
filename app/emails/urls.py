from django.urls import path
from app.emails.views import email_test, email_resend_booking

email_urls = [
    path('test/', email_test),
    path('resend-booking/<int:pk>/', email_resend_booking)
]
