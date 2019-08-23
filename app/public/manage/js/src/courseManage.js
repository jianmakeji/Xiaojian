var courseManage = new Vue({
    el:".courseManage",
    data(){
        return{

        }
    },
    methods:{
        menuChange(value){
            console.log(typeof value);
            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(value).addClass('active');
        }
    }
})
