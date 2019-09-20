const Service = require('egg').Service;

class Course extends Service {

  async list({
    offset = 0,
    limit = 10,
    courseSubType = 0,
  }) {
    return await this.ctx.model.Course.listCourse({
      offset,
      limit,
      courseSubType
    });
  }

  async listCourseByCourseType({
    offset = 0,
    limit = 10,
    courseType = 0,
  }){
    return await this.ctx.model.Course.listCourseByCourseType({
      offset,
      limit,
      courseType
    });
  }

  async find(id) {
    const user = await this.ctx.model.Course.findCourseById(id);

    return user;
  }

  async createCourse(course) {
    return await this.ctx.model.Course.createCourse(course);
  }

  async update({
    id,
    updates
  }) {
    return await this.ctx.model.Course.updateCourse({
      id,
      updates
    });
  }

  async del(id) {
    return await this.ctx.model.Course.delCourseById(id);

  }

  async listByCourseName({
    offset = 0,
    limit = 10,
    courseName = '',
  }) {
    return await this.ctx.model.Course.listByCourseName({
      offset,
      limit,
      courseName
    });
  }

  async listAllCourseByType({
    courseName = "",
    courseType = "",
    courseSubType = 0,
  }) {
    return await this.ctx.model.Course.listAllCourseByType({
      courseName,
      courseType,
      courseSubType,
    });
  }

  async listCourseByCourseSubType({
    offset = 0,
    limit = 10,
    courseName = "",
    courseSubType = 0,
  }) {
    return await this.ctx.model.Course.listCourseByCourseSubType({
      offset,
      limit,
      courseName,
      courseSubType,
    });
  }
}

module.exports = Course;
