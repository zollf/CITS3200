from django import template

register = template.Library()

@register.filter
def hash(h, key):
    try:
      iter(h)
    except TypeError:
      return ''
    else:
      return h[key] if key in h else ''
    
