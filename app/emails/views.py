from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse
from django.shortcuts import redirect

from rest_framework.decorators import api_view
from rest_framework import status

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
        return JsonResponse({'success': False}, status=status.HTTP_400_BAD_REQUEST)
