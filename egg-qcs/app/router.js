'use strict';

/**
 * @param {Egg.Application} app - egg application
 */


module.exports = app => {
  const { router, controller } = app;
  // 后台授权中间件
  const auth = app.middleware.auth()
  // 首页
  router.get('/', controller.index.index);
  // 生成验证码
  router.get('/sms/addSms', controller.sms.addSms);
  //查询验证码
  router.get('/sms/querySms', controller.sms.querySms);
  // 登录
  //router.get('/user/login', controller.user.login);
  router.post('/user/login', controller.user.login);
  // 用户中心验证授权
  router.get('/center',  auth,controller.center.index);
  

};



//const routes = [
//	
//	{
//		path:'/index',
//		module:'index',
//		name:'index'
//	},
//	{
//		path:'/user/login',
//		module:'user',
//		name:'login'
//	},
//	{
//		path:'/sms/addSms',
//		module:'sms',
//		name:'addSms'
//	},
//	{
//		path:'/sms/querySms',
//		module:'sms',
//		name:'querySms'
//	}
//	
//
//];
//
//module.exports = app => {
//const { router, controller } = app;
//
//routes.forEach(item=>{
//	router.get(item.path, controller[item.module][item.name]);
//	router.post(item.path, controller[item.module][item.name]);
//})
//
//};


//module.exports = app => {
//app.get("/", app.jwt, "render.index"); // use old api app.jwt
//app.get("/user/login", "user.login");
//app.get("/user/success", "user.success");
//app.get("/sms/addSms", "sms.addSms"); // is setting in config.jwt.match   /sms/addSms    /sms/querySms
//app.get("/sms/querySms", "sms.querySms");
//
//};


