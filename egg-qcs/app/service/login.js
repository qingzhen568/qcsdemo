const Service = require('egg').Service;
const jwt = require('jsonwebtoken')
//const svgCaptcha = require('svg-captcha')

module.exports = app=>{
	let mongo = app.mongo;
	return class LoginService extends Service {
  // 生成验证码
//genCaptcha() {
//  return svgCaptcha.create({
//    width: 85,
//    height: 38
//  })
//}
  // 检查验证码是否正确
  checkCaptcha(code) {
    const { ctx } = this
    code = code.toLowerCase()
    let sessCode = ctx.session.code ? ctx.session.code.toLowerCase() : null // 拿到之前存在session中的验证码
    // 进行验证
    if (code === sessCode) {
      // 成功后验证码作废
      ctx.session.code = null
    }
    return code === sessCode
  }
  // 登录操作
  async login(username) {
    const { ctx, app } = this
    let userData = await mongo.find('users',{query:{username}});
    
    // 找不到则 新增用户
    if (userData.length == 0) {
      	let doc = {
	  		username:username	
	  	}
		const data = await mongo.insertOne('users',{doc});
		
		if(data.result.n >0){
			userData = await mongo.find('users',{query:{username:username}});
		}else{
			return{
				code:1,
				msg:'fail'
			}
		}
			
   }
    // 找到则以用户id生成token
    const token = jwt.sign({
      id: userData[0]._id
    }, app.config.jwt.cert, {
      expiresIn: '10h' // token过期时间
    })
    return {
      user: userData[0],
      token: token
    }
  }
}


}

