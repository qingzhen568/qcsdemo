'use strict';

const Controller = require('egg').Controller;

class RenderController extends Controller {
  async index() {
  	//var result = await this.app.mongo.find('ele');
  	
  	
  	this.ctx.body = '：我是render页'; 
    //this.ctx.body = 'hi, egg';
    this.ctx.body
  }
}

module.exports = RenderController;
