var index = new Vue({
    el:".index",
    data(){
        return{
            courseAId:"",
            courseBId:"",
            mainCourseInfo:"",
            otherCourseInfo:"",
        }
    },
    methods:{
        back(){
            window.location.href = "/teacher/scheduleToday";
        },
        tapCourseA(){
            window.open("/teacher/h5cabinet?courseId=" + this.courseAId);
            // window.location.href = "/teacher/h5cabinet?courseId=" + this.courseAId;
        },
        tapCourseB(){
            window.open("/teacher/h5cabinet?courseId=" + this.courseBId);
            // window.location.href = "/teacher/h5cabinet?courseId=" + this.courseBId;
        }
    },
    created(){
        let that = this;
        let searchStr = window.location.search;
        this.courseAId = searchStr.split("&")[0].split("courseAId=")[1];
        this.courseBId = searchStr.split("&")[1].split("courseBId=")[1];
        $.ajax({
            url: config.ajaxUrls.getCourseByCourseId.replace(":courseId",this.courseAId),
            type: 'GET',
        })
        .done(function(res) {
            if (res.status == 200) {
                that.mainCourseInfo = res.data;
            } else {
                that.$Message.error(res.data);
            }
        })
        .fail(function() {
            that.$Message.error(err);
        });

        $.ajax({
            url: config.ajaxUrls.getCourseByCourseId.replace(":courseId",this.courseBId),
            type: 'GET',
        })
        .done(function(res) {
            if (res.status == 200) {
                that.otherCourseInfo = res.data;
            } else {
                that.$Message.error(res.data);
            }
        })
        .fail(function() {
            that.$Message.error(err);
        });

    }
})
