# cdb

这是 茶道部项目源码

采用古老的django后端模板渲染，前端使用jQuery



## 展示

这是上线很久的一个版本 但后面没续服务器了



## 测试

### 环境

- Python3.6.8
- MySQL5.7

如果是Python3.7也可以运行，但是，django1.11（至少1.11.0会报错）源码会有一个地方错误

（报错的解决办法是：多出一个逗号需要去掉，用pycharm的debug功能会很明显，

![报错](https://raw.githubusercontent.com/nanarino/cdb/v-2019.3/static/picture/img/%E6%8A%A5%E9%94%99.jpg)

也可以升级django为1.11.x+以后，具体是多少不清楚，

但是为了以后使用drf，请安装1.11.6以上，后来我装的是1.11.20）



### 目录结构

```bash
/nanarino/cdb #CentOS绝对路径
│             #(/)项目根目录
│
├── manage.py           #main
│
├── cdb
│   │
│   ├── __init__.py
│   │
│   ├── settings.py     #设置
│   │
│   └── url.py          #路由表
│
├── nanarino
│   │
│   ├── __init__.py
│   │
│   ├── models.py       #数据表
│   │
│   └── views.py        #视图
│
├── templates           #模板组件目录
│   │
│   ├── layout.html
│   │
│   └── header.html
│
├── static              #静态资源目录
│   │
│   ├── img
│   │
│   └── css
│
└── requirements.txt    #依赖的模块，可能有多余
```



### 安装依赖

```bash
pip3 install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```



### 修改配置

```python
#cdb/settings.py 

#第28行
ALLOWED_HOSTS = ["127.0.0.1","www.akokono.com"]  #改成你的域名，
#此时只会放行"www.akokono.com"，而"akokono.com"将会是500或者其他项目的页面。


#第92行
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        "HOST":"127.0.0.1",
        "PORT":3306,
        'NAME':"cdbproject", #改成你的项目库名
        "USER":"root",
        "PASSWORD":"****" #改成你的mysql密码
    }
}

```



### 创建数据库

```bash
CREATE DATABASE cdbproject DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
```



### 迁移数据库

```bash
python3 manage.py makemigrations   
python3 manage.py migrate   
```

**migration冲突问题**

如果这里出错，请删除`nanarino/migrations`目录里除了`__init__.py`以外的文件后重试。



### 生成超级管理员

```bash
python3 manage.py createsuperuser
```



### 启动服务

```bash
python3 manage.py runserver 0.0.0.0:80
```



## 生产

采用业界标准的`uwsgi` + `nginx`方式来部署。

其中nginx和uwsgi的配置文件在`manage.py`同级目录中。

默认安装的python，admin的静态资源一般在

`C:\Users\Administrator\AppData\Local\Programs\Python\Python37\Lib\site-packages\django\contrib\admin\static\admin`目录中，

将其拷贝到项目的static目录，以便被nginx访问。

宝塔安装的nginx的配置目录一般是`/www/server/nginx/conf/`

修改配置：

```python
#cdb/settings.py 第26行
DEBUG = False
```

测试启动：

```bash
uwsgi --ini dev_uwsgi.ini 
```

以守护进程的方式启动服务：

```bash
uwsgi --ini uwsgi.ini 
```

停止服务：

```bash
killall -9 uwsgi
```



### SSL

https://help.aliyun.com/knowledge_detail/95491.html
