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
  router.post('/manage/file/uploadFile/:fileType', controller.manage.file.uploadFile);
  router.post('/manage/file/uploadZipFile', controller.manage.file.uploadZipFile);
  router.post('/manage/course/createCourse', controller.manage.course.createCourse);
  router.get('/manage/course/searchByCourseName', controller.manage.course.searchByCourseName);
  router.get('/manage/course/listAllCourseByType', controller.manage.course.listAllCourseByType);
  router.get('/manage/courseChoose/listCourseByDate', controller.manage.courseChoose.listCourseByDate);
  router.post('/manage/courseChoose/createCourseChoose', controller.manage.courseChoose.createCourseChoose);

  router.resources('/manage/user',  controller.manage.user);
  router.resources('/manage/course',  controller.manage.course);
  router.resources('/manage/courseChoose',  controller.manage.courseChoose);
  router.resources('/manage/student',  controller.manage.student);

  router.get('/manage/courseManage', controller.manage.manage.courseManage);

  router.get('/manage/personalManage', controller.manage.manage.personalManage);
  router.get('/manage/editStoreUser', controller.manage.manage.editStoreUser);
  router.get('/manage/userRecord', controller.manage.manage.userRecord);
  router.get('/manage/existUsers', controller.manage.manage.existUsers);
  router.get('/manage/storeMonitor', controller.manage.manage.storeMonitor);
  router.get('/manage/monitorDetail', controller.manage.manage.monitorDetail);
  router.get('/manage/studentManage', controller.manage.manage.studentManage);
  router.get('/manage/courseContentManage', controller.manage.manage.courseContentManage);
  router.get('/manage/addCourse', controller.manage.manage.addCourse);
};
