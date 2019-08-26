/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const {
    STRING,
    INTEGER,
    DATE,
    BOOLEAN
  } = app.Sequelize;

  const User = app.model.define('user', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING(30),
      allowNull: true
    },
    realname: {
      type: STRING(30),
      allowNull: true
    },
    password: {
      type: STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    shopId: {
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
    tableName: 'user'
  });

  User.associate = function() {
    app.model.User.hasOne(app.model.Shop, {
      sourceKey: 'shopId',
      foreignKey: 'Id'
    });

    app.model.User.belongsToMany(app.model.Role, {
      through: {
        model: app.model.UserRole,
        unique: false
      },
      foreignKey: 'userId',
      constraints: false
    });
  };

  User.listUsers = async function({
    offset = 0,
    limit = 10
  }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [
        ['createAt', 'desc'],
        ['Id', 'desc']
      ],
      include: [{
          model: app.model.Role,
          as: 'roles'
        },
        {
          model: app.model.Shop,
          as: 'shop'
        },
      ]
    });
  }

  User.findUserById = async function(id) {
    const user = await this.findByPk(id, {
      include: [{
          model: app.model.Role,
          as: 'roles'
        },
        {
          model: app.model.Shop,
          as: 'shop'
        },
      ]
    });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  User.createUser = async function(user) {
    return this.create(user);
  }

  User.updateUser = async function({
    id,
    updates
  }) {
    const user = await this.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    return user.update(updates);
  }

  User.delUserById = async function(id, transaction) {
    const user = await this.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    return user.destroy({
      transaction: transaction
    });
  }

  User.loginFindUserByUserName = async function(username) {
    return await this.findOne({
      where: {
        username: username
      },
      include: [{
          model: app.model.Role,
          through: {
            attributes: ['userId', 'roleId'],
          },
          attributes: ['Id', 'rolename']
        },
        {
          model: app.model.Shop,
          as: 'shop'
        }
      ],
      attributes: ['Id', 'username', 'password']
    });
  }


  User.updatePwd = async function(userId, newPwd) {
    return await this.update({
      password: newPwd,
    }, {
      where: {
        Id: userId
      }
    });
  }

  return User;
};
