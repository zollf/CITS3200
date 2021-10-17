from django.db import models

class Emails(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    payload = models.TextField()
    date = models.DateField()

    events = {
        'EmailTest': {
            'name': 'Test Email',
            'description': 'Testing email sends from system',
        },
        'EmailBooking': {
            'name': 'Booking Email',
            'description': 'Booking email has been sent from the system',
        },
        'EmailResendBooking': {
            'name': 'Resend Booking Email',
            'description': 'Resending booking email'
        }
    }

    class Meta:
        db_table = "admin_email_log"
