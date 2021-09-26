from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
import xhtml2pdf.pisa as pisa
from django.contrib.staticfiles import finders
from django.conf import settings
import os

def composed(*decs):
    def deco(f):
        for dec in reversed(decs):
            f = dec(f)
        return f
    return deco

def common_decorators(methods: list):
    return composed(
        staff_member_required(login_url="/admin/staff_required"),
        login_required(login_url="/login"),
        csrf_protect,
        api_view(methods)
    )

def renderPDF(path: str, params: dict):
    template = get_template(path)
    html = template.render(params)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="report.pdf"'

    pdf = pisa.CreatePDF(html, dest=response)
    if not pdf.err:
        return HttpResponse(response.getvalue(), content_type='application/pdf')
    else:
        return HttpResponse("Error Rendering PDF", status=400)
