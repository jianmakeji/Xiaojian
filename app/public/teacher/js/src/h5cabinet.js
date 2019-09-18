var index = new Vue({
    el:".index",
    data(){
        return{
            h5Address:[],
            isActiveNum:0,
            playH5Address:"",
            courseType:1
        }
    },
    methods:{
        clickNumH5(numH5){
            this.isActiveNum = numH5;
            this.playH5Address = this.h5Address[numH5];
        },
        // 上一个h5
        clickPrevH5(){
            if (this.isActiveNum > 0) {
                this.isActiveNum--;
                this.playH5Address = this.h5Address[this.isActiveNum];
            }
        },
        // 下一个h5
        clickNextH5(){
            let h5Count = 3;
            if (this.courseType != 1) {
                h5Count = 1;
            } else {
                h5Count = 3;
            }
            if (this.isActiveNum < h5Count) {
                this.isActiveNum++;
                this.playH5Address = this.h5Address[this.isActiveNum];
            }
        },
        // 播放h5
        clickPlayH5(){

        },
        // 返回
        clickBackH5(){
            window.close();
        }
    },
    created(){
        let that = this;
        let courseId = window.location.search.split("courseId=")[1];
        $.ajax({
            url: config.ajaxUrls.getCourseByCourseId.replace(":courseId",courseId),
            type: 'GET',
        })
        .done(function(res) {
            if (res.status == 200) {
                that.h5Address = res.data.h5Address.split(",");
                that.playH5Address = that.h5Address[0];
                that.courseType = res.data.courseType;
            } else {
                that.$Message.error(res.data);
            }
        })
        .fail(function() {
            that.$Message.error(err);
        });
    }
})
