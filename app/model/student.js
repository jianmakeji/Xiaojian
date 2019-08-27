/* jshint indent: 2 */

module.exports = app => {

  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Student = app.model.define('student', {
    Id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shopId: {
      type: INTEGER(11),
      allowNull: false,
    },
    studentName: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '0',
    },
    age: {
      type: INTEGER(11),
      allowNull: true,
    },
    gender: {
      type: BOOLEAN,
      allowNull: true,
    },
    health: {
      type: BOOLEAN,
      allowNull: true,
    },
    interactiveCourse: {
      type: BOOLEAN,
      allowNull: true,
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
    tableName: 'student'
  });

  Student.associate = function() {
    app.model.Student.belongsToMany(app.model.Xclass, {
      through: {
        model: app.model.XclassStudent,
        unique: false,
        scope: {
          taggable: 'student'
        }
      },
      foreignKey: 'studentId',
      constraints: false
    });

  };

  Student.listStudent = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    });
  }

  Student.findStudentById = async function (Id) {
    const student = await this.findByPk(Id);
    if (!student) {
      throw new Error('student not found');
    }
    return student;
  }

  Student.createStudent = async function (student) {
    return this.create(student);
  }

  Student.updateStudent = async function ({ Id, updates }) {
    const student = await this.findByPk(id);
    if (!student) {
      throw new Error('student not found');
    }
    return this.update(updates);
  }

  Student.delStudentById = async function (id) {
    const student = await this.findByPk(id);
    if (!student) {
      throw new Error('student not found');
    }
    return this.destroy();
  }
  return Student;
};
