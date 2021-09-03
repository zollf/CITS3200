from django import template

register = template.Library()

@register.inclusion_tag('table.html')
def create_table(title, data, headers):
    return {'title': title, 'headers': headers.split("|"), 'data': data}
