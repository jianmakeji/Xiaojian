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
        back(){
            window.location = document.referrer;

        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(1).addClass('active');
    }
})
