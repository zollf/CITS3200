from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse
from django.shortcuts import redirect

from rest_framework.decorators import api_view
from rest_framework import status
from ..parking.models import Bookings

from .send import log_and_send_mail

@csrf_protect
@api_view(['POST'])
def email_test(request):
    if request.method == 'POST':
        if 'toEmail' not in request.data:
            return JsonResponse({
                'error': 'Please supply a toEmail to test with.'
            }, status=status.HTTP_400_BAD_REQUEST)
        success = log_and_send_mail(
            'Email Testing',
            [request.data['toEmail']],
            'EmailTest',
            'emails/test.html',
            {'toEmail': request.data['toEmail']}
        )
        if (success):
            if 'redirect' in request.data:
                return redirect(request.data['redirect'])
            return JsonResponse({'success': True}, status=status.HTTP_200_OK)

        if 'redirect' in request.data:
            return redirect(request.data['redirect'], {'error': 'Failed to send email'})
        return JsonResponse({'success': False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_protect
@api_view(['GET'])
def email_resend_booking(request, pk):
    if request.method == 'GET':
        try:
            booking = Bookings.objects.get(pk=pk)
        except Bookings.DoesNotExist:
            return JsonResponse({'error': 'Cannot find booking'}, status=status.HTTP_400_BAD_REQUEST)

        if log_and_send_mail(
            'Your UniPark Booking',
            [booking.email],
            'EmailResendBooking',
            'emails/booking.html',
            data={
                "name": booking.name,
                "email": booking.email,
            }
        ):
            return redirect(f"/admin/bookings/view/{pk}")
        else:
            return JsonResponse({
                'error': "internal server error"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
