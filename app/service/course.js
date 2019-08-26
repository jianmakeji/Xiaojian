const Service = require('egg').Service;

class Course extends Service {

  async list({
    offset = 0,
    limit = 10
  }) {
    return this.ctx.model.Course.listCourse({
      offset,
      limit
    });
  }

  async find(id) {
    const user = await this.ctx.model.Course.findCourseById(id);

    return user;
  }

  async createCourse(course) {
    return this.ctx.model.Course.createCourse(course);
  }

  async update({
    id,
    updates
  }) {
    return this.ctx.model.Course.updateCourse({
      id,
      updates
    });
  }

  async del(id) {
    return this.ctx.model.Course.delCourseById(id);

  }
}

module.exports = Course;
