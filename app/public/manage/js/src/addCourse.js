var index = new Vue({
    el:".index",
    data(){
        return{
            courseId:0,
            // 上传参数对象
            formItem:{
                courseName:"",
                courseAbstract:"",
                courseThumbA:"",
                courseThumbB:"",
                h5Address:"",
                courseType:"",
                courseSubType:""
            },

            // 课程类别和标签数据
            courseTypeData:[
                {value: '1',label: '基础课程'},
                {value: '2',label: '辅导课程'},
                {value: '3',label: '运动课程'}
            ],
            courseSubTypeData:[
                {value: '1',label: '成语故事'},
                {value: '2',label: '儿童诗歌'},
                {value: '3',label: '常识'},
                {value: '4',label: '美术'},
                {value: '5',label: '篮球'}
            ],

            // 缩略图和h5临时变量
            fileName_1:"",
			imgUrl_1:"",
			progressPercent_1:0,
			fileName_2:"",
			imgUrl_2:"",
			progressPercent_2:0,
            attachFileName:"",
            attachFilePercent:0,
        }
    },
    methods:{
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
        // 上传缩略图
        doUpload_1(files){
            this.progressPercent_1 = 0;
            let that = this;
            let file = files.target.files[0];
            this.$Message.loading('上传中···');
            let formdata = new FormData();
            formdata.append('head', file);
            $.ajax({
                url: config.ajaxUrls.uploadFile.replace(":fileType",1),
                type: 'POST',
                cache: false,
                processData: false,
                contentType: false,
                data: formdata,
                xhr(){
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt){
                        var percentComplete = event.loaded / event.total;
                        that.progressPercent_1 = (percentComplete * 100);
                    }, false);
                    return xhr;
                },
                success(res){
                    if(res.status == 200){
                        that.$Message.success("上传成功！");
                        that.imgUrl_1 = res.url;
                        that.formItem.courseThumbA = res.url;
                        that.fileName_1 = files.target.files[0].name;
                    }else{
                        that.$Message.error(res.data.message);
                    }
                }
            })
        },
        doUpload_2(files){
            this.progressPercent_2 = 0;
            let that = this;
            let file = files.target.files[0];
            this.$Message.loading("上传中···");
            let formdata = new FormData();
            formdata.append('head', file);
            $.ajax({
                url: config.ajaxUrls.uploadFile.replace(":fileType",1),
                type: 'POST',
                cache: false,
                processData: false,
                contentType: false,
                data: formdata,
                xhr(){
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt){
                        var percentComplete = event.loaded / event.total;
                        that.progressPercent_2 = (percentComplete * 100);
                    }, false);
                    return xhr;
                },
                success(res){
                    if(res.status == 200){
                        that.$Message.success("上传成功！");
                        that.imgUrl_2 = res.url;
                        that.formItem.courseThumbB = res.url;
                        that.fileName_2 = files.target.files[0].name;
                    }else{
                        that.$Message.error(res.data.message);
                    }
                }
            })
        },
        h5_upload_ZIP_change(files){
            this.attachFilePercent = 0;
            let that = this;
            let file = files.target.files[0];
            let fileTrueName = files.target.files[0].name;
            this.$Message.loading("上传中···");

            let formdata = new FormData();
            formdata.append('head', file);
            $.ajax({
                url: config.ajaxUrls.uploadZipFile,
                type: 'POST',
                cache: false,
                processData: false,
                contentType: false,
                data: formdata,
                xhr(){
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt){
                        var percentComplete = event.loaded / event.total;
                        that.attachFilePercent = percentComplete * 100;
                    }, false);
                    return xhr;
                },
                success(res){
                    if(res.status == 200){
                        that.$Message.success("上传成功！");
                        that.formItem.h5Address = res.url;
                        that.attachFileName = files.target.files[0].name;
                    }else{
                        that.$Message.error(res.data.message);
                    }
                }
            })
        },
        courseTypeChange(courseTypeId){
            this.formItem.courseType = courseTypeId;
        },
        courseSubTypeChange(courseSubTypeId){
            this.formItem.courseSubType = courseSubTypeId;
        },
        submitCourse(){
            let that = this;
            this.$Loading.start();
            let notNullData = true;
            for (var key in this.formItem) {
                if (this.formItem[key] == "" ) {
                    notNullData = false;
                }
            }
            if (notNullData) {
                if (parseInt(this.courseId)) {
                    // *********************
                    // 更新课程
                    // *********************
                    $.ajax({
                        url: config.ajaxUrls.updateCourseByCourseId.replace(":courseId",that.courseId),
                        type: 'PUT',
                        data: this.formItem
                    })
                    .done(function(res) {
                        if (res.status == 200) {
                            that.$Loading.finish();
                            that.$Message.success({
                                content:res.data,
                                duration:1.5,
                                onClose(){
                                    window.location.href = "/manage/courseContentManage";
                                }
                            });
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
                    // *********************
                    // 新建课程
                    // *********************
                    $.ajax({
                        url: config.ajaxUrls.createCourse,
                        type: 'POST',
                        data: this.formItem
                    })
                    .done(function(res) {
                        if (res.status == 200) {
                            that.$Loading.finish();
                            that.$Message.success({
                                content:res.data,
                                duration:1.5,
                                onClose(){
                                    window.location.href = "/manage/courseContentManage";
                                }
                            });
                        } else {
                            that.$Loading.error();
                            that.$Message.error(res.data);
                        }
                    })
                    .fail(function(err) {
                        that.$Loading.error();
                        that.$Message.error(err.data);
                    })
                }

            } else {
                this.$Loading.error();
                this.$Message.error('请填入完整信息！');
            }
        },
        cancelCourse(){
            window.location = document.referrer;
        }
    },
    created(){
        let that = this;
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(2).addClass('active');

        this.courseId = window.location.search.split("courseId=")[1];

        if (parseInt(this.courseId)) {          //修改
            that.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.getCourseByCourseId.replace(":courseId",this.courseId),
                type: 'GET',
            })
            .done(function(res) {
                if (res.status == 200) {
                    that.$Loading.finish();
                    that.formItem = res.data;
                    that.imgUrl_1 = res.data.courseThumbA;
                    that.progressPercent_1 = 100;
                    that.imgUrl_2 = res.data.courseThumbB;
                    that.progressPercent_2 = 100;
                    that.attachFilePercent = 100;
                    that.formItem.courseType = res.data.courseType.toString();
                    that.formItem.courseSubType = res.data.courseSubType.toString();
                } else {
                    that.$Loading.error();
                    that.$Message.error(res.data);
                }
            })
            .fail(function() {
                that.$Loading.error();
                that.$Message.error(err);
            })

        } else {                                //新建

        }
    }
})

$(document).ready(function() {
    $('#thumba_upload_btn').click(function(){
        $('#thumba_upload_input').click();
    });
    $('#thumbb_upload_btn').click(function(){
        $('#thumbb_upload_input').click();
    });
    $('#h5_upload_ZIP_btn').click(function(){
        $('#h5_upload_ZIP_input').click();
    });
});
