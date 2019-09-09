
var index = new Vue({
    el:".index",
    data(){
        return{
            // 列表数据
            tableData:[
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"},
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"},
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"},
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"},
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"},
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"},
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"},
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"},
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"},
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"188888888888",outTime:"8"}
            ],
            columns:[
                {title:"用户ID",key:"id",align:"center",width:100},
                {title:"用户名称",key:"name",align:"center"},
                {title:"年龄",key:"age",align:"center"},
                {title:"性别",key:"gender",align:"center"},
                {title:"健康状况",key:"status",align:"center"},
                {title:"是否参与交互课程",key:"isJoin",align:"center"},
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
                            }, '查看')
                       ]);
                    }
                },
            ],
        }
    },
    methods:{
        menuChange(value){
            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(value).addClass('active');
            switch (value) {
                case 0:
                    window.location.href = "/teacher/courseCheck";
                    break;
                case 1:
                    window.location.href = "/teacher/personalManage";
                    break;
                case 2:
                    window.location.href = "/teacher/courseContentManage";
                    break;
                default:
            }
        },
        backToCourseCheck(){
            window.location.href = '/teacher/courseCheck';
        },
        check(index){
            window.location.href = '/teacher/studentInfo';
        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(0).addClass('active');
    }
})
