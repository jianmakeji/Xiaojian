'use strict';

const Controller = require('egg').Controller;

class ManageController extends Controller {

  async index(){
      const ctx = this.ctx;
      await ctx.render('manage/index.html', {
        user : ctx.user
      });
  }

  async login(){
      const ctx = this.ctx;
      await ctx.render('manage/login.html', {
        user : ctx.user
      });
  }
}

module.exports = ManageController;
