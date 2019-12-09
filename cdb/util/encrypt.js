const crypto = require('crypto')


module.exports=function(password,key='cdb'){
	const hmac = crypto.createHmac('sha256',key)
	hmac.update(password)
	return hmac.digest("hex")
}