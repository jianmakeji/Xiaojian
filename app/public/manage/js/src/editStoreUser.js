var index = new Vue({
    el:".index",
    data(){
        return{
            formItem:{
                shopId:"",
                username:"",
                password:"",
                headicon:"",
                realname:"",
                age:"",
                idNum:"",
                gender:"",
                jobTitle:""
            },
            progressPercent:0,
            shopId:"",
            shopData:config.globalData.storeData,
            userId:"0",
            isEdit:false
        }
    },
    methods:{
        initData(){
            let that = this;
            $.ajax({
                url: config.ajaxUrls.getUserInfoById.replace(":userId",this.userId),
                type: 'GET'
            })
            .done(function(res) {
                if(res.status == 200){
                    that.$Loading.finish();
                    that.formItem.shopId = res.data.shopId.toString();
                    that.formItem.username = res.data.username;
                    that.formItem.headicon = res.data.headicon;
                    that.progressPercent = res.data.headicon ? 100 : 0;
                    that.formItem.realname = res.data.realname;
                    that.formItem.age = res.data.age;
                    that.formItem.idNum = res.data.idNum;
                    that.formItem.gender = res.data.gender.toString();
                    that.formItem.jobTitle = res.data.jobTitle.toString();
                }else{
                    that.$Loading.error();
                    that.$Message.error(res.data.message);
                }
            })
            .fail(function(err) {
                that.$Loading.error();
                that.$Message.error(err.data);
            })

        },
        menuChange(value){
            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(value).addClass('active');
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
        storeChange(){

        },
        shopChange(shopId){
            this.shopId = shopId;
            localStorage.setItem("shopId",shopId);
        },
        submitEditStoreUserInfo(){
            let that = this;
            this.$Loading.start();
            if (this.formItem.username == "" || this.formItem.headicon == "" || this.formItem.realname == "" || this.formItem.age == "" || this.formItem.idNum == "" || this.formItem.gender == "" || this.formItem.jobTitle == "" ) {
                this.$Message.error("请填写完整信息！");
                this.$Loading.error();
            } else {
                if (this.userId != "0") {  //修改
                    $.ajax({
                        url: config.ajaxUrls.updateUserInfoById.replace(":userId",this.userId),
                        type: 'PUT',
                        data: this.formItem
                    })
                    .done(function(res) {
                        if(res.status == 200){
                            that.$Loading.finish();
                            that.$Message.success({
                                content:res.data,
                                duration:2,
                                onClose(){
                                    window.location.href = "/manage/personalManage";
                                }
                            });
                        }else{
                            that.$Loading.error();
                            that.$Message.error(res.data);
                        }
                    })
                    .fail(function(err) {
                        that.$Loading.error();
                        that.$Message.error(err.data);
                    });
                } else {
                    $.ajax({
                        url: config.ajaxUrls.createTeacher,
                        type: 'POST',
                        data: this.formItem
                    })
                    .done(function(res) {
                        if(res.status == 200){
                            that.$Loading.finish();
                            that.$Message.success({
                                content:res.data,
                                duration:2,
                                onClose(){
                                    window.location.href = "/manage/personalManage";
                                }
                            });
                        }else{
                            that.$Loading.error();
                            that.$Message.error(res.data);
                        }
                    })
                    .fail(function(err) {
                        that.$Loading.error();
                        that.$Message.error(err.data);
                    });
                }
            }
        },
        cancelEditStoreUserInfo(){
            window.location = document.referrer;
        },
        uploadHeadIcon(files){
            this.progressPercent = 0;
            let that = this;
            let file = files.target.files[0];
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
                        that.progressPercent = (percentComplete * 100);
                    }, false);
                    return xhr;
                },
                success(res){
                    if(res.status == 200){
                        that.$Message.success("上传成功！");
                        that.formItem.headicon = res.url;
                    }else{
                        that.$Message.error(res.data);
                    }
                }
            })
        }
    },
    created(){
        this.shopId = localStorage.getItem("shopId");
        this.userId = window.location.search.split("userId=")[1];
        if (this.userId != "0") {
            this.isEdit = true;
            this.initData();
        }
    }
})
$(document).ready(function() {
    $('#headIcon_upload_btn').click(function(){
        $('#headIcon_upload_input').click();
    });
});
