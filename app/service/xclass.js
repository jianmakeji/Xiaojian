const Service = require('egg').Service;

class XClass extends Service {

  async list({
    offset = 0,
    limit = 10
  }) {
    return this.ctx.model.XClass.listXClass({
      offset,
      limit
    });
  }

  async find(id) {
    const user = await this.ctx.model.XClass.findXClassById(id);

    return user;
  }

  async createXClass(xclass) {
    return this.ctx.model.XClass.createXClass(xclass);
  }

  async update({
    id,
    updates
  }) {
    return this.ctx.model.XClass.updateXClass({
      id,
      updates
    });
  }

  async del(id) {
    return this.ctx.model.XClass.delXClassById(id);

  }
}

module.exports = XClass;
