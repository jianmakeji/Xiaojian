const Service = require('egg').Service;

class XclassStudent extends Service {

  async creteXclassStudent(xclass) {
    return this.ctx.model.XclassStudent.creteXclassStudent(xclass);
  }

  async delXclassStudentByXclassId(xclassId) {
    return this.ctx.model.XclassStudent.delXclassStudentByXclassId(xclassId);
  }

  async delXclassStudentByStudentId(studentId) {
    const xclassStudent = await this.ctx.model.delXclassStudentByStudentId(studentId);
    return xclassStudent;
  }
}

module.exports = XclassStudent;
