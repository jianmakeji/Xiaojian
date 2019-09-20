var index = new Vue({
    el:".index",
    data(){
        return{
            formItem:{
                limit:12,
                offset:0,
                courseSubType:"0",
            },
            courseTypeArr:["全部","基础课程","辅助课程","运动课程"],
            cascader:[],
            cascaderData:[
                {
                    value:"1",
                    label:"基础课程",
                    children: [
                        {
                            value: '1',
                            label: '铛铛趣味成语'
                        },
                        {
                            value: '2',
                            label: '铛铛诗歌王国'
                        }
                    ]
                },
                {
                    value:"2",
                    label:"辅助课程",
                    children: [
                        {
                            value: '3',
                            label: '铛铛带你学常识'
                        },
                        {
                            value: '4',
                            label: '铛铛美术世界'
                        }
                    ]
                },
                {
                    value:"3",
                    label:"运动课程",
                    children: [
                        {
                            value: '5',
                            label: '铛铛带你一起运动'
                        }
                    ]
                }
            ],

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
                url: config.ajaxUrls.listCourseByCourseSubType,
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
        cascaderChange(value, selectedData){
            let that = this;
            this.formItem.courseSubType = value[1];
            this.searchItem.courseName = "";
            this.formItem.offset = 0;
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.listCourseByCourseSubType,
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
            this.formItem.courseSubType = "0";
            this.cascader = [];
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
                    url: config.ajaxUrls.listCourseByCourseSubType,
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
