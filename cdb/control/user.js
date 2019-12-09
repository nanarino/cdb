const { db } = require('../schema/connect')
const UserSchema = require('../schema/user')
const encrypt = require('../util/encrypt')
const User = db.model('users',UserSchema)

exports.register = async (ctx) => {
	const user = ctx.request.body
	//console.log(user)
	const username = user.username
	const password = user.password
	await new Promise((resolve,reject) => {
		User.find({username},(err,data)=>{
			if(err){
				reject(err)
			}else if(data.length!==0){
				resolve("")
			}else{
				const _user = new User({
					username,
					password:encrypt(password)
				})
				_user.save((err,data)=>{
					if(err){
						reject(err)
					}else{
						resolve(data)
					}
				})
			}
		})
	})
	.then(async data => {
		if(data){
			console.log(username+"注册成功")
			await ctx.render('/isOK',{
				title:"这是通知页",
				status:"注册成功",
				session:undefined,
			})
		}else{
			await ctx.render('/isOK',{
				title:"这是通知页",
				status:"用户名已存在,请重试",
				session:undefined,
			})
		}
	})
	.catch(async data => {
		console.log(data)
		await ctx.render("/isOK",{
			title:"这是通知页",
			status:"出现未知的错误,请重试",
			session:undefined,
		})
	})
}

exports.login = async(ctx) =>{
	const user = ctx.request.body
	//console.log(user)
	const username = user.username
	const password = user.password
	await new Promise((resolve,reject) => {
		User.find({username},(err,data) => {
			if(err){
				reject(err)
				console.log("未知错误")
			}else if(data.length ===0){
				resolve("")
				//console.log(username+"用户名不存在")
			}else if(data[0].password === encrypt(password)){
				resolve(data)
				//console.log(username+"密码正确")
			}else{
				resolve("")
				//console.log(username+"密码错误")
			}
		})
	})
	.then(async data => {
		if(!data){
			await ctx.render("/isOK",{
				title:"这是通知页",
				status:"用户名或密码错误,请重试",
				session:undefined,
			})
		}else{

			ctx.cookies.set("username",(new Buffer(username)).toString('base64'),{
				domain:"127.0.0.1",
				path:"/",
				maxAge:36e5,
				httpOnly:false,
				overwrite:false,
				signed:true,
			})

			ctx.cookies.set("UID",data[0]._id,{
				domain:"127.0.0.1",
				path:"/",
				maxAge:36e5,
				httpOnly:false,
				overwrite:false,
				signed:true,
			})
			
			ctx.session = {
				username,
				UID:data[0]._id
			}
			//console.log(username+"登录成功")
			await ctx.render('/isOK',{
				title:"这是通知页",
				status:"登录成功",
				session:undefined,
			})
		}		
	})
	.catch(async data => {
		//console.log(username+"出现未知的错误")
		console.log(data)
		await ctx.render("/isOK",{
			title:"这是通知页",
			status:"出现未知的错误,请重试",
			session:undefined,
		})
	})
}

exports.keepLogin = async(ctx,next) =>{
	if(ctx.session.isNew){
		if(ctx.cookies.get("UID")){
			ctx.session = {
				username : (new Buffer(ctx.cookies.get("username"), 'base64')).toString(),
				UID : ctx.cookies.get("UID")
			}
		}
	}
	await next()
}

exports.logout = async(ctx) =>{
	ctx.session = null
	ctx.cookies.set("username",null,{
		maxAge:0
	})
	ctx.cookies.set("UID",null,{
		maxAge:0
	})
	ctx.redirect("/index")
}









