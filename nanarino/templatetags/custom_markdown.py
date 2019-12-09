import re
import markdown
from django import template
from django.template.defaultfilters import stringfilter
#from django.utils.encoding import force_text
from django.utils.safestring import mark_safe   #过滤器关闭html代码转义
from django.utils.html import conditional_escape  #html代码转义函数1

register = template.Library()  # 自定义filter时必须加上

def trans(html_code):
    script = html_code.group("tag")
    script = conditional_escape(script)
    return r'<code>' + script + r'</code>'

@register.filter(is_safe=True)  # 注册template filter
@stringfilter  # 希望字符串作为参数
def custom_markdown(value):
    html_code = markdown.markdown(value,extensions=['markdown.extensions.fenced_code', 'markdown.extensions.codehilite'],safe_mode=True,enable_attributes=False)
    # python不允许不定长的先行断言，如：
    # r'(?<!\<code\>(?!.*\<\/code\>).*?)\<.*?script.*?\>(?!(?!.*?\<code\>).*\<\/code\>)'
    html_code = re.sub(r'(?P<tag>\<\/?\s*script.*?\>)', trans, html_code, flags=re.IGNORECASE)
    html_code = re.sub(r'(?P<tag>\<\s*img.*?\>)', trans, html_code, flags=re.IGNORECASE)
    return mark_safe(html_code)