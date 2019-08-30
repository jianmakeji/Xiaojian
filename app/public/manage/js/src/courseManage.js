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

function lastTime(year,month){
    if(month.length <=1){
        var month = "0"+month;
    }
    var  day = new Date(year,month,0);  
    var lastdate = year + '-' + month + '-' + day.getDate();
    var lastTime = lastdate + " 23:59:59";
    return lastTime;
 }

function dateFormat (date, format) {
    if ((date+'').match('-')) {
        date=date.replace(new RegExp(/-/gm) ,"/");
    }
    date = new Date(date);
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };


    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

// 获取今天是本月第几周
String.prototype.weekIndexInMonth = function () {
    var date = new Date(this.trim() != '' ? this : new Date());
    var dateStart = new Date((new Date(this.trim() != '' ? this : new Date()).setDate(1))); // 本月初
    var firstWeek = 1;
    if (dateStart.getDay() === 1) {
        firstWeek = 1;
    } else if (dateStart.getDay() === 0) {
        firstWeek = 8 - 7 + 1;
    } else {
        firstWeek = 8 - dateStart.getDay() + 1;
    }
    var weekIndex = 1;
    var c = date.getDate();
    if (date.getDay() === 1 && date.getDate() < 7) {
        weekIndex = 1;
    } else if (c < firstWeek ) {
        weekIndex = -1;
    } else {
        if (c < 7) {
            weekIndex = Math.ceil(c/7);
        } else {
            c =  c - firstWeek + 1;
            if (c%7 === 0) {
                if (dateStart.getDay() !== 6) {
                    weekIndex = c/7;
                } else {
                    weekIndex = c/7 + 1;
                }
            } else {
                weekIndex = Math.ceil(c/7);
            }
        }
    }
    return weekIndex;
};

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

// 获取周的区间
String.prototype.getWeekRange = function () {
    var nowDate = new Date(this.trim() != '' ? this : new Date()),
        week = nowDate.getDay(),
        weekStart,
        weekEnd,
        minDiff,
        maxDiff;
    if (week !== 0) {
        minDiff = 1 - week;
    } else {
        minDiff = -6;
    }
    if (minDiff >= 0) {
        weekStart = new Date(nowDate.setDate(nowDate.getDate() + minDiff));
    } else {
        weekStart = new Date(nowDate.setDate(nowDate.getDate() + minDiff));
    }
    nowDate = new Date(this.trim() != '' ? this : new Date()); // 重新赋值，为了取区间结束
    if (week !== 0) {
        maxDiff = 7 - week;
    } else {
        maxDiff = 0;
    }
    weekEnd = new Date(nowDate.setDate(nowDate.getDate() + maxDiff));
    return [dateFormat(weekStart, 'yyyy/MM/dd'), dateFormat(weekEnd, 'yyyy/MM/dd')];
}

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
            storeId:"1",
            storeData:config.globalData.storeData,
            year:"",
            month:"",
            week:"1",
            dateData:config.globalData.dateData,          //每个星期的星期数
            dayData:config.globalData.dayData,            //每个月的日期数
            monthHasDays:0,
            firstWeekDate:0,
            aWeekDateArr:[],
            yearData:config.globalData.yearData,
            monthData:config.globalData.monthData,
            weekData:config.globalData.weekData.slice(0,(new Date()).pattern("yyyy-MM-dd").weekInMonthCount()),

            // 当最后一周包含下个月的日期处理数据
            bothMonthDayArr:[],

            // 主要课程数据
            searchMainCourseValue:"",
            mainModelActive:false,
            subTypeAllIsActive:true,
            subTypeStoryIsActive:false,
            subTypeSongIsActive:false,
            mainCourseDate:[],
            // 次要课程数据
            // 运动课程数据
            searchSportCourseValue:"",
            sportModelActive:false,

            // 教师选择中心数据
            searchTeacherourseValue:"",
            teacherModelActive:false,
        }
    },
    methods:{
        initDate(date){

            this.year = date.pattern("yyyy");
            this.month = (date.getMonth() + 1).toString();
            if (this.month < 10) {
                this.month = "0" + this.month;
            }
            // 该月对应天数
            let monthHasDays = new Date();
            monthHasDays.setMonth(monthHasDays.getMonth()+1);
            monthHasDays.setDate(0);
            this.monthHasDays = monthHasDays.getDate();

            // 该月第一周周一日期
            for (var i = 1; i < this.monthHasDays; i++) {
                let virtualDate = (date.pattern("yyyy") + "-" +  (date.getMonth() + 1) + "-" + i).toString();
                if (parserDate(virtualDate).getDay() == 1) {
                    this.aWeekDateArr = parserDate(virtualDate).pattern("yyyy-MM-dd").split("-");
                    for (var i = 0; i < this.aWeekDateArr.length; i++) {
                        this.aWeekDateArr[i] = parseInt(this.aWeekDateArr[i]);
                        this.firstWeekDate = parseInt(this.aWeekDateArr[2])
                    }
                    break;
                }
            }


        },
        getMainCourseData(courseSubTypeId){
            let that = this;
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.listAllCourseByType,
                type: 'GET',
                data: {
                    courseType:1,
                    courseSubType:courseSubTypeId
                }
            })
            .done(function(res) {
                if (res.status == 200) {
                    console.log(res);
                    that.$Loading.finish();
                    that.mainCourseDate = res.data.rows;
                } else {
                    that.$Loading.error();
                    that.$Message.error(res.data);
                }
            })
            .fail(function(err) {
                that.$Loading.error();
                that.$Message.error(err);
            })
        },
        menuChange(value){
            switch (value) {
                case 1:
                    window.location.href = "/manage/studentManage";
                    break;
                case 2:
                    window.location.href = "/manage/courseContentManage";
                    break;
                default:
            }
        },
        storeChange(value){
            // console.log(value);
        },

        // 课程时间选择
        yearChange(yearValue){
            this.year = yearValue;
            this.month = "01";
            this.week = "1";
            let virtualDate = (this.year + "-" +  this.month + "-1").toString();
            this.initDate(parserDate(virtualDate));
        },
        monthChange(monthNum){
            this.week = "1";
            let virtualDate = (this.year + "-" +  monthNum + "-1").toString();
            this.initDate(parserDate(virtualDate));
        },
        weekChange(weekNum){
            // 改变aWeekDateArr数组
            this.aWeekDateArr[2] = this.firstWeekDate + (parseInt(weekNum) - 1) * 7;

            // 判断该星期中是否包含下个月的日期
            for (let i = 0; i < 7; i++) {
                if (this.aWeekDateArr[2] + i > this.monthHasDays) {
                    this.bothMonthDayArr[i] = this.aWeekDateArr[2] + i - this.monthHasDays;
                }else{
                    this.bothMonthDayArr[i] = "";
                }
            }
        },

        // 主要课程事件
        changeMainCourse(year,month,day,time){
            console.log("打开主要课程Model",year,month,day,time);
            this.mainModelActive = true;
            this.sportModelActive = false;
            this.teacherModelActive = false;

            // 获取基础课程数据
            this.getMainCourseData(0);
        },
        courseSubTypeChange(courseSubTypeId){
            switch (courseSubTypeId) {
                case 0:
                    this.subTypeAllIsActive = true;
                    this.subTypeStoryIsActive = false;
                    this.subTypeSongIsActive = false;
                    break;
                case 1:
                    this.subTypeAllIsActive = false;
                    this.subTypeStoryIsActive = true;
                    this.subTypeSongIsActive = false;
                    break;
                case 2:
                    this.subTypeAllIsActive = false;
                    this.subTypeStoryIsActive = false;
                    this.subTypeSongIsActive = true;
                    break;
                default:
                    return
            }
            // 获取基础课程数据
            this.getMainCourseData(courseSubTypeId);
        },
        closeMainCouseModel(index){
            console.log("关闭主要课程Model",index);
            this.mainModelActive = false;
        },
        searchMainCourseEvent(){
            console.log("点击了主要课程搜索");
        },
        // 次要课程事件

        // 运动课程事件
        changeSportCourse(courseId){
            console.log("打开运动课程Model");
            this.mainModelActive = false;
            this.sportModelActive = true;
            this.teacherModelActive = false;
        },
        searchSportCourseEvent(){
            console.log("点击了主要课程搜索");
        },
        closeSportCouseModel(){
            console.log("关闭运动课程Model");
            this.sportModelActive = false;
        },

        // 教师选择中心事件
        changeTeacher(coursId){
            console.log("打开教师选择中心Model");
            this.mainModelActive = false;
            this.sportModelActive = false;
            this.teacherModelActive = true;
        },
        searchTeacherCourseEvent(){
            console.log("点击了教师搜索");
        },
        closeteacherCouseModel(){
            console.log("关闭教师选择中心Model");
            this.teacherModelActive = false;
        },
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(0).addClass('active');
        let date = new Date();
        this.initDate(date);
    }
})
