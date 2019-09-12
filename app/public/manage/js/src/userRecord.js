var index = new Vue({
    el:".index",
    data(){
        return{
            storeId:"",
            storeData:config.globalData.storeData,
            searchPersonalValue:"",

            // 列表数据
            // 列表数据
            tableData:[
                {id:"2019/8/12",name:"陆睿诚",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:"2019/8/12",name:"叶米兰",age:4,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:"2019/8/12",name:"邱叶丹",age:7,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:"2019/8/12",name:"贾阳夏",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:"2019/8/12",name:"卢子石",age:6,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:"2019/8/12",name:"韩嘉志",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:"2019/8/12",name:"万苏",age:3,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:"2019/8/12",name:"梁天宇",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:"2019/8/12",name:"梁丁",age:5,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:"2019/8/12",name:"姜和",age:3,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:"2019/8/12",name:"白语儿",age:4,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:"2019/8/12",name:"郑鸿煊",age:4,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:"2019/8/12",name:"姜和",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"}
            ],
            columns:[
                {title:"日期",key:"id",align:"center",width:100},
                {title:"用户名称",key:"name",align:"center"},
                {title:"年龄",key:"age",align:"center"},
                {title:"性别",key:"gender",align:"center"},
                {title:"健康状况",key:"status",align:"center"},
                {title:"是否参与交互课程",key:"isJoin",align:"center"},
                {title:"进入时间",key:"inTime",align:"center"},
                {title:"出去时间",key:"outTime",align:"center"},
                {title:"总消费积分",key:"totalCode",align:"center"},
                {title:"操作",key:"opt",align:"center",
                    render:(h,params) => {
                        return h('div', [
                            h('Button', {
                               props: { type: 'primary', size: 'small' },
                               style: { marginRight: '5px' },
                               on: {
                                   click: () => {
                                       this.check(params.index)
                                   }
                               }
                            }, '查看')
                       ]);
                    }
                },
            ],
        }
    },
    methods:{
        menuChange(value){
            console.log(typeof value);
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
        searchPersonalEvent(){

        },
        // 查看用户的上课记录
        check(userId){
            window.location.href = "/manage/userClassHistory?id=" + userId;
        },
        remove(){

        }
    },
    created(){

            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(0).addClass('active');
    }
})
