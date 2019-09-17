var index = new Vue({
    el:".index",
    data(){
        return{
            shopId:"",
            stopData:config.globalData.storeData,
            searchPersonalValue:"",

            // 列表数据
            tableData:[
                {id:1,name:"陆睿诚",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:2,name:"叶米兰",age:4,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:3,name:"邱叶丹",age:7,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:4,name:"贾阳夏",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:5,name:"卢子石",age:6,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:6,name:"韩嘉志",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:7,name:"万苏",age:3,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:8,name:"梁天宇",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:9,name:"梁丁",age:5,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:10,name:"姜和",age:3,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:11,name:"白语儿",age:4,gender:"女",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2.5"},
                {id:12,name:"郑鸿煊",age:4,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:13,name:"姜和",age:5,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"}
            ],
            columns:[
                {title:"用户ID",key:"id",align:"center",width:100},
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
        shopChange(shopId){
            this.shopId = shopId;
            localStorage.setItem("shopId",shopId);
        },
        // table数据列表事件
        check(userId){
            // window.location.href = "/manage/studentInfo?id=  " + userId;
        },
        back(){
            window.location = document.referrer;
        }
    },
    created(){
        this.shopId = localStorage.getItem("shopId");
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(0).addClass('active');
    }
})
