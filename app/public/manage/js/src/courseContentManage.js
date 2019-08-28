var index = new Vue({
    el:".index",
    data(){
        return{
            courseTypeId:"",
            courseTypeData:[
                {value: '1',label: '儿童诗歌'},
                {value: '2',label: '成语故事'},
                {value: '2',label: '辅助课程'}
            ],
            searchCourseTypeValue:"",

            // 列表数据

        }
    },
    methods:{
        menuChange(value){
            switch (value) {
                case 0:
                    window.location.href = "/manage/courseManage";
                    break;
                case 1:
                    window.location.href = "/manage/studentManage";
                    break;
                default:
            }
        },
        courseTypeChange(){

        },
        searchCourseTypeEvent(){

        },
        addCourseEvent(){
            window.location.href = "/manage/addCourse";
        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(2).addClass('active');
    }
})
