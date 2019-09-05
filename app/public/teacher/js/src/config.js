var config = {
    globalData:{
        // 课程标签
        courseTypeData:[
            {value: '0',label: '全部'},
            {value: '1',label: '基础课程'},
            {value: '2',label: '辅导课程'},
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
            {value: '1',label: '店铺A'},
            {value: '2',label: '店铺B'},
            {value: '3',label: '店铺C'}
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
        // 周几
        dateData:["周一","周二",'周三','周四','周五','周六','周日'],
        dayData:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21",'22',"23","24","25","26","27","28","29","30","31"],
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
        listCourseByDate:'/manage/courseChoose/listCourseByDate',
        createCourseChoose:'/manage/courseChoose/createCourseChoose',
        updateCourseByDate:'/manage/courseChoose/updateCourseByDate',

        // courseContentManage
        getCourseByCourseSubType:"/manage/course",
        searchByCourseName:'/manage/course/searchByCourseName',
        // 课程上传
        getCourseByCourseId:"/manage/course/:courseId",
        updateCourseByCourseId:"/manage/course/:courseId",
        deleteCourseByCourseId:"/manage/course/:courseId",
        createCourse:"/manage/course/createCourse",
        uploadFile:'/manage/file/uploadFile/:fileType',
        uploadZipFile:'/manage/file/uploadZipFile',
    },
}