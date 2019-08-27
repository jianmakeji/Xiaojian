/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { STRING, INTEGER, DATE } = app.Sequelize;

  const CourseChoose = app.model.define('courseChoose', {
    Id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shopId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    courseNumber: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    teacherId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    courseAId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    courseBId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    xclassId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
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
    tableName: 'course_choose'
  });

  CourseChoose.associate = function() {
    app.model.CourseChoose.hasOne(app.model.Course,{sourceKey:'courseAId',foreignKey: 'Id'});
    app.model.CourseChoose.hasOne(app.model.Course,{sourceKey:'courseBId',foreignKey: 'Id'});
    app.model.CourseChoose.hasOne(app.model.User,{sourceKey:'teacherId',foreignKey: 'Id'});
    app.model.CourseChoose.hasOne(app.model.Xclass,{sourceKey:'xclassId',foreignKey: 'Id'});


  };

  CourseChoose.listCourseChoose = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      include:[
        {model:app.model.Role,as:'role'},

      ]
    });
  }

  CourseChoose.findCourseChooseById = async function (id) {
    const user = await this.findById(id,{
      include:[
        app.model.Role
      ]
    });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  CourseChoose.createCourseChoose = async function (user) {
    return this.create(user);
  }

  CourseChoose.updateCourseChoose = async function ({ id, updates }) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('coursechoose not found');
    }
    return user.update(updates);
  }

  CourseChoose.delCourseChooseById = async function (id,transaction) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('coursechoose not found');
    }
    return user.destroy({
      transaction:transaction
    });
  }

  return CourseChoose;
};