var config = {
    globalData:{
        // 课程标签
        courseTypeData:[
            {value: '0',label: '基础课程'},
            {value: '1',label: '辅导课程'},
            {value: '2',label: '运动课程'}
        ],
        // 课程类别
        courseSubTypeData:[
            {value: '0',label: '成语故事'},
            {value: '1',label: '儿童诗歌'},
            {value: '2',label: '常识'},
            {value: '3',label: '美术'},
            {value: '4',label: '篮球'}
        ],
        // 店铺数据
        storeData:[
            {value: '0',label: '店铺A'},
            {value: '1',label: '店铺B'},
            {value: '2',label: '店铺C'},
            {value: '3',label: '店铺D'},
            {value: '4',label: '店铺E'}
        ]
    },
    ajaxUrls:{
        // 课程上传
        createCourse:"/manage/course/createCourse",
        uploadFile:'/manage/file/uploadFile/:fileType',
        uploadZipFile:'/manage/file/uploadZipFile',
    },
}
