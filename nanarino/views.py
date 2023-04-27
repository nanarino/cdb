from django.shortcuts import render  #,redirect,HttpResponse
from django.contrib import auth
#from django.contrib.auth.models import AbstractUser
#from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
# Create your views here.
from nanarino import models
from django.views.decorators.csrf import ensure_csrf_cookie
#from django.views.decorators.csrf import csrf_exempt
import os
import json
import time
from cdb.settings import BASE_DIR


def index(request):
    return render(request, "index.html")


def music(request):
    return render(request, "music.html")


def music_listen(request):
    if request.method == "GET":
        if request.user.is_authenticated():
            user_id = request.user.id
        else:
            user_id = 0  #匿名状态
        audio_id = int(request.GET.get("audioId"))
        return render(request, "music_listen.html", {
            "audioId": audio_id,
            "userId": user_id,
        })


def picture(request):
    album_list = models.Album.objects.all()
    return render(request, "picture.html", {"album_list": album_list})


def picture_watch(request):
    if request.method == "GET":
        if request.user.is_authenticated():
            user_id = request.user.id
        else:
            user_id = 0  #匿名状态
        album_id = request.GET.get("albumId")
        album = models.Album.objects.get(id=album_id)
        comment_list = models.Comment.objects.filter(album_id=album_id)
        return render(request, "picture_watch.html", {
            "album": album,
            "userId": user_id,
            "comment_list": comment_list
        })


def library(request):
    article_list = models.Article.objects.all()
    return render(request, "library.html", {"article_list": article_list})


def library_read(request):
    if request.method == "GET":
        if request.user.is_authenticated():
            user_id = request.user.id
        else:
            user_id = 0  #匿名状态
        article_id = request.GET.get("articleId")
        article = models.Article.objects.get(id=article_id)
        comment_list = models.Comment.objects.filter(article_id=article_id)
        return render(request, "library_read.html", {
            "article": article,
            "userId": user_id,
            "comment_list": comment_list
        })


@ensure_csrf_cookie
def add_comment(request):
    if request.method == "POST":
        if request.user.is_authenticated():
            article_id = request.POST.get("articleId")
            album_id = request.POST.get("albumId")
            user_id = request.user.id
            content = request.POST.get("comment")
            try:
                models.Comment.objects.create(article_id=article_id,
                                              album_id=album_id,
                                              content=content,
                                              writer_id=user_id)
            except:
                return JsonResponse({"msg": False})  # 迫害失败
            else:
                return JsonResponse({"msg": True})  # 评论成功
        return JsonResponse({"msg": "not_login"})  # 请先登录


def relaxation(request):
    return render(request, "relaxation.html")


@ensure_csrf_cookie
def relaxation_add_article(request):
    if request.method == "GET":
        return render(request, "relaxation_addArticle.html")
    if request.method == "POST":
        if request.user.is_authenticated():
            title = request.POST.get("title")
            content = request.POST.get("content")
            motif = request.POST.get("motif").strip()
            user_id = request.user.id
            try:
                models.Article.objects.create(title=title,
                                              content=content,
                                              motif=motif,
                                              writer_id=user_id)
            except:
                return JsonResponse({"msg": False})  # 发表失败
            else:
                return JsonResponse({"msg": True})  # 发表成功
        return JsonResponse({"msg": "not_login"})  # 请先登录


@ensure_csrf_cookie
def relaxation_add_album(request):
    if request.method == "GET":
        return render(request, "relaxation_addAlbum.html")
    if request.method == "POST":
        if request.user.is_authenticated():
            title = request.POST.get("title")
            user_id = request.user.id
            motif = request.POST.get("motif").strip()
            length = request.POST.get("length")
            if request.FILES.get("file0") is None:
                return JsonResponse({"msg": False})  #上传失败 无文件
            if int(length) < 1 or int(length) > 9:
                return JsonResponse({"msg": 'error'})  #上传失败 文件个数不匹配
            try:
                imgurl_list = []
                for i in range(int(length)):
                    file_obj = request.FILES.get('file' + str(i))
                    #给图片拼接静态目录路径，并去掉图片文件名中可能含有的百分号。
                    imgurl = os.path.join(
                        'static', 'picture', 'img',
                        str(int(time.time() + i)) +
                        file_obj.name.replace("%", ""))
                    imgurl_list.append(imgurl)
                    f = open(os.path.join(BASE_DIR, imgurl), 'wb')
                    for chunk in file_obj.chunks():
                        f.write(chunk)
                    f.close()
            except:
                return JsonResponse({"msg": "error"})  #储存失败，(一个chunk：2.5M)
            else:
                imgurl_list_json = json.dumps(imgurl_list)
                models.Album.objects.create(title=title,
                                            imgurl=imgurl_list_json,
                                            imglen=length,
                                            motif=motif,
                                            publisher_id=user_id)
                return JsonResponse({"msg": True})  #发表成功
        return JsonResponse({"msg": "not_login"})  # 请先登录


@ensure_csrf_cookie
def relaxation_own_space(request):
    if request.method == "GET":
        if request.user.is_authenticated():
            user_id = request.user.id
        else:
            user_id = 0  #匿名状态
        uid = int(request.GET.get("userId"))
        user_info = models.UserInfo.objects.get(id=uid)
        user = dict()
        user['is_self'] = bool(uid == user_id)  #是否是自己的信息
        user['uid'] = uid  #UID
        user['username'] = user_info.username  #用户名
        user['date_joined'] = user_info.date_joined  #注册时间
        user['last_login'] = user_info.last_login  #最后一次登录时间
        user['qq'] = user_info.qq  #QQ号码
        return render(request, "relaxation_ownSpace.html", user)
    if request.method == "POST":
        if request.user.is_authenticated():
            new_username = request.POST.get("username").strip()
            new_qq = request.POST.get("qq").strip()
            if new_username != request.user.username:  #用户名被修改
                if models.UserInfo.objects.filter(
                        username=new_username):  #新用户名被占用
                    return JsonResponse({"msg": False})
                else:  #未被占用
                    request.user.username = new_username  #修改用户名
            if not new_qq:  #qq不为空
                request.user.qq = new_qq  #修改qq字段
            request.user.save()
            return JsonResponse({"msg": True})
        return JsonResponse({"msg": "not_login"})  # 请先登录


def staff(request):
    return render(request, "staff.html")


def staff_reward(request):
    return render(request, "staff_reward.html")


def staff_update(request):
    return render(request, "staff_update.html")


def staff_introduction(request):
    return render(request, "staff_introduction.html")


@ensure_csrf_cookie
def user_login(request):
    if request.method == "GET":
        return render(request, "user_login.html")
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = auth.authenticate(username=username, password=password)
        if user:
            auth.login(request, user)
            return JsonResponse({"msg": True})  #登录成功
        return JsonResponse({"msg": False})  #登录失败


def user_logout(request):
    if request.user.is_authenticated():
        auth.logout(request)
        return JsonResponse({"msg": True})  #注销成功


@ensure_csrf_cookie
def user_register(request):
    if request.method == "GET":
        return render(request, "user_register.html")
    if request.method == "POST":
        username = request.POST.get("username").strip()
        if not models.UserInfo.objects.filter(username=username):
            password = request.POST.get("password").strip()
            try:
                user = models.UserInfo.objects.create_user(username=username,
                                                           password=password)
                auth.login(request, user)
            except:
                return JsonResponse({"msg": "error"})  # 密码不合要求
            else:
                return JsonResponse({"msg": True})  # 注册成功
        return JsonResponse({"msg": False})  # 注册失败 用户名已经被占用


def user_is_login(request):
    if request.method == "GET":
        if request.user.is_authenticated():
            return JsonResponse({"msg": request.user.id})  #已登录 返回uid
        else:
            return JsonResponse({"msg": False})  #未登录 前端进行Number(msg)来分配头像


def search(request):
    if request.method == "GET":
        wd = request.GET.get("wd")
        return render(request, "jigsaw.html", {"wd": wd})
