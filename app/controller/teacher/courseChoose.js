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

}

module.exports = CourseChooseController;
