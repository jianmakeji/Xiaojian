var index = new Vue({
    el:".index",
    data(){
        return{
            storeId:"",
            storeData:[
                {value: '1',label: '店铺A'},
                {value: '2',label: '店铺B'}
            ],
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
        storeChange(){

        },
        submitEditStoreUserInfo(){
            window.location.href = "/manage/personalManage";
        },
        cancelEditStoreUserInfo(){
            window.location = document.referrer;
        }
    },
    created(){

    }
})
