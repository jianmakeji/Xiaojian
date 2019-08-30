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

  async createCourseChoose(courseChoose) {
    return this.ctx.model.CourseChoose.createCourseChoose(courseChoose);
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
}

module.exports = CourseChoose;
