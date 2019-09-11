'use strict'

const BaseController = require('../BaseController');

class CourseChooseController extends BaseController{

  async getCourseDataByTeacherId() {
    const ctx = this.ctx;
    const teacherId = ctx.user.Id;
    try{
      let result = await ctx.service.courseChoose.getCourseDataByTeacherId(teacherId);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async listCourseByDate() {
    const ctx = this.ctx;
    const query = {
      shopId: ctx.user.shopId,
      courseDate: ctx.query.courseDate,
    };
    try{
      let result = await ctx.service.courseChoose.listCourseByDate(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }
}

module.exports = CourseChooseController;
