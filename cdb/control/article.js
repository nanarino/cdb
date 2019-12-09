const { db } = require('../schema/connect')
const articleSchema = require('../schema/article')

const article = db.model('articles',articleSchema)

exports.addArticle = async (ctx) => {
	await ctx.render("addArticle",{
		title:"这是发表页",
		session:ctx.session,
	},)
}

exports.add = async (ctx) => {
	if(ctx.session.isNew){
		await ctx.render("/isOK",{
			title:"这是通知页",
			status:"请登录之后再发表文章",
			session:undefined,
		})
	}else{
		const data = ctx.request.body
		data.author = ctx.session.username
		await new Promise((resolve,reject)=>{
			new article(data).save((err,data)=>{
				if(err)return reject(err)
				resolve(data)
			})
		})
		.then(async data=>{
			await ctx.render("/isOK",{
				title:"这是通知页",
				status:"发表成功",
				session:ctx.session,
			})
		})
		.catch(async data => {
			console.log(data)
			await ctx.render("/isOK",{
				title:"这是通知页",
				status:"出现未知的错误,请重试",
				session:ctx.session,
			})
		})
		
		
	}
}