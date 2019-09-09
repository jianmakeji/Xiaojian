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
            progressPercent:0,
            storeData:config.globalData.storeData,
            userId:"0",
        }
    },
    methods:{
        initData(){

        },
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
        back(){
            window.location = document.referrer;
        }
    },
    created(){
        let comeStr = document.referrer.split("teacher/")[1];
        if (comeStr == "personalManage" || comeStr == "existUsers") {
            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(1).addClass('active');
        } else {
            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(0).addClass('active');
        }
    }
})
