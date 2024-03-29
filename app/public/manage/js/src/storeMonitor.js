var index = new Vue({
    el:".index",
    data(){
        return{
            shopId:"",
            stopData:config.globalData.storeData,
            searchValue:"",

            year:"",
            month:"",
            week:"",
            yearData:config.globalData.yearData,
            monthData:config.globalData.monthData,
            weekData:config.globalData.weekData,
            monitorArea:config.globalData.monitorArea,
            nowTime:""
        }
    },
    methods:{
        menuChange(value){
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
        shopChange(shopId){
            this.shopId = shopId;
            localStorage.setItem("shopId",shopId);
        },
        checkMonitorEvent(){
            window.location.href = "/manage/monitorDetail";
        },
        dateChange(date){
            window.location.href = "/manage/monitorHistory";
        },
    },
    created(){
        this.shopId = localStorage.getItem("shopId");
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(0).addClass('active');
    },
    mounted() {
        let that = this;
        this.timer = setInterval(() => {
            let date = new Date();
            that.nowTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }, 1000)
    },
})
