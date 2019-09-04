'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
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

  async roleIndex(){
    const ctx = this.ctx;
    if(ctx.isAuthenticated()){
      if(ctx.user.roles && ctx.user.roles.length > 0){
        if (ctx.user.roles[0].rolename == 'manage'){
          ctx.redirect('/manage');
        }
        else if (ctx.user.roles[0].rolename == 'teacher'){
          if (ctx.user.password == 2){
            //教师管理
            ctx.redirect('/teacherManager');
          }
          else{
            //教师上课
            ctx.redirect('/teacherClass');
          }
        }
        else if (ctx.user.roles[0].rolename == 'supermanage'){
          ctx.redirect('/manage');
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
