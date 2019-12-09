# cdb[v-2019.1]

这是 茶道部项目的Node最终版本的补全。

项目采用Koa2+MongoDB来作为后端。

使用ejs作为后端渲染的模板语法。

本版本实现了：

- 登录注册
- 文章发表

相比于初版：

- 基本UI界面仿某WordPress主题
- 表单UI界面仿MUI的登录页样式



## 启动

先启动MongoDB到27017端口

再启动服务：

```bash
#cmd app.js同级目录下：
node app.js
```

或者（若要部署，先用这个启动一次确保无报错）：

```bash
#cdb目录外层目录
node cdb
```



## 部署

使用pm2守护进程

全局安装安装pm2

```bash
npm install pm2 -g
```

启动

```bash
pm2 start cdb
```



## 记录

时间是2019年1月20日。

我太菜了。

下个版本将使用Python（django/flask）来重构。

数据库也将采用关系型数据库MySQL。

它更适合存储【用户】-【文章】-【评论】这种类型数据