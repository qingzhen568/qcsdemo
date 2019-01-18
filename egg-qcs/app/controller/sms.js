'use strict';

const Controller = require('egg').Controller;

module.exports = app=>{
	let store = app.getStore();
	let mongo = app.mongo;
	return class SmsController extends Controller {
		//增加验证码code，逻辑：在登录页点击验证码调用该api，生成4位随机数验证码及时间戳，并保存到sms数据库，
		//入参：phone即你在验证码上一个input框中输入的电话号码
		//出参：code=1为有错误，code=0表示成功
		async addSms() {
		  	let ctx = this.ctx;
		  	let app = this.app;
		  	let smsCode = parseInt(Math.random()*(10000-1000+1)+1000,10);
		  	//this.ctx.body = '获取验证码页'+smsCode; 
		  	const params = {
		  		...ctx.request.body,
		  		...ctx.query
		  	}
		  	let createTime =  new Date().getTime();
		  	let phone = params.phone.trim();
		  	let re = /^1\d{10}$/;
		  	let reg = /\S/;
		  	if(phone === '' || !reg.test(phone)){
		  		ctx.body={
		  			code:1,
		  			msg:'电话号码不能为空'
		  		}
		  	}else if(!re.test(phone)){
		  		ctx.body={
		  			code:1,
		  			msg:'电话号码格式错误'
		  		}
		  	}else{
		  		//生成四位的随机数
			  	//判断数据库中是否存在该电话号码，如果存在即为修改操作，如果没有则为新增操作
			  	let del = {
			  		phone:phone
			  	};
			  	let resultSet = await mongo.findOneAndDelete('sms',{filter:del});
			  	let doc = {
			  		phone,
			  		smsCode:smsCode,
			  		createTime:createTime
			  	}
			  	//新添加验证码
			  	const data = await mongo.insertOne('sms',{doc});
				if(data.result.n >0){
					ctx.body={
						code:0,
						createTime:createTime,
						success:'验证码已经发送到尾号为'+phone.substr(-4)+'的手机上，请注意查收'
					}
				}else{
					ctx.body={
						code:1,
						msg:'创建验证码失败'
					}
				}
		  	}
		  	
			
	  	}
		
		//查询验证码
		//需要判断两点：一点，该电话号码是否存在；再一点，该电话号码的smsCode是否过期--过期时间为60s
		async querySms() {
		  	let ctx = this.ctx;
		  	let app = this.app;
		  	let smsCode = parseInt(Math.random()*(10000-1000+1)+1000,10);
		  	this.ctx.body = '获取验证码页'+smsCode; 
		  	const params = {
		  		...ctx.request.body,
		  		...ctx.query
		  	}
		  	let phone = params.phone.trim();
		  	let re = /^1\d{10}$/;
		  	let reg = /\S/;
		  	if(phone === '' || !reg.test(phone)){
		  		ctx.body={
		  			code:1,
		  			msg:'电话号码不能为空'
		  		}
		  	}else if(!re.test(phone)){
		  		ctx.body={
		  			code:1,
		  			msg:'电话号码格式错误'
		  		}
		  	}else{
		  		//生成四位的随机数
			  	//判断数据库中是否存在该电话号码，
			  	const result = await mongo.find('sms',{query:{phone:phone}});
			  	if(result.length>0){
			  		//查询是否过期
			  		let overTime= parseInt((new Date().getTime() - result[0].createTime)/1000);
			  		
			  		if(overTime < 60){
			  			ctx.body = {
				  			code:0,
				  			success:result[0]
			  			}
			  		}else{
			  			ctx.body = {
				  			code:1,
				  			msg:'您的验证码已经过期'
				  		}
			  		}
			  	}else{
			  		ctx.body = {
			  			code:1,
			  			msg:'该电话号码还没有申请过验证码'
			  		}
			  	}
		  	}
	  	}
	}
}
