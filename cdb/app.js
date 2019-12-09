const Koa = require('koa2')
const static = require('koa-static')
const router = require('./routers/router')
const cors = require('@koa/cors')
const fs = require('fs')
const { join } = require("path")
const render = require('koa-ejs')
const body = require('koa-body')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')


//生成Koa实例
const app = new Koa

//配置body用于处理post请求
app.use(body())


//配置静态资源目录
app.use(static(join(__dirname,'static')))
app.use(bodyParser())

//配置视图目录
render(app,{
	root:join(__dirname,'views'),
	layout:'layout',
	viewExt:'ejs',
	cache:false,
	debug:false,
});

app.keys = ['cdb']
//session的配置对象
const CONFIG = {
	key:"cdb",
	maxAge:36e5,
	overwrite: true,
	httpOnly:true,
	signed:true,
	rolling:true,
}

//注册session
app.use(session(CONFIG,app))


//允许跨域请求
app.use(cors())
//注册路由信息
app
	.use(router.routes())
	.use(router.allowedMethods())
	.listen(80)