var index = new Vue({
    el:".index",
    data(){
        return{
            storeId:"",
            storeData:[
                {value: '1',label: '店铺A'},
                {value: '2',label: '店铺B'}
            ],
            searchValue:"",

            year:"",
            month:"",
            week:"",
            yearData:config.globalData.yearData,
            monthData:config.globalData.monthData,
            weekData:config.globalData.weekData,
        }
    },
    methods:{
        menuChange(value){
            console.log(typeof value);
            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(value).addClass('active');
            switch (value) {
                case 0:
                    window.location.href = "/manage/courseManage";
                    break;
                case 1:
                    window.location.href = "/manage/studentManage";
                    break;
                case 2:
                    window.location.href = "/manage/courseContentManage";
                    break;
                default:
            }
        },
        storeChange(){

        },
        searchEvent(){

        },
        checkMonitorEvent(){
            window.location.href = "/manage/monitorDetail";
        },

        yearChange(){
            window.location.href = "/manage/monitorHistory";
        },
        monthChange(){
            window.location.href = "/manage/monitorHistory";

        },
        weekChange(){
            window.location.href = "/manage/monitorHistory";

        },
        closeModel(){

        }
    },
    created(){

    }
})
