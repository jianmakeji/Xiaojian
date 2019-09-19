var index = new Vue({
    el:".index",
    data(){
        return{
            shopId:"",
            stopData:config.globalData.storeData,
            userDataSourse:[],
            manageUserDataSourse:[],
            teacherUserDataSourse:[],
            nurseryUserDataSourse:[],
            searchPersonalValue:""
        }
    },
    methods:{
        initData(){
            let that = this;
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.getUserByShopIdOrRealname,
                type: 'GET',
                data: {
                    limit:100,
                    offset:0,
                    shopId:this.shopId,
                    realname:this.searchPersonalValue
                }
            })
            .done(function(res) {
                if(res.status == 200){
                    that.$Loading.finish();
                    if (res.data.rows.length) {
                        for (let i = 0; i < res.data.rows.length; i++) {
                            switch (res.data.rows[i].jobTitle) {
                                case 1:
                                    that.manageUserDataSourse.push(res.data.rows[i]);
                                    break;
                                case 2:
                                    that.teacherUserDataSourse.push(res.data.rows[i]);
                                    break;
                                case 5:
                                    that.nurseryUserDataSourse.push(res.data.rows[i]);
                                    break;
                            }
                        }
                    } else {
                        that.$Message.warning("无更多数据");
                    }
                }else{
                    that.$Loading.error();
                    that.$Message.error(res.data);
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
        shopChange(storeId){
            this.shopId = shopId;
            localStorage.setItem("shopId",shopId);
            this.initData();
        },
        searchPersonalEvent(){
            this.initData();
        },
        addUser(){
            window.location.href = "/manage/editStoreUser?userId=0";
        },
        editStoreUser(userId){
            window.location.href = "/manage/editStoreUser?userId=" + userId;
        },
        deleteStoreUser(userId){
            let that = this;
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.deleteUserById.replace(":userId",userId),
                type: 'DELETE',
                data: {param1: 'value1'}
            })
            .done(function(res) {
                if(res.status == 200){
                    that.$Loading.finish();
                    that.$Message.success({
                        content:res.data,
                        onClose(){
                            that.initData();
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
    },
    created(){
        this.shopId = localStorage.getItem("shopId");
        this.initData();
    }
})
