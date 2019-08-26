/* jshint indent: 2 */

module.exports = app => {

  const { STRING, INTEGER, DATE } = app.Sequelize;

  const XclassStudent = app.model.define('xclassStudent', {
    Id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    xclassId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    studentId: {
      type: STRING(30),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'xclass_student'
  });

  XclassStudent.associate = function() {


  };

  XclassStudent.creteXclassStudent = async function(xclassId,studentId) {
    const xclassStudent = {
      xclassId:xclassId,
      studentId:studentId
    };
     return await this.create(xclassStudent);
  }

  XclassStudent.delXclassStudentByXclassId = async function(xclassId,transaction) {
    return await this.destroy({
      transaction:transaction,
      where:{
        xclassId:xclassId
      }
    });
  }

  XclassStudent.delXclassStudentByStudentId = async function(studentId) {
    return await this.destroy({
      where:{
        studentId:studentId
      }
    });
  }

  return XclassStudent;
};
