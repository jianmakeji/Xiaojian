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


var index = new Vue({
    el:".index",
    data(){
        return{
            storeId:"1",
            storeData:config.globalData.storeData,
            year:"",
            month:"",
            week:"",
            yearData:config.globalData.yearData,
            monthData:config.globalData.monthData,
            weekData:config.globalData.weekData,

            // 主要课程数据
            searchMainCourseValue:"",

            // 次要课程数据
            // 运动课程数据
            searchSportCourseValue:"",

            // 教师选择中心数据
            searchTeacherourseValue:""
        }
    },
    methods:{
        initData(){
            let nowDate = new Date();
            // console.log(nowDate.pattern("yyyy-M-dd"));
            // console.log(nowDate.pattern("yyyy-MM-dd").weekIndexInMonth());
            this.year = nowDate.pattern("yyyy");
            this.month = nowDate.getMonth().toString();

            console.log();;
            if(nowDate.pattern("yyyy-MM-dd").weekIndexInMonth().toString() == "-1"){
                let newDate = "";
                if(nowDate.getMonth() + 1 < 10 ){
                    newDate = nowDate.getYear() + "-0" + newDate.getMonth() + "-" +  lastTime(nowDate.getYear(),nowDate.getMonth()+1).split(" ")[0].split("-")[2]);
                    console.log(newDate);
                }else{
                    10
                }
            }

            // console.log(nowDate.getMonth());
            // this.week = nowDate.pattern("yyyy-MM-dd").weekIndexInMonth().toString();

            // console.log(nowDate.pattern("yyyy-MM-dd").getWeekRange());

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
            console.log(value);
        },
        yearChange(value){

        },
        monthChange(value){

        },
        weekChange(value){

        },
        // 主要课程事件
        changeMainCourse(courseId){
            console.log("打开主要课程Model");
            $('.mainCourseModel').addClass('active');
        },
        closeMainCouseModel(){
            console.log("关闭主要课程Model");
            $(".mainCourseModel").removeClass('active');
        },
        searchMainCourseEvent(){
            console.log("点击了主要课程搜索");
        },
        // 次要课程事件

        // 运动课程事件
        changeSportCourse(courseId){
            console.log("打开运动课程Model");
            $('.sportCourseModel').addClass('active');
        },
        searchSportCourseEvent(){
            console.log("点击了主要课程搜索");
        },
        closeSportCouseModel(){
            console.log("关闭运动课程Model");
            $(".sportCourseModel").removeClass('active');
        },

        // 教师选择中心事件
        changeTeacher(coursId){
            console.log("打开教师选择中心Model");
            $('.teacherCourseModel').addClass('active');
        },
        searchTeacherCourseEvent(){
            console.log("点击了教师搜索");
        },
        closeteacherCouseModel(){
            console.log("关闭教师选择中心Model");
            $('.teacherCourseModel').removeClass('active');
        },
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(0).addClass('active');
        this.initData();
    }
})
