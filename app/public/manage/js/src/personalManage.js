var index = new Vue({
    el:".index",
    data(){
        return{
            storeId:"1",
            storeData:config.globalData.storeData,

            searchPersonalValue:""
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
        searchPersonalEvent(){

        },
        editStoreUser(userId){
            console.log("编辑用户Id");
            window.location.href = "/manage/editStoreUser";
        }
    },
    created(){

    }
})
