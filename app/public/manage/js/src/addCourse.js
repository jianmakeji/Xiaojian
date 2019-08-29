var index = new Vue({
    el:".index",
    data(){
        return{
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
            courseTypeData:config.globalData.courseTypeData,
            courseSubTypeData:config.globalData.courseSubTypeData,

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
            this.$Notice.success({title:'上传中···'});
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
                        that.$Notice.success({title:'上传成功！'});
                        that.imgUrl_1 = res.url;
                        that.formItem.courseThumbA = res.url;
                        that.fileName_1 = files.target.files[0].name;
                    }else if(res.status == 500){
                        that.$Notice.error({title: "上传出错"});
                    }else if(res.status == 999){
                        that.$Notice.error({title:res.data.message});
                    }
                }
            })
        },
        doUpload_2(files){
            this.progressPercent_2 = 0;
            let that = this;
            let file = files.target.files[0];
            this.$Notice.success({title:'上传中···'});
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
                        that.$Notice.success({title:'上传成功！'});
                        that.imgUrl_2 = res.url;
                        that.formItem.courseThumbB = res.url;
                        that.fileName_2 = files.target.files[0].name;
                    }else if(res.status == 500){
                        that.$Notice.error({title: "上传出错"});
                    }else if(res.status == 999){
                        that.$Notice.error({title:res.data.message});
                    }
                }
            })
        },
        h5_upload_ZIP_change(files){
            this.attachFilePercent = 0;
            let that = this;
            let file = files.target.files[0];
            let fileTrueName = files.target.files[0].name;
            this.$Notice.success({title:'上传中···'});

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
                    console.log(res);
                    if(res.status == 200){
                        that.$Notice.success({title:'上传成功！'});
                        that.formItem.h5Address = res.url;
                        that.attachFileName = files.target.files[0].name;
                    }else if(res.status == 500){
                        that.$Notice.error({title: that.locale ? "上传出错" : "Operation failed!"});
                    }else if(res.status == 999){
                        that.$Notice.error({title:res.data.message});
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
            let notNullData = true;
            for (var key in this.formItem) {
                if (this.formItem[key] == "" ) {
                    notNullData = false;
                }
            }
            if (notNullData) {
                $.ajax({
                    url: config.ajaxUrls.createCourse,
                    type: 'POST',
                    data: this.formItem
                })
                .done(function(res) {
                    console.log("success",res);
                })
                .fail(function(err) {
                    console.log("error",err);
                })

            } else {
                this.$Message.error('请填入完整信息！');
            }
        },
        cancelCourse(){

        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(2).addClass('active');
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
