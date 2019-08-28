'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/login', controller.home.login);
  router.get('/roleIndex', controller.home.roleIndex);

  router.post('/login',app.passport.authenticate('local', {
       successReturnToOrRedirect : '/roleIndex',successFlash: true,
       failureRedirect: '/relogin',failureFlash: true }));
       
  router.post('/manage/user/createStudent',controller.manage.user.createStudentUser);
  router.post('/manage/user/createTeacher',controller.manage.user.createTeacherUser);
  router.post('/manage/user/createManager',controller.manage.user.createManagerUser);

  router.resources('/manage/user',  controller.manage.user);
  router.resources('/manage/course',  controller.manage.course);
  router.resources('/manage/courseChoose',  controller.manage.courseChoose);
  router.resources('/manage/student',  controller.manage.student);

  router.get('/manage/courseManage', controller.manage.manage.courseManage);


};
