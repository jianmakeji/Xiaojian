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
  async courseStudentList(){
      const ctx = this.ctx;
      await ctx.render('manage/courseStudentList.html', {
        user : ctx.user
      });
  }
  async studentInfo(){
      const ctx = this.ctx;
      await ctx.render('manage/studentInfo.html', {
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
  async userClassHistory(){
      const ctx = this.ctx;
      await ctx.render('manage/userClassHistory.html', {
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
  async addStudent(){
      const ctx = this.ctx;
      await ctx.render('manage/addStudent.html', {
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

      await ctx.render('manage/addCourse.html', {
        user : ctx.user
      });
  }
}

module.exports = ManageController;
