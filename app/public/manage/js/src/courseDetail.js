var index = new Vue({
    el:".index",
    data(){
        return{
            courseId:"",

            courseName:"",
            videoAddress:"",
            courseThumbB:"",
            courseAbstract:""
        }
    },
    methods:{
        initData(){
            let that = this;
            $.ajax({
                url: config.ajaxUrls.getCourseByCourseId.replace(":courseId",this.courseId),
                type: 'GET',
            })
            .done(function(res) {
                if (res.status == 200) {
                    that.courseName = res.data.courseName;
                    that.videoAddress = res.data.videoAddress;
                    that.courseThumbB = res.data.courseThumbB;
                    that.courseAbstract = res.data.courseAbstract;
                } else {
                    that.$Message.error(res.data);
                }
            })
            .fail(function() {
                that.$Message.error(err);
            });
        },
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
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(2).addClass('active');
        this.courseId = window.location.search.split("courseId=")[1];
        this.initData();
    }
})
