var index = new Vue({
    el:".index",
    data(){
        return{
            searchValue:"",
            monitorArea:config.globalData.monitorArea,
            nowTime:""
        }
    },
    methods:{
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
        dateChange(date){
            window.location.href = "/teacher/monitorHistory";
        },
        checkMonitorEvent(){
            window.location.href = "/teacher/monitorDetail";
        },
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(1).addClass('active');
    },
    mounted() {
        let that = this;
        this.timer = setInterval(() => {
            let date = new Date();
            that.nowTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }, 1000)
    },
})
