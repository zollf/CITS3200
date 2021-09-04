from django import template

register = template.Library()

@register.inclusion_tag('table.html')
def create_table(title, data, headers):
    return {'title': title, 'headers': headers.split("|"), 'data': data}

@register.inclusion_tag('form.html')
def create_form(title, data, fields):
    print(data)
    fields = fields.split("|")
    fields_matrix = []
    for field in fields:
      field_arr = field.split(':')
      fields_matrix.append({
        'name': field_arr[0],
        'type': field_arr[1]
      })
    return {'title': title, 'fields': fields_matrix, 'data': data}
    
