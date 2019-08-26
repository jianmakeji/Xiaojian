const Service = require('egg').Service;

class Student extends Service {

  async list({
    offset = 0,
    limit = 10
  }) {
    return this.ctx.model.Student.listStudent({
      offset,
      limit
    });
  }

  async find(id) {
    const user = await this.ctx.model.Student.findStudentById(id);

    return user;
  }

  async createStudent(course) {
    return this.ctx.model.Student.createStudent(course);
  }

  async update({
    id,
    updates
  }) {
    return this.ctx.model.Student.updateStudent({
      id,
      updates
    });
  }

  async del(id) {
    return this.ctx.model.Student.delStudentById(id);

  }
}

module.exports = Student;
