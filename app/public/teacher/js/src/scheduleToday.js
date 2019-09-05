var index = new Vue({
    el:".index",
    data(){
        return{
            dataSourse:[],
            courseNumberData:config.globalData.courseNumberData,

            studentListModal:false,
            aa:""
        }
    },
    methods:{
        openStudentListModal(){
            this.studentListModal = true;
        },
        startClass(courseAId,courseBId){
            console.log(courseAId,courseBId);
            if (courseAId != "0" && courseBId != "0") {
                window.location.href = "/teacher/startClass?courseAId=" + courseAId + "&courseBId=" + courseBId;
            } else {
                this.$Message.error("未上传该时段课程！");
            }
        }
    },
    created(){
        let that = this;
        $.ajax({
            url: config.ajaxUrls.getCourseDataByTeacherId,
            type: 'GET',
            data: {
                teacherId:"1"
            }
        })
        .done(function(res) {
            if (res.status == 200) {
                let arr = new Array();
                arr = res.data;
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (arr[j].courseNumber == i + 1) {
                            console.log(i,j,arr[j].courseNumber);
                            that.dataSourse[i] = arr[j];
                            break;
                        }else{
                            that.dataSourse[i] = "";
                        }
                    }
                }
                console.log(that.dataSourse);
                that.$forceUpdate();
            } else {
                that.$Message.error(res.data);
            }
        })
        .fail(function(err) {
            that.$Message.error(err.data);
        });
    }
})
