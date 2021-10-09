from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string

from .models import Emails
from datetime import date

def log_and_send_mail(subject: str, to_email: list, category: str, template: str, data={}):
    if category not in Emails.events:
        raise KeyError(f"{category} is not in Emails.events. Please add it in before sending emails.")
    html_body = render_to_string(template, data)
    msg = EmailMultiAlternatives(
        subject=subject,
        from_email=None,
        to=to_email,
    )
    msg.attach_alternative(html_body, "text/html")
    msg.send(fail_silently=False)

    # If msg.send does not fail then we log
    email = Emails(
        name=Emails.events[category]['name'],
        description=Emails.events[category]['description'],
        category=category,
        payload="",
        date=date.today(),
    )
    email.save()
    return True
