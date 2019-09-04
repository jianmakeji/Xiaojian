'use strict'

const BaseController = require('../BaseController');

class CourseChooseController extends BaseController{

  async getCourseDataByTeacherId() {
    const ctx = this.ctx;
    const teacherId = ctx.helper.parseInt(ctx.query.teacherId);
    try{
      let result = await ctx.service.courseChoose.getCourseDataByTeacherId(teacherId);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

}

module.exports = CourseChooseController;
