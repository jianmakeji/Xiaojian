'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/manage/login', controller.manage.manage.login);
  router.resources('/manage/user',  controller.manage.user);
  router.get('/manage/courseManage', controller.manage.manage.courseManage);
  router.get('/manage/personalManage', controller.manage.manage.personalManage);
  router.get('/manage/editStoreUser', controller.manage.manage.editStoreUser);
  router.get('/manage/userRecord', controller.manage.manage.userRecord);
};
