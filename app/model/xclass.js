/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Xclass = app.model.define('xclass', {
    Id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    className: {
      type: STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    createAt: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
          return moment(this.getDataValue('createAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    tableName: 'xclass'
  });

  Xclass.associate = function() {
    app.model.Xclass.belongsToMany(app.model.Student, {
      through: {
        model: app.model.XclassStudent,
        unique: false
      },
      foreignKey: 'xclassId',
      constraints: false
    });

  };

  Xclass.listXclass = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    });
  }

  Xclass.findXclassById = async function (id) {
    const xclass = await this.findByPk(id);
    if (!xclass) {
      throw new Error('xclass not found');
    }
    return xclass;
  }

  Xclass.createXclass = async function (xclass) {
    return this.create(xclass);
  }

  Xclass.updateXclass = async function ({ id, updates }) {
    const xclass = await this.findByPk(id);
    if (!xclass) {
      throw new Error('xclass not found');
    }
    return xclass.update(updates);
  }

  Xclass.delXclassById = async function (id,transaction) {
    const xclass = await this.findByPk(id);
    if (!xclass) {
      throw new Error('xclass not found');
    }
    return xclass.destroy({
      transaction:transaction
    });
  }

  return Xclass;
};
