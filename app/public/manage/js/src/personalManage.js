var index = new Vue({
    el:".index",
    data(){
        return{
            storeId:"1",
            storeData:config.globalData.storeData,
            userDataSourse:[],
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
                    limit:9,
                    offset:0,
                    shopId:this.storeId,
                    realname:this.searchPersonalValue
                }
            })
            .done(function(res) {
                if(res.status == 200){
                    that.$Loading.finish();
                    if (res.data.rows.length) {
                        that.userDataSourse = res.data.rows;
                    } else {
                        that.$Message.warning("无更多数据");
                        that.userDataSourse = res.data.rows;
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
        storeChange(storeId){
            this.storeId = storeId;
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
        this.initData();
    }
})
