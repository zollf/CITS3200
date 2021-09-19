from django import template

register = template.Library()

@register.inclusion_tag('table.html')
def create_table(title: str, data: dict, headers: str, **kwargs):
    """
    Creates table given object and headers
    Usage: `{% create_table  'carparks' carpark 'name|description' %}`
    """
    return {'title': title, 'headers': headers.split("|"), 'data': data, **kwargs}

@register.inclusion_tag('form.html')
def create_form(title: str, data: dict, fields: str, **kwargs):
    """
    Creates form given object and fields
    Usage: `{% create_form 'carparks' carpark 'name:text|desc:text' %}`
    """
    fields = fields.split("|")
    fields_matrix = []
    for field in fields:
        field_arr = field.split(':')
        fields_matrix.append({
            'name': field_arr[0],
            'type': field_arr[1]
        })
    return {'title': title, 'fields': fields_matrix, 'data': data, **kwargs}
