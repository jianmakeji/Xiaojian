'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/login', controller.home.login);
  router.get('/relogin', controller.home.relogin);
  router.get('/logout', controller.home.logout);
  router.get('/home', controller.home.home);
  router.get('/roleIndex', controller.home.roleIndex);

  router.post('/login/:role',app.passport.authenticate('local', {
       successReturnToOrRedirect : '/roleIndex',successFlash: true,
       failureRedirect: '/relogin',failureFlash: true }));

  router.post('/manage/user/createStudent',controller.manage.user.createStudentUser);
  router.post('/manage/user/createTeacher',controller.manage.user.createTeacherUser);
  router.post('/manage/user/createManager',controller.manage.user.createManagerUser);
  router.get('/manage/user/getTeacherByShopId', controller.manage.user.getTeacherByShopId);
  router.post('/manage/file/uploadFile/:fileType', controller.manage.file.uploadFile);
  router.post('/manage/file/uploadZipFile', controller.manage.file.uploadZipFile);
  router.post('/manage/course/createCourse', controller.manage.course.createCourse);
  router.get('/manage/course/searchByCourseName', controller.manage.course.searchByCourseName);
  router.get('/manage/course/listAllCourseByType', controller.manage.course.listAllCourseByType);
  router.get('/manage/courseChoose/listCourseByDate', controller.manage.courseChoose.listCourseByDate);
  router.post('/manage/courseChoose/createCourseChoose', controller.manage.courseChoose.createCourseChoose);
  router.put('/manage/courseChoose/updateCourseByDate', controller.manage.courseChoose.updateCourseByDate);

  router.get('/teacher/courseChoose/getCourseDataByTeacherId', controller.teacher.courseChoose.getCourseDataByTeacherId);
  router.get('/teacher/courseChoose/listCourseByDate', controller.teacher.courseChoose.listCourseByDate);

  router.resources('/manage/user',  controller.manage.user);
  router.resources('/manage/course',  controller.manage.course);
  router.resources('/manage/courseChoose',  controller.manage.courseChoose);
  router.resources('/manage/student',  controller.manage.student);

  router.get('/manage/courseManage', controller.manage.manage.courseManage);
  router.get('/manage/courseStudentList', controller.manage.manage.courseStudentList);
  router.get('/manage/studentInfo', controller.manage.manage.studentInfo);
  router.get('/manage/personalManage', controller.manage.manage.personalManage);
  router.get('/manage/editStoreUser', controller.manage.manage.editStoreUser);
  router.get('/manage/userRecord', controller.manage.manage.userRecord);
  router.get('/manage/userClassHistory', controller.manage.manage.userClassHistory);
  router.get('/manage/existUsers', controller.manage.manage.existUsers);
  router.get('/manage/storeMonitor', controller.manage.manage.storeMonitor);
  router.get('/manage/monitorDetail', controller.manage.manage.monitorDetail);
  router.get('/manage/monitorHistory', controller.manage.manage.monitorHistory);
  router.get('/manage/studentManage', controller.manage.manage.studentManage);
  router.get('/manage/addStudent', controller.manage.manage.addStudent);
  router.get('/manage/courseContentManage', controller.manage.manage.courseContentManage);
  router.get('/manage/addCourse', controller.manage.manage.addCourse);


  router.get('/teacher/courseCheck', controller.teacher.teacher.courseCheck);
  router.get('/teacher/courseStudentList', controller.teacher.teacher.courseStudentList);
  router.get('/teacher/studentInfo', controller.teacher.teacher.studentInfo);
  router.get('/teacher/personalManage', controller.teacher.teacher.personalManage);
  router.get('/teacher/existUsers', controller.teacher.teacher.existUsers);
  router.get('/teacher/storeMonitor', controller.teacher.teacher.storeMonitor);
  router.get('/teacher/monitorDetail', controller.teacher.teacher.monitorDetail);
  router.get('/teacher/monitorHistory', controller.teacher.teacher.monitorHistory);
  router.get('/teacher/courseContentManage', controller.teacher.teacher.courseContentManage);
  router.get('/teacher/courseDetail', controller.teacher.teacher.courseDetail);
  router.get('/teacher/scheduleToday', controller.teacher.teacher.scheduleToday);
  router.get('/teacher/startClass', controller.teacher.teacher.startClass);
};
