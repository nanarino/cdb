from django.utils.deprecation import MiddlewareMixin
class Cors(MiddlewareMixin):
    def process_response(self, request, response):
        response['Access-Control-Allow-Origin'] = "*"
        if request.method == 'OPTIONS':  # 如果是复杂请求 进行预检
            # 允许你携带content-type请求头 适用于vue复杂请求 # 不能使用通配符
            response['Access-Control-Allow-Headers'] = 'Content-Type'
            # 允许你发送DELETE,PUT 等指定请求 适用于复杂请求
            response['Access-Control-Allow-Methods'] = 'DELETE,PUT'
        return response