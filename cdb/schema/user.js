const { Schema } = require('./connect')

const UserSchema = new Schema({
	username:String,
	password:String
},{versionKey: false})

module.exports = UserSchema 
