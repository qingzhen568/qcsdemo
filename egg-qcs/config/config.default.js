'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545103875174_9895';
	//跨域配置
	config.cors = {
		origin:'*',
		allowMethods:'GET,HEAD,PUT,POST,DELETE,PATCH'
	};
	//安全配置
	config.security = {
		csrf:false
	}
	
	config.mongo = {
		client:{
			host:'127.0.0.1',
			port:'27017',
			name:'ele',
			options:{
				useNewUrlParser:true
			}
		}
	}
	
	//token登录验证
	exports.jwt = {
		cert: 'helloword' // jwt秘钥
	};
	
  // add your config here
  config.middleware = [];
  
  

  return config;
};
