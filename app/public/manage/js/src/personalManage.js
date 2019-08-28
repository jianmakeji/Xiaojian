var index = new Vue({
    el:".index",
    data(){
        return{
            storeId:"",
            storeData:[
                {value: '1',label: '店铺A'},
                {value: '2',label: '店铺B'}
            ],

            searchPersonalValue:""
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
