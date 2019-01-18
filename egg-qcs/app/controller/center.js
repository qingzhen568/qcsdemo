'use strict';

const Controller = require('egg').Controller;

class CenterController extends Controller {
  async index() {
  	//var result = await this.app.mongo.find('ele');
  	
  	
  	this.ctx.body = '用户中心页面'; 
    //this.ctx.body = 'hi, egg';
    //this.ctx.body
  }
}

module.exports = CenterController;
