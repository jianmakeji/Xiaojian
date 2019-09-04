var home = new Vue({
    el:".home",
    methods:{
        tapTheBox(roleId){
            window.location.href = "/login?role=" + roleId;
        }
    }
})
