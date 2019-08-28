var index = new Vue({
    el:".index",
    data(){
        return{
            storeId:"1",
            storeData:[
                {value: '1',label: '店铺A'},
                {value: '2',label: '店铺B'}
            ],
            year:"1",
            month:"",
            week:"",
            yearData:[
                {value: '1',label: '2019'},
                {value: '2',label: '2020'},
                {value: '3',label: '2021'},
                {value: '4',label: '2022'},
                {value: '5',label: '2023'}
            ],
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
            weekData:[],

            // 主要课程数据
            searchMainCourseValue:"",

            // 次要课程数据
            // 运动课程数据
            searchSportCourseValue:"",

            // 教师选择中心数据
            searchTeacherourseValue:""
        }
    },
    methods:{
        menuChange(value){
            switch (value) {
                case 1:
                    window.location.href = "/manage/studentManage";
                    break;
                case 2:
                    window.location.href = "/manage/courseContentManage";
                    break;
                default:
            }
        },
        storeChange(value){
            console.log(value);
        },
        yearChange(value){

        },
        monthChange(value){

        },
        weekChange(value){

        },
        // 主要课程事件
        changeMainCourse(courseId){
            console.log("打开主要课程Model");
            $('.mainCourseModel').addClass('active');
        },
        closeMainCouseModel(){
            console.log("关闭主要课程Model");
            $(".mainCourseModel").removeClass('active');
        },
        searchMainCourseEvent(){
            console.log("点击了主要课程搜索");
        },
        // 次要课程事件

        // 运动课程事件
        changeSportCourse(courseId){
            console.log("打开运动课程Model");
            $('.sportCourseModel').addClass('active');
        },
        searchSportCourseEvent(){
            console.log("点击了主要课程搜索");
        },
        closeSportCouseModel(){
            console.log("关闭运动课程Model");
            $(".sportCourseModel").removeClass('active');
        },

        // 教师选择中心事件
        changeTeacher(coursId){
            console.log("打开教师选择中心Model");
            $('.teacherCourseModel').addClass('active');
        },
        searchTeacherCourseEvent(){
            console.log("点击了教师搜索");
        },
        closeteacherCouseModel(){
            console.log("关闭教师选择中心Model");
            $('.teacherCourseModel').removeClass('active');
        },
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(0).addClass('active');
    }
})
