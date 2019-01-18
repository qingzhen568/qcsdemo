'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
  	this.ctx.body = '我的第一个页面：'; 
    //this.ctx.body = 'hi, egg';
    this.ctx.body
  }
}

module.exports = HomeController;
