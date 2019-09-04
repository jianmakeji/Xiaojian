/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Course = app.model.define('course', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    courseName:{
      type: STRING(30),
      allowNull: true
    },
    courseAbstract: {
      type: STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    h5Address: {
      type: STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    courseThumbA: {
      type: STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    courseThumbB: {
      type: STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    courseType: {
      type: INTEGER,
      allowNull: true
    },
    courseSubType: {
      type: INTEGER,
      allowNull: true
    },
    createAt: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
          return moment(this.getDataValue('createAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    updateAt: {
      type: DATE,
      allowNull: true,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
          return moment(this.getDataValue('updateAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    tableName: 'course'
  });

  Course.associate = function() {

  };

  Course.listCourse = async function ({ offset = 0, limit = 10, courseSubType = 0 }) {
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{

      }
    };

    if (courseSubType > 0){
      condition.where.courseSubType = courseSubType;
    }

    return this.findAndCountAll(condition);
  }

  Course.listAllCourseByType = async function ({courseName="", courseType = "", courseSubType = 0 }) {
    let condition = {
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{

      }
    };

    if (courseName != null && courseName != ''){
      condition.where.courseName = {
        [app.Sequelize.Op.like]: '%'+courseName+'%',
      };
    }

    if (courseType != null && courseType != ''){
      let courseTypeArray = courseType.split(',');

      if (courseTypeArray.length > 0){
        condition.where.courseType =  {
          [app.Sequelize.Op.in]: courseTypeArray,
        };
      }
    }

    if (courseSubType > 0){
      condition.where.courseSubType = courseSubType;
    }

    return this.findAll(condition);
  }

  Course.findCourseById = async function (id) {
    const course = await this.findByPk(id);
    if (!course) {
      throw new Error('course not found');
    }
    return course;
  }

  Course.createCourse = async function (user) {
    return this.create(user);
  }

  Course.updateCourse = async function ({ id, updates }) {
    const course = await this.findByPk(id);
    if (!course) {
      throw new Error('user not found');
    }
    return course.update(updates);
  }

  Course.delCourseById = async function (id,transaction) {
    const course = await this.findByPk(id);
    if (!course) {
      throw new Error('user not found');
    }
    return course.destroy({
      transaction:transaction
    });
  }

  Course.listByCourseName = async function ({ offset = 0, limit = 10, courseName = '' }) {
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{

      }
    };

    if (courseName != null && courseName != ''){
      condition.where.courseName = {
        [app.Sequelize.Op.like]: '%'+courseName+'%',
      };
    }

    return this.findAndCountAll(condition);
  }

  return Course;
};
