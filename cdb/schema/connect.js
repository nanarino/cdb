const mongoose = require('mongoose')
const db = mongoose.createConnection("mongodb://localhost:27017/project",{useNewUrlParser: true})
mongoose.Promise=global.Promise
const Schema = mongoose.Schema


db.on("error",()=>{
	console.log("数据库连接失败")
})
db.on("open",()=>{
	console.log("project 数据库连接成功")
})



module.exports = {
	db,
	Schema
}
