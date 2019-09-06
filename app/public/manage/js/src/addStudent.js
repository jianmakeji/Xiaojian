var index = new Vue({
    el:".index",
    data(){
        return{
            formItem:{
                shopId:"",
                username:"",
                password:"",
                headicon:"",
                realname:"",
                age:"",
                idNum:"",
                gender:"",
                jobTitle:""
            },
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
        submitEditStoreUserInfo(){
            window.location = document.referrer;

        },
        cancelEditStoreUserInfo(){
            window.location = document.referrer;

        }
    },
    created(){

        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(1).addClass('active');
    }
})
