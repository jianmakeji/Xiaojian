'use strict'

const BaseController = require('../BaseController');

class CourseController extends BaseController{

  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      courseSubType:ctx.helper.parseInt(ctx.query.courseSubType),
    };

    try{
      const result = await ctx.service.course.list(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async show() {
    const ctx = this.ctx;
    try{
      const result = await ctx.service.course.find(ctx.helper.parseInt(ctx.params.id));
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async createCourse() {
    const ctx = this.ctx;
    try{
      let data = ctx.request.body;

        const user = await ctx.service.course.createCourse(data);
        super.success(ctx.__('createdSuccess'));

    }
    catch(e){
      console.log(e);
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = ctx.request.body;

    try{
      await ctx.service.course.update({ id, updates });
      super.success(ctx.__('updateSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);

    try{
      await ctx.service.course.del(id);
      super.success(ctx.__('deletedSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async searchByCourseName() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      courseName:ctx.query.courseName,
    };

    try{
      const result = await ctx.service.course.listByCourseName(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async listAllCourseByType() {
    const ctx = this.ctx;
    const query = {
      courseName:ctx.query.courseName,
      courseType: ctx.query.courseType,
      courseSubType: ctx.helper.parseInt(ctx.query.courseSubType)
    };

    try{
      const result = await ctx.service.course.listAllCourseByType(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async listCourseByCourseSubType() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      courseName:ctx.query.courseName,
      courseSubType:ctx.helper.parseInt(ctx.query.courseSubType),
    };

    try{
      const result = await ctx.service.course.listCourseByCourseSubType(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async listCourseByCourseType() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      courseType: ctx.helper.parseInt(ctx.query.courseType)
    };

    try{
      const result = await ctx.service.course.listCourseByCourseType(query);
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }
}

module.exports = CourseController;
