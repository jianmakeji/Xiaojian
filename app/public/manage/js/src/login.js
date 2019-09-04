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
        // login(){
        //     window.location.href = "/manage/courseManage";
        // }
    }
})

function check(form) {
    if (form.username.value.length < 6) {
        index.$Notice.error({
            title: "用户名至少6位！",
            duration: 2
        });
        form.username.focus();
        return false
    }
    if (form.password.value.length < 6) {
        index.$Notice.error({
            title: "密码位数至少6位！",
            duration: 2
        });
        form.password.focus();
        return false
    }
    return true;
}
