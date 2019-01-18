'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
  	//var result = await this.app.mongo.find('ele');
  	
  	
  	this.ctx.body = '：我的首页'; 
    //this.ctx.body = 'hi, egg';
    this.ctx.body
  }
}

module.exports = IndexController;
