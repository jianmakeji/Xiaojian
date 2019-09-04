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

}

module.exports = TeacherController;
