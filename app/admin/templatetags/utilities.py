from django import template

register = template.Library()

@register.filter
def key(h: dict, k: str):
    """
    Gets value of key in dict within django template
    """
    try:
        iter(h)
    except TypeError:
        return ''
    else:
        return h[k] if k in h else ''
