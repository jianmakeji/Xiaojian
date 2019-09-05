'use strict';

const Controller = require('egg').Controller;

class TeacherController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async courseCheck(){
      const ctx = this.ctx;
      await ctx.render('teacher/courseCheck.html', {
        user : ctx.user
      });
  }
  async courseStudentList(){
      const ctx = this.ctx;
      await ctx.render('teacher/courseStudentList.html', {
        user : ctx.user
      });
  }
  async personalManage(){
      const ctx = this.ctx;
      await ctx.render('teacher/personalManage.html', {
        user : ctx.user
      });
  }
  async existUsers(){
      const ctx = this.ctx;
      await ctx.render('teacher/existUsers.html', {
        user : ctx.user
      });
  }
  async storeMonitor(){
      const ctx = this.ctx;
      await ctx.render('teacher/storeMonitor.html', {
        user : ctx.user
      });
  }
  async monitorDetail(){
      const ctx = this.ctx;
      await ctx.render('teacher/monitorDetail.html', {
        user : ctx.user
      });
  }
  async monitorHistory(){
      const ctx = this.ctx;
      await ctx.render('teacher/monitorHistory.html', {
        user : ctx.user
      });
  }
  async courseContentManage(){
      const ctx = this.ctx;
      await ctx.render('teacher/courseContentManage.html', {
        user : ctx.user
      });
  }
  async courseDetail(){
      const ctx = this.ctx;
      await ctx.render('teacher/courseDetail.html', {
        user : ctx.user
      });
  }

}

module.exports = TeacherController;
