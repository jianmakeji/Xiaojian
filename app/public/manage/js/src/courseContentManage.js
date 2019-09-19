var index = new Vue({
    el:".index",
    data(){
        return{
            formItem:{
                limit:12,
                offset:0,
                courseType:"0",
            },
            courseTypeArr:["全部","基础课程","辅助课程","运动课程"],
            courseTypeNum:0,
            courseTypeData:config.globalData.courseTypeData,

            searchItem:{
                limit:12,
                offset:0,
                courseName:"",
            },

            // 列表数据
            courseData:[],
            totalCourseNum:0
        }
    },
    methods:{
        initData(){
            // 获取所有课程数据
            let that = this;
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.listCourseByCourseType,
                type: 'GET',
                data: this.formItem
            })
            .done(function(res) {
                if (res.status == 200) {
                    that.$Loading.finish();
                    that.courseData = res.data.rows;
                    that.totalCourseNum = res.data.count;
                } else {
                    that.$Loading.error();
                    that.$Message.error(res.data);
                }
            })
            .fail(function(err) {
                that.$Loading.error();
                that.$Message.error(err);
            })
        },
        menuChange(value){
            switch (value) {
                case 0:
                    window.location.href = "/manage/courseManage";
                    break;
                case 1:
                    window.location.href = "/manage/studentManage";
                    break;
                default:
            }
        },
        courseTypeChange(courseTypeId){
            let that = this;
            this.courseTypeNum = courseTypeId;
            this.searchItem.courseName = "";
            this.formItem.offset = 0;
            this.$Loading.start();
            this.formItem.courseType = courseTypeId;
            $.ajax({
                url: config.ajaxUrls.listCourseByCourseType,
                type: 'GET',
                data: this.formItem
            })
            .done(function(res) {
                if (res.status == 200) {
                    that.$Loading.finish();
                    that.courseData = res.data.rows;
                    that.totalCourseNum = res.data.count;
                } else {
                    that.$Loading.error();
                    that.$Message.error(res.data);
                }
            })
            .fail(function(err) {
                that.$Loading.error();
                that.$Message.error(err.data);
            })


        },
        searchCourseSubTypeEvent(){
            let that = this;
            this.formItem.courseType = "0";
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.searchByCourseName,
                type: 'GET',
                data: this.searchItem
            })
            .done(function(res) {
                if (res.status == 200) {
                    that.$Loading.finish();
                    that.courseData = res.data.rows;
                    that.totalCourseNum = res.data.count;
                } else {
                    that.$Loading.error();
                    that.$Message.error(res.data);
                }
            })
            .fail(function() {
                that.$Loading.error();
                that.$Message.error(err.data);
            })

        },
        addCourseEvent(){
            window.location.href = "/manage/addCourse?courseId=0";
        },
        couserDetail(courseId){
            window.location.href = "/manage/courseDetail?courseId=" + courseId;
        },
        editCourse(courseId){
            window.location.href = "/manage/addCourse?courseId=" + courseId;
        },
        deleteCourse(courseId){
            let that = this;
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.deleteCourseByCourseId.replace(":courseId",courseId),
                type: 'DELETE',
            })
            .done(function(res) {
                if (res.status == 200) {
                    that.$Loading.finish();
                    that.$Message.success({
                        content:res.data,
                        duration:1.5,
                        onClose(){
                            that.initData();
                        }
                    })
                } else {
                    that.$Loading.error();
                    that.$Message.error(res.data);
                }
            })
            .fail(function(err) {
                that.$Message.error(err.data);
            })

        },
        pageChange(pageNum){
            let that = this;
            this.$Loading.start();
            if (this.searchItem.courseName == "") {
                this.formItem.offset = (pageNum - 1) * 12;
                $.ajax({
                    url: config.ajaxUrls.listCourseByCourseType,
                    type: 'GET',
                    data: this.formItem
                })
                .done(function(res) {
                    if (res.status == 200) {
                        that.$Loading.finish();
                        that.courseData = res.data.rows;
                        that.totalCourseNum = res.data.count;
                    } else {
                        that.$Loading.error();
                        that.$Message.error(res.data);
                    }
                })
                .fail(function(err) {
                    that.$Loading.error();
                    that.$Message.error(err.data);
                })
            } else {
                this.searchItem.offset = (pageNum - 1) * 12;
                $.ajax({
                    url: config.ajaxUrls.searchByCourseName,
                    type: 'GET',
                    data: this.searchItem
                })
                .done(function(res) {
                    if (res.status == 200) {
                        that.$Loading.finish();
                        that.courseData = res.data.rows;
                        that.totalCourseNum = res.data.count;
                    } else {
                        that.$Loading.error();
                        that.$Message.error(res.data);
                    }
                })
                .fail(function() {
                    that.$Loading.error();
                    that.$Message.error(err.data);
                })
            }
        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(2).addClass('active');

        this.initData();
    }
})
