var index = new Vue({
    el:".index",
    data(){
        return{
            username:"adminadmin",
            password:"111111",
            rememberPwd:true,
            protocol:true,
            requestUrl:"",
        }
    },
    methods:{
        delaySubmit(){
            let that = this;
            if(this.protocol){
                var myform = document.getElementById('myform');
                myform.submit();
            }else{
                this.$Message.error({
                    content: "请阅读《小尖公司免责声明》并勾选！",
                    duration: 2
                });
            }

        }
    },
    created(){
        let roleId =  window.location.search.split("role=")[1];
        this.requestUrl = "/login/" + roleId;
    }
})

function check(form) {
    if (form.username.value.length < 6) {
        login.$Message.error({
            content: "用户名至少6位！",
            duration: 2
        });
        form.username.focus();
        return false
    }
    if (form.password.value.length < 6) {
        login.$Message.error({
            content: "密码位数至少6位！",
            duration: 2
        });
        form.password.focus();
        return false
    }
    return true
}
