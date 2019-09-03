'use strict'

const BaseController = require('../BaseController');

class CourseChooseController extends BaseController{

  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    try{
      const result = await ctx.service.courseChoose.list(query);
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
      const result = await ctx.service.courseChoose.find(ctx.helper.parseInt(ctx.params.id));
      super.success(result);
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async createCourseChoose() {
    const ctx = this.ctx;
    try{
      let courseChooseArray = ctx.request.body;
      const result = await ctx.service.courseChoose.createCourseChoose(courseChooseArray);
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
    const updates = {

    };

    try{
      await ctx.service.courseChoose.update({ id, updates });
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
      await ctx.service.courseChoose.del(id);
      super.success(ctx.__('deletedSuccessful'));
    }
    catch(e){
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }

  async listCourseByDate() {
    const ctx = this.ctx;
    const query = {
      shopId: ctx.helper.parseInt(ctx.query.shopId),
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

  async updateCourseByDate() {
    const ctx = this.ctx;
    const ctx = this.ctx;
    try{
      let updateCourseChooseData = ctx.request.body;
      const result = await ctx.service.courseChoose.updateCourseByDate(updateCourseChooseData);
      super.success(ctx.__('createdSuccess'));

    }
    catch(e){
      console.log(e);
      ctx.logger.error(e.message);
      super.failure(e.message);
    }
  }
}

module.exports = CourseChooseController;
