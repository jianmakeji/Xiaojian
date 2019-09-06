var index = new Vue({
    el:".index",
    data(){
        return{
            // 列表数据
            tableData:[
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
                {id:"2019/8/1",name:"是",age:"主要课程《咏鹅》，辅助课程《篮球》",gender:"9:00",status:"10:00",isJoin:"1.5"},
            ],
            columns:[
                {title:"日期",key:"id",align:"center",width:100},
                {title:"是否参与交互课程",key:"name",align:"center"},
                {title:"课程内容",key:"age",align:"center"},
                {title:"进入时间",key:"gender",align:"center"},
                {title:"出去时间",key:"status",align:"center"},
                {title:"消费积分",key:"isJoin",align:"center"}
            ],
        }
    },
    methods:{
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
        back(){
            window.location = document.referrer;
        }
    },
    created(){

            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(0).addClass('active');
    }
})
