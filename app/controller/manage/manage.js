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
  async courseManage(){
      const ctx = this.ctx;
      await ctx.render('manage/courseManage.html', {
        user : ctx.user
      });
  }
  async personalManage(){
      const ctx = this.ctx;
      await ctx.render('manage/personalManage.html', {
        user : ctx.user
      });
  }
  async editStoreUser(){
      const ctx = this.ctx;
      await ctx.render('manage/editStoreUser.html', {
        user : ctx.user
      });
  }
  async userRecord(){
      const ctx = this.ctx;
      await ctx.render('manage/userRecord.html', {
        user : ctx.user
      });
  }
}

module.exports = ManageController;
