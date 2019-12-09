from django.shortcuts import render#,redirect,HttpResponse
from django.contrib import auth
#from django.contrib.auth.models import AbstractUser
#from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
# Create your views here.
from nanarino import models
from django.views.decorators.csrf import ensure_csrf_cookie



def index(request):
    return render(request,"index.html")


def music(request):
    return render(request,"music.html")


def picture(request):
    return render(request,"picture.html")


def library(request):
    article_list = models.Article.objects.all()
    return render(request,"library.html",{"article_list":article_list})
def library_read(request):
    if request.method == "GET":
        article_id = request.GET.get("articleId")
        article=models.Article.objects.get(id=article_id)
        return render(request, "library_read.html", {"article":article})


def relaxation(request):
    return render(request,"relaxation.html")
@ensure_csrf_cookie
def relaxation_add_article(request):
    if request.method == "GET":
        user_id=request.user.id
        return render(request, "relaxation_addArticle.html", {"userId":user_id})
    if request.method == "POST":
        title=request.POST.get("title")
        content=request.POST.get("content")
        motif = request.POST.get("motif")
        user_id = request.POST.get("userId")
        models.Article.objects.create(title=title,content=content,motif=motif,writer_id=user_id)
        return JsonResponse({"msg": True})  # 发表成功

def staff(request):
    return render(request,"staff.html")
def staff_reward(request):
    return render(request, "staff_reward.html")
def staff_join(request):
    return render(request, "staff_join.html")
def staff_update(request):
    return render(request, "staff_update.html")



@ensure_csrf_cookie
def user_login(request):
    if request.method == "GET":
        return render(request, "user_login.html")
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = auth.authenticate(username=username,password=password)
        if user:
            auth.login(request,user)
            return JsonResponse({"msg":True})#登录成功
        return JsonResponse({"msg":False})#登录失败
def user_logout(request):
    if request.user.is_authenticated():
        auth.logout(request)
        return JsonResponse({"msg": True})  #注销成功
@ensure_csrf_cookie
def user_register(request):
    if request.method == "GET":
        return render(request, "user_register.html")
    if request.method == "POST":
        username=request.POST.get("username")
        if not models.UserInfo.objects.filter(username=username):
            password=request.POST.get("password")
            user = models.UserInfo.objects.create_user(username=username,password=password)
            auth.login(request, user)
            return JsonResponse({"msg": True})  # 注册成功
        return JsonResponse({"msg": False})  # 注册失败
def user_is_login(request):
    if request.method == "GET":
        if request.is_ajax():
            if request.user.is_authenticated():
                return JsonResponse({"msg": True})    #已登录
            else:
                return JsonResponse({"msg": False})  #未登录


def search(request):
    if request.method == "GET":
        wd=request.GET.get("wd")
        return render(request, "jigsaw.html", {"wd": wd})

