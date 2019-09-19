var config = {
    globalData:{
        // 课程标签
        courseTypeData:[
            {value: '0',label: '全部'},
            {value: '1',label: '基础课程'},
            {value: '2',label: '辅助课程'},
            {value: '3',label: '运动课程'}
        ],
        // 课程类别
        courseSubTypeData:[
            {value: '0',label: '全部'},
            {value: '1',label: '成语故事'},
            {value: '2',label: '儿童诗歌'},
            {value: '3',label: '常识'},
            {value: '4',label: '美术'},
            {value: '5',label: '篮球'}
        ],
        // 店铺数据
        storeData:[
            {value: '1',label: '长沙市岳麓店'},
            {value: '2',label: '长沙市望城店'},
            {value: '3',label: '长沙市五一店'},
            {value: '4',label: '长沙市芙蓉店'},
            {value: '5',label: '长沙市雨花店'}
        ],
        // 年份
        yearData:[
            {value: '2019',label: '2019'},
            {value: '2020',label: '2020'},
            {value: '2021',label: '2021'},
            {value: '2022',label: '2022'},
            {value: '2023',label: '2023'}
        ],
        // 月份
        monthData:[
            {value: '1',label: '1月'},
            {value: '2',label: '2月'},
            {value: '3',label: '3月'},
            {value: '4',label: '4月'},
            {value: '5',label: '5月'},
            {value: '6',label: '6月'},
            {value: '7',label: '7月'},
            {value: '8',label: '8月'},
            {value: '9',label: '9月'},
            {value: '10',label: '10月'},
            {value: '11',label: '11月'},
            {value: '12',label: '12月'}
        ],
        // 星期
        weekData:[
            {value: '1',label: '第一周'},
            {value: '2',label: '第二周'},
            {value: '3',label: '第三周'},
            {value: '4',label: '第四周'},
            {value: '5',label: '第五周'},
            {value: '6',label: '第六周'}
        ],
        // 星期
        courseNumberData:[
            {value: '09:00 - 10:00',label: '第一节'},
            {value: '13:00 - 14:00',label: '第二节'},
            {value: '16:00 - 17:00',label: '第三节'},
            {value: '19:00 - 20:00',label: '第四节'}
        ],
        // 周几
        dateData:["周一","周二",'周三','周四','周五','周六','周日'],
        dayData:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21",'22',"23","24","25","26","27","28","29","30","31"],

        // 监控区域
        monitorArea:["A区","B区","C区","D区"],
    },
    ajaxUrls:{
        // editStoreUser
        getUserByShopIdOrRealname:'/manage/user',
        getUserInfoById:"/manage/user/:userId",
        createTeacher:'/manage/user/createTeacher',
        updateUserInfoById:"/manage/user/:userId",
        deleteUserById:"/manage/user/:userId",
        // courseManage
        listAllCourseByType:'/manage/course/listAllCourseByType',
        // listCourseByDate:'/manage/courseChoose/listCourseByDate',
        createCourseChoose:'/manage/courseChoose/createCourseChoose',
        updateCourseByDate:'/manage/courseChoose/updateCourseByDate',

        // courseContentManage
        listCourseByCourseType:"/manage/course/listCourseByCourseType",
        getCourseByCourseSubType:"/manage/course",
        searchByCourseName:'/manage/course/searchByCourseName',
        // 课程上传
        getCourseByCourseId:"/manage/course/:courseId",
        updateCourseByCourseId:"/manage/course/:courseId",
        deleteCourseByCourseId:"/manage/course/:courseId",
        createCourse:"/manage/course/createCourse",
        uploadFile:'/manage/file/uploadFile/:fileType',
        uploadZipFile:'/manage/file/uploadZipFile',

        // courseCheck
        listCourseByDate:'/teacher/courseChoose/listCourseByDate',

        // scheduleToday
        getCourseDataByTeacherId:'/teacher/courseChoose/getCourseDataByTeacherId'
    },
}
