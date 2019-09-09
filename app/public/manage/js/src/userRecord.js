var index = new Vue({
    el:".index",
    data(){
        return{
            storeId:"",
            storeData:[
                {value: '1',label: '店铺A'},
                {value: '2',label: '店铺B'}
            ],
            searchPersonalValue:"",

            // 列表数据
            tableData:[
                {id:1,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:2,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:3,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:4,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:5,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:6,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:7,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:8,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:9,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
                {id:10,name:"王小我",age:10,gender:"男",status:"健康",isJoin:"是",inTime:"15:00",outTime:"16:34",totalCode:"2"},
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
