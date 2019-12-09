"""cdb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from nanarino import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^index/$', views.index),
    url(r'^music/$', views.music),
    url(r'^picture/$', views.picture),
    url(r'^library/$', views.library),
    url(r'^library/read/$', views.library_read),
    url(r'^relaxation/$', views.relaxation),
    url(r'^relaxation/addArticle/$', views.relaxation_add_article),
    url(r'^staff/$', views.staff),
    url(r'^staff/reward/$', views.staff_reward),
    url(r'^staff/join/$', views.staff_join),
    url(r'^staff/update/$', views.staff_update),
    url(r'^user/login/$', views.user_login),
    url(r'^user/logout/$', views.user_logout),
    url(r'^user/register/$', views.user_register),
    url(r'^user/isLogin/$', views.user_is_login),
    url(r'^s/$', views.search),
]
