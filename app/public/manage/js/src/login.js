var login = new Vue({
    el:".login",
    data(){
        return{
            username:"skhdbsb",
            password:"111111",

            rememberPwd:true
        }
    },
    methods:{
        login(){
            window.location.href = "/manage/courseManage";
        }
    }
})
