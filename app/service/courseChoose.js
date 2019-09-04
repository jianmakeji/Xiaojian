const Service = require('egg').Service;

class CourseChoose extends Service {

  async list({
    offset = 0,
    limit = 10
  }) {
    return this.ctx.model.CourseChoose.listCourseChoose({
      offset,
      limit
    });
  }

  async find(id) {
    const user = await this.ctx.model.CourseChoose.findCourseById(id);

    return user;
  }

  async createCourseChoose(courseChooseArray) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      for(let courseChoose of courseChooseArray){
        await this.ctx.model.CourseChoose.createCourseChoose(courseChoose,transaction);
      }
      await transaction.commit();

      return true
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      return false
    }
  }

  async update({
    id,
    updates
  }) {
    return this.ctx.model.CourseChoose.updateCourseChoose({
      id,
      updates
    });
  }

  async del(id) {
    return this.ctx.model.CourseChoose.delCourseChooseById(id);

  }

  async listCourseByDate({
    shopId = 0,
    courseDate = '2019-01-07'
  }) {
    return this.ctx.model.CourseChoose.listCourseByDate({
      shopId,
      courseDate
    });
  }

  async updateCourseByDate(updateCourseByDate) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await this.ctx.model.CourseChoose.deleteCourseChoose(updateCourseByDate.courseDate, updateCourseByDate.shopId, transaction);
      for(let courseChoose of updateCourseByDate.data){
        await this.ctx.model.CourseChoose.createCourseChoose(courseChoose,transaction);
      }
      await transaction.commit();

      return true
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      return false
    }

  }

  async getCourseDataByTeacherId(teacherId){
    return this.ctx.model.CourseChoose.getCourseDataByTeacherId(teacherId);
  }
}

module.exports = CourseChoose;
