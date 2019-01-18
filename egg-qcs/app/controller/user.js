'use strict';

const Controller = require('egg').Controller;

module.exports = app=>{
	let store = app.getStore();
	let mongo = app.mongo;
	return class UserController extends Controller {
	  async success(){
	  
	  	this.ctx.body = this.ctx.state.user;
	  }
	  async login() {
	  	let ctx = this.ctx;
	  	let app = this.app;
	  	ctx.body = '登录页'; 
	  	const params = {
	  		...ctx.request.body,
	  		...ctx.query
	  	}
	  	
	  	const {phone,smsCode} = params;
	  	
	  	
	  	//先判断用户名和验证码是否存在，不存在直接将错误信息传前台
	  	if(!phone){
	  		ctx.body = {
	  			code:1,
	  			msg:'缺少电话号码'
	  		}
	  		return false;
	  	}
	  	if(!smsCode){
	  		ctx.body = {
	  			code:1,
	  			msg:'缺少验证码'
	  		}
	  		return false;
	  	}
	  	//数据库查询判断该用户名的验证码是否正确，是否已经过期，将错误信息传前台
	  	//判断数据库中是否存在该电话号码，
	  	const result = await mongo.find('sms',{query:{phone:phone}});
	  	if(result.length>0){
	  		//查询是否过期
	  		let overTime= parseInt((new Date().getTime() - result[0].createTime)/1000);
	  		if(result[0].smsCode !== parseInt(smsCode)){//验证码错误
	  			ctx.body = {
		  			code:1,
		  			msg:'您的验证码错误'
		  		}
	  			return false;
	  		}else if(overTime < 60){//验证码正确
	  			ctx.body = {
		  			code:0,
		  			msg:result[0]
	  			}
	  		}else{//验证码过期
	  			ctx.body = {
		  			code:1,
		  			msg:'您的验证码已经过期'
		  		}
	  			return false;
	  		}
	  	}else{//无该电话号码申请过验证码
	  		ctx.body = {
	  			code:1,
	  			msg:'该电话号码还没有申请过验证码'
	  		}
	  		return false;
	  	}
	  	
	  	//判断完验证码正确后，在用户表里查询该条用户信息是否存在，不存在，新增用户，存在修改该用户的登录时间
	  	//签发token
	  	//将token传给前台
	  	const userData = await ctx.service.login.login(phone )
	  	//如果找不到用户，需要新增用户数据
	  	ctx.body = {
	    	code:0,
	    	msg:'用户名登录成功',
	    	data:userData
	   }
	  }
	}
}
