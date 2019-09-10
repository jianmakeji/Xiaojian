var index = new Vue({
    el:".index",
    data(){
        return{
            dataSourse:[],
            studentData:[
                "陆睿诚","叶米兰","邱叶丹","贾阳夏","卢子石","韩嘉志","万苏","梁天宇","梁丁","姜和","白语儿","郑鸿煊","汪浩"
            ],
            courseNumberData:config.globalData.courseNumberData,

            studentListModal:false,
            aa:"",

            CheckIsOk:false,
        }
    },
    methods:{
        openStudentListModal(){
            this.studentListModal = true;
            this.CheckIsOk = false;
        },
        closeModel(){
            this.studentListModal = false;
            this.CheckIsOk = false;
        },
        startClass(courseAId,courseBId){
            if (courseAId != "0" && courseBId != "0") {
                window.location.href = "/teacher/startClass?courseAId=" + courseAId + "&courseBId=" + courseBId;
            } else {
                this.$Message.error("未上传该时段课程！");
            }
        },
        submit(){
            this.CheckIsOk = true;
            let that = this;
            setTimeout(function(){
                that.studentListModal = false;
            },2000);
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
                            that.dataSourse[i] = arr[j];
                            break;
                        }else{
                            that.dataSourse[i] = "";
                        }
                    }
                }
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
