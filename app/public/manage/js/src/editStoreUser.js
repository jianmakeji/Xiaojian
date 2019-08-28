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
            console.log(typeof value);
            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(value).addClass('active');
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
