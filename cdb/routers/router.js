const Router = require('koa-router')
const user = require('../control/user')
const article = require('../control/article')

const router = new Router

router.get('/index',user.keepLogin,async(ctx,next)=>{
	await ctx.render('index',{
		title:"这是首页",
		session:ctx.session,
	},)
})
router.get('/music',user.keepLogin,async(ctx,next)=>{
	await ctx.render('music',{
		title:"这是音乐区",
		session:ctx.session,
	})
})
router.get('/picture',user.keepLogin,async(ctx,next)=>{
	await ctx.render('picture',{
		title:"这是美图区",
		session:ctx.session,
	})
})
router.get('/library',user.keepLogin,async(ctx,next)=>{
	await ctx.render('library',{
		title:"这是资料区",
		session:ctx.session,
	})
})
router.get('/relaxation',user.keepLogin,async(ctx,next)=>{
	await ctx.render('relaxation',{
		title:"这是活动区",
		session:ctx.session,
	})
})
router.get('/staff',user.keepLogin,async(ctx,next)=>{
	await ctx.render('staff',{
		title:"这是讨饭区",
		session:ctx.session,
	})
})

router.get('/user/register',user.keepLogin,async(ctx,next)=>{
	await ctx.render('register',{
		title:"这是注册页",
		session:ctx.session,
	},)
})

router.get('/user/login',user.keepLogin,async(ctx,next)=>{
	await ctx.render('login',{
		title:"这是登录页",
		session:ctx.session,
	},)
})

router.post('/user/register',user.register)

router.post('/user/login',user.login)

router.get('/user/logout',user.logout)

router.get('/relaxation/addArticle',user.keepLogin,article.addArticle)

router.post('/relaxation/addArticle',user.keepLogin,article.add)


module.exports=router