var index = new Vue({
    el:".index",
    data(){
        return{
            formStyle:{
                minHeight:""
            },
            courseId:0,
            // 上传参数对象
            formItem:{
                courseName:"",
                courseAbstract:"",
                // courseThumbA:"",
                courseThumbB:"",
                h5Address:"",
                videoAddress:"",
                courseType:"",
                courseSubType:""
            },

            // 课程类别和标签数据
            isMainCourseFlag:false,
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

            // 缩略图和h5临时变量
            // fileName_1:"",
			// imgUrl_1:"",
			// progressPercent_1:0,
			fileName_2:"",
			imgUrl_2:"",
			progressPercent_2:0,
            h5UploadArr:["","","",""],
            attachFileName_1:"",
            attachFilePercent_1:0,
            attachFileName_2:"",
            attachFilePercent_2:0,
            attachFileName_3:"",
            attachFilePercent_3:0,
            attachFileName_4:"",
            attachFilePercent_4:0,
            videoFileName:"",
            videoFilePercent:0
        }
    },
    methods:{
        cascaderChange(value, selectedData){
            if (value[0] == "1") {
                this.isMainCourseFlag = true;
            } else {
                this.isMainCourseFlag = false;
            }
            this.formItem.courseType = value[0];
            this.formItem.courseSubType = value[1];
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
        // 上传缩略图
        // doUpload_1(files){
        //     this.progressPercent_1 = 0;
        //     let that = this;
        //     let file = files.target.files[0];
        //     this.$Message.loading('上传中···');
        //     let formdata = new FormData();
        //     formdata.append('head', file);
        //     $.ajax({
        //         url: config.ajaxUrls.uploadFile.replace(":fileType",1),
        //         type: 'POST',
        //         cache: false,
        //         processData: false,
        //         contentType: false,
        //         data: formdata,
        //         xhr(){
        //             var xhr = new window.XMLHttpRequest();
        //             xhr.upload.addEventListener("progress", function(evt){
        //                 var percentComplete = event.loaded / event.total;
        //                 that.progressPercent_1 = (percentComplete * 100);
        //             }, false);
        //             return xhr;
        //         },
        //         success(res){
        //             if(res.status == 200){
        //                 that.$Message.success("上传成功！");
        //                 that.imgUrl_1 = res.url;
        //                 that.formItem.courseThumbA = res.url;
        //                 that.fileName_1 = files.target.files[0].name;
        //             }else{
        //                 that.$Message.error(res.data.message);
        //             }
        //         }
        //     })
        // },
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
        // 第一小节h5上传
        h5_upload_ZIP_1_change(files){
            this.attachFilePercent_1 = 0;
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
                        that.attachFilePercent_1 = percentComplete * 100;
                    }, false);
                    return xhr;
                },
                success(res){
                    if(res.status == 200){
                        that.$Message.success("上传成功！");
                        that.h5UploadArr[0] = res.url;
                        that.attachFileName_1 = files.target.files[0].name;
                    }else{
                        that.$Message.error(res.data.message);
                    }
                }
            })
        },
        // 第二小节h5上传
        h5_upload_ZIP_2_change(files){
            this.attachFilePercent_2 = 0;
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
                        that.attachFilePercent_2 = percentComplete * 100;
                    }, false);
                    return xhr;
                },
                success(res){
                    if(res.status == 200){
                        that.$Message.success("上传成功！");
                        that.h5UploadArr[1] = res.url;
                        that.attachFileName_2 = files.target.files[0].name;
                    }else{
                        that.$Message.error(res.data.message);
                    }
                }
            })
        },
        // 第三小节h5上传
        h5_upload_ZIP_3_change(files){
            this.attachFilePercent_3 = 0;
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
                        that.attachFilePercent_3 = percentComplete * 100;
                    }, false);
                    return xhr;
                },
                success(res){
                    if(res.status == 200){
                        that.$Message.success("上传成功！");
                        that.h5UploadArr[2] = res.url;
                        that.attachFileName_3 = files.target.files[0].name;
                    }else{
                        that.$Message.error(res.data.message);
                    }
                }
            })
        },
        // 第四小节h5上传
        h5_upload_ZIP_4_change(files){
            this.attachFilePercent_4 = 0;
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
                        that.attachFilePercent_4 = percentComplete * 100;
                    }, false);
                    return xhr;
                },
                success(res){
                    if(res.status == 200){
                        that.$Message.success("上传成功！");
                        that.h5UploadArr[3] = res.url;
                        that.attachFileName_4 = files.target.files[0].name;
                    }else{
                        that.$Message.error(res.data.message);
                    }
                }
            })
        },
        mp4_upload_change(files){
            this.videoFilePercent = 0;
            let that = this;
            let file = files.target.files[0];
            let fileTrueName = files.target.files[0].name;
            this.$Message.loading("上传中···");

            let formdata = new FormData();
            formdata.append('head', file);
            $.ajax({
                url: config.ajaxUrls.uploadFile.replace(":fileType",3),
                type: 'POST',
                cache: false,
                processData: false,
                contentType: false,
                data: formdata,
                xhr(){
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt){
                        var percentComplete = event.loaded / event.total;
                        that.videoFilePercent = percentComplete * 100;
                    }, false);
                    return xhr;
                },
                success(res){
                    if(res.status == 200){
                        that.$Message.success("上传成功！");
                        that.formItem.videoAddress = res.url;
                        that.videoFileName = files.target.files[0].name;
                    }else{
                        that.$Message.error(res.data);
                    }
                }
            })
        },
        submitCourse(){
            this.formItem.h5Address = this.h5UploadArr.join(",");
            let that = this;
            this.$Loading.start();
            let notNullData = true;
            for (var key in this.formItem) {
                if (this.formItem[key] == "" ) {
                    notNullData = false;
                    break;
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

        this.formStyle.minHeight = document.documentElement.clientHeight - 195 + "px";

        this.courseId = window.location.search.split("courseId=")[1];

        if (parseInt(this.courseId)) {          //修改
            that.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.getCourseByCourseId.replace(":courseId",this.courseId),
                type: 'GET',
            })
            .done(function(res) {
                if (res.status == 200) {
                    if (res.data.h5Address.indexOf(",")) {
                        that.h5UploadArr = res.data.h5Address.split(",");
                    } else {
                        that.h5UploadArr[0] = res.data.h5Address;
                    }
                    for (let i = 0; i < that.h5UploadArr.length; i++) {
                        switch (i) {
                            case 0:
                                that.attachFilePercent_1 = that.h5UploadArr[i] != "" ? 100 : 0;
                                break;
                            case 1:
                                that.attachFilePercent_2 = that.h5UploadArr[i] != "" ? 100 : 0;
                                break;
                            case 2:
                                that.attachFilePercent_3 = that.h5UploadArr[i] != "" ? 100 : 0;
                                break;
                            case 3:
                                that.attachFilePercent_4 = that.h5UploadArr[i] != "" ? 100 : 0;
                                break;
                        }
                    }
                    that.$Loading.finish();
                    that.formItem = res.data;
                    // that.imgUrl_1 = res.data.courseThumbA;
                    // that.progressPercent_1 = res.data.courseThumbA ? 100 : 0;
                    that.imgUrl_2 = res.data.courseThumbB;
                    that.progressPercent_2 = res.data.courseThumbB ? 100 : 0;

                    that.videoFilePercent = res.data.videoAddress ?  100 : 0;
                    that.formItem.courseType = res.data.courseType.toString();
                    that.formItem.courseSubType = res.data.courseSubType.toString();
                    that.cascader = [res.data.courseType.toString(),res.data.courseSubType.toString()];
                    that.cascaderChange([res.data.courseType.toString(),res.data.courseSubType.toString()]);
                } else {
                    that.$Loading.error();
                    that.$Message.error(res.data);
                }
            })
            .fail(function() {
                that.$Loading.error();
                that.$Message.error(err);
            });
        }
    }
})

$(document).ready(function() {
    // $('#thumba_upload_btn').click(function(){
    //     $('#thumba_upload_input').click();
    // });
    $('#thumbb_upload_btn').click(function(){
        $('#thumbb_upload_input').click();
    });
    $('#h5_upload_ZIP_1_btn').click(function(){
        $('#h5_upload_ZIP_1_input').click();
    });
    $('#h5_upload_ZIP_2_btn').click(function(){
        $('#h5_upload_ZIP_2_input').click();
    });
    $('#h5_upload_ZIP_3_btn').click(function(){
        $('#h5_upload_ZIP_3_input').click();
    });
    $('#h5_upload_ZIP_4_btn').click(function(){
        $('#h5_upload_ZIP_4_input').click();
    });
    $('#mp4_upload_btn').click(function(){
        $('#mp4_upload_input').click();
    });
});
