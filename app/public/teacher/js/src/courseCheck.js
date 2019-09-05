Date.prototype.pattern=function(fmt) {
    var o = {
    "M+" : this.getMonth()+1, //月份
    "d+" : this.getDate(), //日
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds() //毫秒
    };
    var week = {
    "0" : "/u65e5",
    "1" : "/u4e00",
    "2" : "/u4e8c",
    "3" : "/u4e09",
    "4" : "/u56db",
    "5" : "/u4e94",
    "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

//某月有几周
String.prototype.weekInMonthCount = function () {
    var date = new Date((new Date(this).setDate(1)) || (new Date()).setDate(1));
    var firstWeekDate = 1;// 默认第一周是本月1号  为了模拟本月1号是否为本月第1周的判断
    if (date.getDay() === 1) { // 判断1号是周一
        firstWeekDate = 1;
    } else if (date.getDay() === 0) { // 判断1号是周日
        firstWeekDate = 0;
    } else { // 判断1号是周二至周六之间
        firstWeekDate = 8 - date.getDay() + 1;
    }
    date.setMonth(date.getMonth()+1);
    date.setDate(0);
    var monthHasDays = date.getDate();// 本月天数
    monthHasDays = date.getDate() - firstWeekDate + 1;
    var hasWeek = Math.ceil(monthHasDays/7); // 计算本月有几周
    return hasWeek;
};
function parserDate(date) {
    var t = Date.parse(date);
    if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        return new Date();
    }
};

var index = new Vue({
    el:".index",
    data(){
        return{
            shopId:"1",
            stopData:config.globalData.storeData,


            dataSourse:new Array(),
            weekIndex:0,
            timeIndex:0,

            // 下拉框数据源
            dateData:config.globalData.dateData,          // 每个星期的星期数
            dayData:config.globalData.dayData,            // 每个月的日期数据
            yearData:config.globalData.yearData,
            monthData:config.globalData.monthData,
            weekData:[],
            year:"",
            month:"",
            week:"1",
            monthHasDays:0,
            thisWeekMonthArray:[],
            thisWeekDayArray:[],
        }
    },
    methods:{
        menuChange(value){
            $(".menuBtns").children('.active').removeClass('active');
            $(".menuBtns").children().eq(value).addClass('active');
            switch (value) {
                case 1:
                    window.location.href = "/teacher/personalManage";
                    break;
                case 2:
                    window.location.href = "/teacher/courseContentManage";
                    break;
                default:
            }
        },
        initDataSourse(){
            let that = this;
            for(let i = 0;i < 7;i++){
                this.dataSourse[i] = new Array();
                for (let j = 0; j < 4; j++) {
                    this.dataSourse[i][j] = {
                        courseThumbA:"",
                        courseTitleA:"",
                        courseThumbB:"",
                        courseTitleB:"",
                        shopId:"",
                        courseNumber:"",
                        teacherName:"点击选择",
                        teacherId:"",
                        courseAId:"",
                        courseBId:"",
                        courseDate:"",
                        xclasssId:"",
                    };
                }
            }
            $.ajax({
                url: config.ajaxUrls.listCourseByDate,
                type: 'GET',
                data: {
                    shopId: this.shopId,
                    courseDate:this.year+ "-" + this.thisWeekMonthArray[0] + "-" + this.thisWeekDayArray[0]
                }
            })
            .done(function(res) {
                if (res.status == 200) {
                    let data = res.data;
                    // if (res.data.length == 0 ) {
                    //     that.hasData = false;
                    // } else {
                    //     that.hasData = true;
                    // }
                    for (let i = 0; i < data.length; i++) {
                        // 每一项解析出月日
                        let courseNumStr = data[i].courseNumber;
                        let dayStr = data[i].courseDate.split("-")[2];

                        // 遍历日期
                        for (let dayItem = 0; dayItem < that.thisWeekDayArray.length; dayItem++) {

                            for (let courseItem = 0; courseItem < 4; courseItem++) {
                                if (courseNumStr == courseItem + 1) {
                                    if (that.thisWeekDayArray[dayItem] == parseInt(dayStr)) {
                                        that.dataSourse[dayItem][courseItem].courseAId = data[i].courseA.Id;
                                        that.dataSourse[dayItem][courseItem].courseThumbA = data[i].courseA.courseThumbB;
                                        that.dataSourse[dayItem][courseItem].courseTitleA = data[i].courseA.courseName;
                                        that.dataSourse[dayItem][courseItem].courseBId = data[i].courseB.Id;
                                        that.dataSourse[dayItem][courseItem].courseThumbB = data[i].courseB.courseThumbB;
                                        that.dataSourse[dayItem][courseItem].courseTitleB = data[i].courseB.courseName;
                                        that.dataSourse[dayItem][courseItem].shopId = data[i].shopId;
                                        that.dataSourse[dayItem][courseItem].courseNumber = data[i].courseNumber;
                                        that.dataSourse[dayItem][courseItem].teacherName = data[i].teacher.realname;
                                        that.dataSourse[dayItem][courseItem].teacherId = data[i].teacher.Id;
                                        that.dataSourse[dayItem][courseItem].courseDate = data[i].courseDate;
                                        that.dataSourse[dayItem][courseItem].xclasssId = data[i].xclassId;
                                    }
                                }
                            }
                        }
                    }
                    that.$forceUpdate();
                    console.log(that.dataSourse);
                } else {
                    that.$Message.error(res.data);
                }
            });
        },
        // 日历操作
        initDate(date){
            //2020-03-1
            this.weekData = config.globalData.weekData.slice(0,date.pattern("yyyy-MM-dd").weekInMonthCount());
            this.year = date.pattern("yyyy");
            this.month = (date.getMonth() + 1).toString();

            // 该月对应天数
            let monthHasDays = new Date();
            monthHasDays.setMonth(date.getMonth()+1);
            monthHasDays.setDate(0);
            this.monthHasDays = monthHasDays.getDate();

            // 装有一周内所以月、日数据的数组[{month:09,day:01}]
            this.thisWeekMonthArray = [];
            this.thisWeekDayArray = [];
            for (var i = 1,j=1; i <= this.monthHasDays; i++) {
                let virtualDate1 = (date.pattern("yyyy") + "-" +  (date.getMonth() + 1) + "-" + i).toString();
                if (parserDate(virtualDate1).getDay() == 1) {
                    if (j == parseInt(this.week)) {
                        let aa = parserDate(virtualDate1).pattern("yyyy-MM-dd").split("-")
                        for (let k = 0,z = 1; k < 7; k++) {
                            if (parseInt(aa[2]) + k > this.monthHasDays) {
                                if (parseInt(aa[1]) < 12) {
                                    this.thisWeekMonthArray.push(parseInt(aa[1]) + 1);
                                    this.thisWeekDayArray.push(z);
                                    z++;
                                }else{
                                    this.thisWeekMonthArray.push("1");
                                    this.thisWeekDayArray.push(z);
                                    z++;
                                }
                            } else {
                                this.thisWeekMonthArray.push(parseInt(aa[1]));
                                this.thisWeekDayArray.push(parseInt(aa[2]) + k);
                            }
                        }
                    }
                    j++;
                }
            }

        },
        // 筛选事件
        stopChange(shopId){
            this.shopId = shopId;
            let virtualDate = (this.year + "-" +  this.month + "-1").toString();
            this.initDate(parserDate(virtualDate));
            this.initDataSourse();
        },
        yearChange(yearValue){
            this.year = yearValue;
            this.month = "01";
            this.week = "1";
            let virtualDate = (this.year + "-" +  this.month + "-1").toString();
            this.initDate(parserDate(virtualDate));
            this.initDataSourse();
        },
        monthChange(monthNum){
            this.week = "1";
            let virtualDate = (this.year + "-" +  monthNum + "-1").toString();
            this.initDate(parserDate(virtualDate));
            this.initDataSourse();
        },
        weekChange(weekNum){
            this.week = weekNum;
            let virtualDate = (this.year + "-" +  this.month + "-1").toString();
            this.initDate(parserDate(virtualDate));
            this.initDataSourse();
        },

        // 课程列表
        studentListCheck(day,time){
            let classsId = this.dataSourse[day][time].xclasssId;
            window.location.href = "/teacher/courseStudentList";
        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(0).addClass('active');
        let date = new Date();
        this.initDate(date);
        this.initDataSourse();
    }
})
