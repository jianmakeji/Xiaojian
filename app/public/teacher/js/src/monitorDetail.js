var index = new Vue({
    el:".index",
    data(){
        return{
            shopId:"",
            shopData:[
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
        searchEvent(){

        },
        yearChange(){

        },
        monthChange(){

        },
        weekChange(){

        },
        back(){
            window.location.href = "/teacher/storeMonitor";
        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(1).addClass('active');
    }
})
