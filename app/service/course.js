const Service = require('egg').Service;

class Course extends Service {

  async list({
    offset = 0,
    limit = 10,
    courseSubType = 0,
  }) {
    return this.ctx.model.Course.listCourse({
      offset,
      limit,
      courseSubType
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

  async listByCourseName({
    offset = 0,
    limit = 10,
    courseName = '',
  }) {
    return this.ctx.model.Course.listByCourseName({
      offset,
      limit,
      courseName
    });
  }

  async listAllCourseByType({
    courseType = 0,
    courseSubType = 0,
  }) {
    return this.ctx.model.Course.listAllCourseByType({
      courseType,
      courseSubType,
    });
  }
}

module.exports = Course;
