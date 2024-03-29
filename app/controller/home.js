'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, dangdang';
  }

  async home(){
      const ctx = this.ctx;
      await ctx.render('home.html', {
        user : ctx.user
      });
  }

  async login(){
      const ctx = this.ctx;
      await ctx.render('login.html', {
        user : ctx.user
      });
  }

  async relogin(){
    const ctx = this.ctx;
    await ctx.render('login.html', {
      message:ctx.__('usernameOrPwdError')
    });
  }
  async logout(){
    const ctx = this.ctx;
    ctx.logout();
    await ctx.render('home.html');
  }
  async roleIndex(){
    const ctx = this.ctx;
    if(ctx.isAuthenticated()){
      if(ctx.user.roles && ctx.user.roles.length > 0){
        if (ctx.user.roles[0].rolename == 'manage'){
          ctx.redirect('/manage/courseManage');
        }
        else if (ctx.user.roles[0].rolename == 'teacher'){
          if (ctx.user.password == 2){
            //教师管理
            ctx.redirect('/teacher/courseCheck');
          }
          else{
            //教师上课
            ctx.redirect('/teacher/scheduleToday');
          }
        }
        else if (ctx.user.roles[0].rolename == 'supermanage'){
          ctx.redirect('/manage/courseManage');
        }
        else{
          ctx.redirect('/student');
        }
      }
      else{
        ctx.redirect('/login');
      }
    }
    else{
      ctx.redirect('/login');
    }

  }
}

module.exports = HomeController;
