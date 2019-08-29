'use strict';

const Controller = require('egg').Controller;

class ManageController extends Controller {

  async index(){
      const ctx = this.ctx;
      await ctx.render('manage/index.html', {
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
  async existUsers(){
      const ctx = this.ctx;
      await ctx.render('manage/existUsers.html', {
        user : ctx.user
      });
  }
  async storeMonitor(){
      const ctx = this.ctx;
      await ctx.render('manage/storeMonitor.html', {
        user : ctx.user
      });
  }
  async monitorDetail(){
      const ctx = this.ctx;
      await ctx.render('manage/monitorDetail.html', {
        user : ctx.user
      });
  }
  async studentManage(){
      const ctx = this.ctx;
      await ctx.render('manage/studentManage.html', {
        user : ctx.user
      });
  }
  async courseContentManage(){
      const ctx = this.ctx;
      await ctx.render('manage/courseContentManage.html', {
        user : ctx.user
      });
  }
  async addCourse(){
      const ctx = this.ctx;
      let id = ctx.helper.parseInt(ctx.params.id)
      let course;
      if(id != 0){
        course = await ctx.service.course.find(id);
      }
      await ctx.render('manage/addCourse.html', {
        user : ctx.user,
        course: course,
      });
  }
}

module.exports = ManageController;
