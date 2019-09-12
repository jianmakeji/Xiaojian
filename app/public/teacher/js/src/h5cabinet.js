var index = new Vue({
    el:".index",
    data(){
        return{
            h5Address:""
        }
    },
    methods:{

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
                // console.log(res.data);
                that.h5Address = res.data.h5Address;
            } else {
                that.$Message.error(res.data);
            }
        })
        .fail(function() {
            that.$Message.error(err);
        });
    }
})
