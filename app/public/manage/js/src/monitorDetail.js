var index = new Vue({
    el:".index",
    data(){
        return{
            shopId:"",
            shopData:config.globalData.storeData,
            searchValue:"",
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
        dateChange(){

        },
        back(){
            window.location = document.referrer;
        }
    },
    created(){
        this.shopId = localStorage.getItem("shopId");
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(0).addClass('active');

    }
})
