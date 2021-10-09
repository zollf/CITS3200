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
    Usage: `{% create_form 'carparks' carpark 'name:text:Username|desc:text:Description' "/admin/carpark/add" %}`
    """
    fields = fields.split("|")
    fields_matrix = []
    for field in fields:
        field_arr = field.split(':')

        if "," in field_arr[1]:
            field_arr[1] = field_arr[1].split(',')
            print(field_arr[1])

        if field_arr[1] == 'hidden':
            fields_matrix.append({
                'name': field_arr[0],
                'type': field_arr[1] if isinstance(field_arr[1], str) else field_arr[1][0],
                'value': field_arr[2] if len(field_arr) >= 3 else '',
                'require': "True" if isinstance(field_arr[1], str) else "False"
            })
        else:
            fields_matrix.append({
                'name': field_arr[0],
                'type': field_arr[1] if isinstance(field_arr[1], str) else field_arr[1][0],
                'label': field_arr[2] if len(field_arr) >= 3 else field_arr[0],
                'require': "True" if isinstance(field_arr[1], str) else "False"
            })
    print(fields_matrix)
    return {'title': title, 'fields': fields_matrix, 'data': data, **kwargs}
