/* jshint indent: 2 */
let moment = require('moment');
let dateFormat = require('../utils/DateFormat');
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
    courseDate: {
      type: DATE,
      allowNull: false,
      get() {
          return moment(this.getDataValue('courseDate')).format('YYYY-MM-DD');
      }
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
    app.model.CourseChoose.hasOne(app.model.Course,{sourceKey:'courseAId',foreignKey: 'Id',as:'courseA'});
    app.model.CourseChoose.hasOne(app.model.Course,{sourceKey:'courseBId',foreignKey: 'Id',as:'courseB'});
    app.model.CourseChoose.hasOne(app.model.User,{sourceKey:'teacherId',foreignKey: 'Id', as:'teacher'});
    app.model.CourseChoose.hasOne(app.model.Xclass,{sourceKey:'xclassId',foreignKey: 'Id', as:'xclass'});
  };

  CourseChoose.listCourseChoose = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      include:[
        {
          model:app.model.Course,as:'courseA'
        },
        {
          model:app.model.Course,as:'courseB'
        },
        {
          model:app.model.Xclass,as:'xclass'
        },
        {
          model:app.model.User,as:'teacher'
        },
      ]
    });
  }

  CourseChoose.listCourseByDate = async function ({ shopId = 0, courseDate = '2019-01-07' }) {
    let startTime = new Date(courseDate);
    let endTempTime = startTime.setDate(startTime.getDate() + 7);
    let endTime = new Date(endTempTime);

    return this.findAll({
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{
        shopId:shopId,
        courseDate:{
          [app.Sequelize.Op.between]: [courseDate, endTime.toLocaleDateString()],
        }
      },
      include:[
        {
          model:app.model.Course,as:'courseA'
        },
        {
          model:app.model.Course,as:'courseB'
        },
        {
          model:app.model.Xclass,as:'xclass'
        },
        {
          model:app.model.User,as:'teacher'
        },
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

  CourseChoose.createCourseChoose = async function (courseChoose,transaction) {
    return this.create(courseChoose,{
      transaction:transaction
    });
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

  CourseChoose.deleteCourseChoose = async function (courseDate, shopId, transaction) {
    let startTime = new Date(courseDate);
    let endTempTime = startTime.setDate(startTime.getDate() + 7);
    let endTime = new Date(endTempTime);

    return this.destroy({
      transaction:transaction,
      where:{
        shopId:shopId,
        courseDate:{
          [app.Sequelize.Op.between]: [courseDate, endTime.toLocaleDateString()],
        }
      },
    });
  }

  CourseChoose.getCourseDataByTeacherId = async function(teacherId){
    let date = new Date();
    let formatDate = dateFormat.dateFormat("YYYY-mm-dd", date);
    
    return this.findAll({
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{
        teacherId:teacherId,
        courseDate:formatDate
      },
      include:[
        {
          model:app.model.Course,as:'courseA'
        },
        {
          model:app.model.Course,as:'courseB'
        },
        {
          model:app.model.Xclass,as:'xclass'
        },
      ]
    });
  }

  return CourseChoose;
};
