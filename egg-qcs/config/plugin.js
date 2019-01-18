'use strict';

// had enabled by egg
// exports.static = true;
exports.cors = {
	enable:true,
	package:'egg-cors'
};

exports.security = {
	domainWhiteList:['http://localhost:8000','http://127.0.0.1:8000','http://127.0.0.1:8020','http://localhost:8020']
}

exports.mongo = {
	enable:true,
	package:'egg-mongo-native'
};
