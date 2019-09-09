var index = new Vue({
    el:".index",
    data(){
        return{
            shopId:"",
            stopData:[
                {value: '1',label: '店铺A'},
                {value: '2',label: '店铺B'}
            ],
            searchValue:"",
            year:"",
            month:"",
            week:"",
            yearData:config.globalData.yearData,
            monthData:config.globalData.monthData,
            weekData:config.globalData.weekData
        }
    },
    methods:{
        menuChange(value){
            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(value).addClass('active');
            switch (value) {
                case 0:
                    window.location.href = "/teacher/courseCheck";
                    break;
                case 1:
                    window.location.href = "/teacher/personalManage";
                    break;
                case 2:
                    window.location.href = "/teacher/courseContentManage";
                    break;
                default:
            }
        },
        storeChange(){

        },
        yearChange(){

                window.location.href = "/teacher/monitorHistory";
        },
        monthChange(){

                window.location.href = "/teacher/monitorHistory";
        },
        weekChange(){

                window.location.href = "/teacher/monitorHistory";
        },
        checkMonitorEvent(){
            window.location.href = "/teacher/monitorDetail";
        },
        back(){

        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(1).addClass('active');
    }
})
