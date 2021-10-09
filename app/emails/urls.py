from django.urls import path
from app.emails.views import email_test

email_urls = [
    path('test/', email_test)
]
