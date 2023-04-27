from django import template
register = template.Library()  # 自定义filter时必须加上

@register.filter
def to_int(value):              #转化为整数
    return int(value)

@register.filter
def rema(value,arg):            #求余
    return value%arg
