from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

__all__ = ['Article', 'Album', 'Comment']


#ORM相关
class UserInfo(AbstractUser):
    qq = models.CharField(max_length=11)


class Article(models.Model):
    id = models.AutoField(primary_key=True)  #创建自增主键字段
    title = models.CharField(null=False, max_length=14,
                             default="无题")  #创建一个varchar类型的不可为空字段
    content = models.TextField(max_length=2000)
    motif = models.CharField(null=False, max_length=14, default="未分类")
    time = models.DateTimeField(auto_now_add=True, null=True)
    writer = models.ForeignKey(to="UserInfo", null=True)

    def __repr__(self):
        return "<{}-{}>".format(self.title, self.motif)


class Album(models.Model):
    id = models.AutoField(primary_key=True)  #创建自增主键字段
    title = models.CharField(null=False, max_length=14,
                             default="无题")  #创建一个varchar类型的不可为空字段
    imgurl = models.TextField(max_length=64)
    imglen = models.CharField(max_length=2)
    motif = models.CharField(null=False, max_length=14, default="未分类")
    time = models.DateTimeField(auto_now_add=True, null=True)
    publisher = models.ForeignKey(to="UserInfo", null=True)

    def __repr__(self):
        return "<{}-{}>".format(self.title, self.motif)


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    article = models.ForeignKey(to="Article", null=True)
    album = models.ForeignKey(to="Album", null=True)
    writer = models.ForeignKey(to="UserInfo", null=True)
    time = models.DateTimeField(auto_now_add=True, null=True)
    content = models.TextField(max_length=128)

    def __repr__(self):
        return "<{}>".format(self.content)