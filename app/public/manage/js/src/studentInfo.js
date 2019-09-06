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
            isEdit:false
        }
    },
    methods:{
        menuChange(value){
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
        back(){
            window.location = document.referrer;
        }
    },
    created(){
        this.userId = window.location.search.split("id=")[1];
        if (this.userId != "0") {
            this.isEdit = true;
            this.initData();
        }
    }
})
$(document).ready(function() {
    $('#headIcon_upload_btn').click(function(){
        $('#headIcon_upload_input').click();
    });
});
