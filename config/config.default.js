/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1566534796007_9315';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '192.168.3.110',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'xiaojian',
    timezone:'+08:00',
    logging: true,
    define: {
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
  };

  config.security = {
    csrf:{
      enable:false,
      ignoreJSON:true
    },
    domainWhiteList: ['*']
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  return {
    ...config,
    ...userConfig,
  };
};
