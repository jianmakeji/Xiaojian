var index = new Vue({
    el:".index",
    data(){
        return{
            shopId:"",
            shopData:config.globalData.storeData,
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
        shopChange(shopId){
            this.shopId = shopId;
            localStorage.setItem("shopId",shopId);
        },
        searchEvent(){

        },
        back(){
            window.location = document.referrer;

        }
    },
    created(){
        this.shopId = localStorage.getItem("shopId");
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(1).addClass('active');
    }
})
