var index = new Vue({
    el:".index",
    data(){
        return{
            searchPersonalValue:"",

            // 列表数据
            tableData:[
                {id:1,name:"陆睿诚",age:5,gender:"男",status:"健康",isJoin:"陆阳朔",inTime:"18888888881",outTime:"8"},
                {id:2,name:"叶米兰",age:4,gender:"女",status:"健康",isJoin:"叶俊豪",inTime:"18888888882",outTime:"10"},
                {id:3,name:"邱叶丹",age:7,gender:"女",status:"健康",isJoin:"邱阳",inTime:"18888888883",outTime:"12"},
                {id:4,name:"贾阳夏",age:5,gender:"男",status:"健康",isJoin:"罗秀慧",inTime:"18888888884",outTime:"15"},
                {id:5,name:"卢子石",age:6,gender:"男",status:"健康",isJoin:"尹虹玉",inTime:"18888888885",outTime:"7"},
                {id:6,name:"韩嘉志",age:5,gender:"男",status:"健康",isJoin:"袁宝琳",inTime:"18888888886",outTime:"9"},
                {id:7,name:"万苏",age:3,gender:"女",status:"健康",isJoin:"何天兰",inTime:"18888888887",outTime:"9"},
                {id:8,name:"梁天宇",age:5,gender:"男",status:"健康",isJoin:"侯一茹",inTime:"18888888888",outTime:"20"},
                {id:9,name:"梁丁",age:5,gender:"女",status:"健康",isJoin:"段莹",inTime:"18888888889",outTime:"30"},
                {id:10,name:"姜和",age:3,gender:"男",status:"健康",isJoin:"马伊",inTime:"18888888810",outTime:"90"},
                {id:11,name:"白语儿",age:3,gender:"女",status:"健康",isJoin:"姚怡金",inTime:"18888888811",outTime:"6"},
                {id:12,name:"郑鸿煊",age:4,gender:"男",status:"健康",isJoin:"汪鹏",inTime:"18888888812",outTime:"8"},
                {id:13,name:"汪浩",age:5,gender:"男",status:"健康",isJoin:"姚锦",inTime:"18888888813",outTime:"9"},
            ],
            columns:[
                {title:"用户ID",key:"id",align:"center",width:100},
                {title:"用户名称",key:"name",align:"center"},
                {title:"年龄",key:"age",align:"center"},
                {title:"性别",key:"gender",align:"center"},
                {title:"健康状况",key:"status",align:"center"},
                {title:"家长姓名",key:"isJoin",align:"center"},
                {title:"家长联系方式",key:"inTime",align:"center"},
                {title:"剩余积分",key:"outTime",align:"center"},
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
                           }, '查看'),
                           h('Button', {
                              props: { type: 'primary', size: 'small' },
                              style: { marginRight: '5px' },
                              on: {
                                  click: () => {
                                      this.remove(params.index)
                                  }
                              }
                          }, '删除')
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
                case 2:
                    window.location.href = "/manage/courseContentManage";
                    break;
                default:
            }
        },
        searchPersonalEvent(){

        },
        // table数据列表事件
        check(userId){
            window.location.href = "/manage/userClassHistory?id=" + userId;
        },
        remove(){

        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(1).addClass('active');
    }
})
