const { Schema } = require('./connect')

const articleSchema = new Schema({
	title:String,
	content:String,
	author:String,
},{
	versionKey: false,
	timestamps: {
		createdAt: "created",
	}
})

module.exports = articleSchema
