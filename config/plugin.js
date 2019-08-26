'use strict';

/** @type Egg.EggPlugin */

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.i18n = {
  enable: true,
  package: 'egg-i18n',
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
