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
            shopId:"",
            stopData:config.globalData.storeData,

            dateData:config.globalData.dateData,          // 每个星期的星期数
            dayData:config.globalData.dayData,            // 每个月的日期数据
            monthHasDays:0,                               // 每个月有多少天
            // firstWeekDate:0,
            // aWeekDateArr:[],

            // 修改后数据
            // 选择下的本周一周数据
            thisWeekMonthArray:[],
            thisWeekDayArray:[],

            // 下拉框初始值
            year:"",
            month:"",
            week:"1",
            // 下拉框数据源
            yearData:config.globalData.yearData,
            monthData:config.globalData.monthData,
            weekData:[],

            // 当最后一周包含下个月的日期处理数据
            bothMonthDayArr:[],

            // 主要课程数据
            mainCourseFocus:"",
            mainSubTypeId:"",
            searchMainCourseValue:"",
            mainModelActive:false,
            subTypeMainAllIsActive:true,
            subTypeStoryIsActive:false,
            subTypeSongIsActive:false,
            mainCourseDate:[],
            dateInfo:"",            //记录是那个课程点击的选课弹出层
            // 次要课程数据
            // 运动课程数据
            sportCourseFocus:"",
            sportSubTypeId:"",
            sportCourseDate:[],
            subTypeSportAllIsActive:true,
            subTypeBasketballIsActive:false,
            subTypeCommonsenseIsActive : false,
            subTypeArtIsActive : false,
            searchSportCourseValue:"",
            sportModelActive:false,

            // 教师选择中心数据
            teacherFocus:"",
            teacherCourseDate:[],
            searchTeacherourseValue:"",
            teacherModelActive:false,
            bigMap:new Map(),
            smallMap:new Map(),

            // 数据二位数组
            dataSourse:new Array(),
            weekIndex:0,
            timeIndex:0,

            // 根据当前是否有数据，判断是新建还是修改
            hasData:false
        }
    },
    methods:{
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
                        teacherName:"无",
                        teacherId:"",
                        courseAId:"",
                        courseBId:"",
                        courseDate:"",
                        xclassId:"",
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
                    if (res.data.length == 0 ) {
                        that.hasData = false;
                    } else {
                        that.hasData = true;
                    }
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
                                        that.dataSourse[dayItem][courseItem].xclassId = data[i].xclassId;
                                    }
                                }
                            }
                        }
                    }
                    that.$forceUpdate();
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
        shopChange(shopId){
            this.shopId = shopId;
            localStorage.setItem("shopId",shopId);
            let virtualDate = (this.year + "-" +  this.month + "-1").toString();
            this.initDate(parserDate(virtualDate));
            this.initDataSourse();
        },
        closeModel(){
            // 清除基础课程，辅助课程active状态
            this.mainCourseFocus = "";
            this.sportCourseFocus = "";

            this.mainModelActive = false;
            this.sportModelActive = false;
            this.teacherModelActive = false;
        },
        // 课程时间选择
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
        // ******************************************************************
        // 基础课程事件
        // ******************************************************************
        getMainCourseData(courseSubTypeId,courseName){
            let that = this;
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.listAllCourseByType,
                type: 'GET',
                data: {
                    courseName:courseName,
                    courseType:"1",
                    courseSubType:courseSubTypeId
                }
            })
            .done(function(res) {
                if (res.status == 200) {
                    that.$Loading.finish();
                    that.mainCourseDate = res.data;
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
        // 点击弹出基础课程选择框
        // 输入的日期数据有可能存在number类型    0 0 "2019" "09" "02" 1
        changeMainCourse(weekIndex,timeIndex,year,month,day,time){
            this.mainCourseFocus = weekIndex + "-" + timeIndex;
            this.sportCourseFocus = "";
            this.teacherFocus = "";

            this.mainModelActive = true;
            this.sportModelActive = false;
            this.teacherModelActive = false;

            // 记录点击的坐标轴位置
            this.weekIndex = weekIndex;
            this.timeIndex = timeIndex;


            // 将日期字符串规范化
            if (typeof month == "number" && month < 10) {
                month = "0" + month.toString();
            }
            if (typeof day == "number" && day < 10 ) {
                day = "0" + day.toString();
            }
            this.dateInfo = year + "-" + month + "-" + day + "#" + time;
            // 获取基础课程数据
            this.getMainCourseData(0,this.searchMainCourseValue);
        },

        // 筛选基础课程的子类别
        mainCourseSubTypeChange(courseSubTypeId){
            this.mainSubTypeId = courseSubTypeId;
            switch (courseSubTypeId) {
                case 0:
                    this.subTypeMainAllIsActive = true;
                    this.subTypeStoryIsActive = false;
                    this.subTypeSongIsActive = false;
                    break;
                case 1:
                    this.subTypeMainAllIsActive = false;
                    this.subTypeStoryIsActive = true;
                    this.subTypeSongIsActive = false;
                    break;
                case 2:
                    this.subTypeMainAllIsActive = false;
                    this.subTypeStoryIsActive = false;
                    this.subTypeSongIsActive = true;
                    break;
                default:
                    return
            }
            // 获取基础课程数据
            this.getMainCourseData(this.mainSubTypeId,this.searchMainCourseValue);
        },
        // 点击确认基础课程选择
        chooseTheMainCourse(index){
            let indexData = this.mainCourseDate[index];
            let mapKeyText = this.dateInfo.split("#")[0].split("-").join("");

            this.dataSourse[this.weekIndex][this.timeIndex].courseThumbA = indexData.courseThumbA;
            this.dataSourse[this.weekIndex][this.timeIndex].courseTitleA = indexData.courseName;
            this.dataSourse[this.weekIndex][this.timeIndex].shopId = this.shopId;
            this.dataSourse[this.weekIndex][this.timeIndex].courseAId = indexData.Id;
            this.dataSourse[this.weekIndex][this.timeIndex].courseDate = this.dateInfo.split("#")[0];
            this.dataSourse[this.weekIndex][this.timeIndex].courseNumber = this.dateInfo.split("#")[1];

            this.dataSourse[this.weekIndex][this.timeIndex].xclassId = "1";
            this.mainModelActive = false;

        },
        // 搜索基础课程筛选
        searchMainCourseEvent(){
            let that = this;

            this.getMainCourseData(this.mainSubTypeId,this.searchMainCourseValue);

        },

        // ******************************************************************
        // 次要课程事件
        // ******************************************************************

        // ******************************************************************
        // 运动课程事件
        // ******************************************************************

        getSportCourseData(courseSubTypeId,courseName){
            let that = this;
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.listAllCourseByType,
                type: 'GET',
                data: {
                    courseName:courseName,
                    courseType:"2,3",
                    courseSubType:courseSubTypeId
                }
            })
            .done(function(res) {
                if (res.status == 200) {
                    that.$Loading.finish();
                    that.sportCourseDate = res.data;
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
        changeSportCourse(weekIndex,timeIndex,year,month,day,time){
            this.mainCourseFocus = "";
            this.sportCourseFocus = weekIndex + "-" + timeIndex;
            this.teacherFocus = "";

            this.mainModelActive = false;
            this.sportModelActive = true;
            this.teacherModelActive = false;

            // 记录点击的坐标轴位置
            this.weekIndex = weekIndex;
            this.timeIndex = timeIndex;

            if (typeof month == "number" && month < 10) {
                month = "0" + month.toString();
            }
            if (typeof day == "number" && day < 10 ) {
                day = "0" + day.toString();
            }
            this.dateInfo = year + "-" + month + "-" + day + "#" + time;
            // 获取基础课程数据
            this.getSportCourseData(this.sportSubTypeId,this.searchSportCourseValue);
        },
        searchSportCourseEvent(){
            this.getSportCourseData(this.sportSubTypeId,this.searchSportCourseValue);
        },
        // 筛选基础课程的子类别
        sportCourseSubTypeChange(courseSubTypeId){
            this.sportSubTypeId = courseSubTypeId;
            switch (courseSubTypeId) {
                case 0:
                    this.subTypeSportAllIsActive = true;
                    this.subTypeCommonsenseIsActive = false;
                    this.subTypeArtIsActive = false;
                    this.subTypeBasketballIsActive = false;
                    break;
                case 3:
                    this.subTypeSportAllIsActive = false;
                    this.subTypeCommonsenseIsActive = true;
                    this.subTypeArtIsActive = false;
                    this.subTypeBasketballIsActive = false;
                    break;
                case 4:
                    this.subTypeSportAllIsActive = false;
                    this.subTypeCommonsenseIsActive = false;
                    this.subTypeArtIsActive = true;
                    this.subTypeBasketballIsActive = false;
                    break;
                case 5:
                    this.subTypeSportAllIsActive = false;
                    this.subTypeCommonsenseIsActive = false;
                    this.subTypeArtIsActive = false;
                    this.subTypeBasketballIsActive = true;
                    break;
                default:
                    return
            }
            // 获取基础课程数据
            this.getSportCourseData(this.sportSubTypeId,this.searchSportCourseValue);
        },
        chooseTheSportCourse(index){
            let indexData = this.sportCourseDate[index];
            let mapKeyText = this.dateInfo.split("#")[0].split("-").join("");

            this.dataSourse[this.weekIndex][this.timeIndex].courseThumbB = indexData.courseThumbA;
            this.dataSourse[this.weekIndex][this.timeIndex].courseTitleB = indexData.courseName;
            this.dataSourse[this.weekIndex][this.timeIndex].shopId = this.shopId;
            this.dataSourse[this.weekIndex][this.timeIndex].courseBId = indexData.Id;
            this.dataSourse[this.weekIndex][this.timeIndex].courseDate = this.dateInfo.split("#")[0];
            this.dataSourse[this.weekIndex][this.timeIndex].courseNumber = this.dateInfo.split("#")[1];

            this.sportModelActive = false;
        },

        // ***************************************
        // 教师选择中心事件
        // **************************************
        getTeacherData(teacherName){
            let that = this;
            this.$Loading.start();
            $.ajax({
                url: config.ajaxUrls.getTeacherByShopId,
                type: 'GET',
                data: {
                    realname:teacherName,
                    shopId:this.shopId,
                }
            })
            .done(function(res) {
                if (res.status == 200) {
                    that.$Loading.finish();
                    that.teacherCourseDate = res.data.rows;
                } else {
                    that.$Loading.error();
                    that.$Message.error(res.data);
                }
            })
            .fail(function(err) {
                that.$Loading.error();
                that.$Message.error(err);
            });
        },
        changeTeacher(weekIndex,timeIndex,year,month,day,time){
            this.mainCourseFocus = "";
            this.sportCourseFocus = "";
            this.teacherFocus = weekIndex + "-" + timeIndex;

            this.mainModelActive = false;
            this.sportModelActive = false;
            this.teacherModelActive = true;

            // 记录点击的坐标轴位置
            this.weekIndex = weekIndex;
            this.timeIndex = timeIndex;

            if (typeof month == "number" && month < 10) {
                month = "0" + month.toString();
            }
            if (typeof day == "number" && day < 10 ) {
                day = "0" + day.toString();
            }
            this.dateInfo = year + "-" + month + "-" + day + "#" + time;
            // 获取基础课程数据
            this.getTeacherData("");
        },
        searchTeacherCourseEvent(){
            // 获取基础课程数据
            this.getTeacherData(this.searchTeacherourseValue);
        },
        chooseTheTeacherCourse(teacherId,teacherName){
            this.dataSourse[this.weekIndex][this.timeIndex].teacherId = teacherId;
            this.dataSourse[this.weekIndex][this.timeIndex].teacherName = teacherName;

            this.teacherModelActive = false;
        },

        // 查看学生名单
        checkStudentList(Id){
            window.location.href = "/manage/courseStudentList?id=" + Id;
        },
        // 上传所有课程选择
        submitCourseChoose(){
            // 预留 xclassId
            // let xclasssId = 1;
            //
            // 去重函数
            function unique(array) {
                return Array.from(new Set(array));
            }
            let copyDataSourse = new Array();
            let aoData = new Array();
            copyDataSourse = this.dataSourse;
            for (let i = 0; i < copyDataSourse.length; i++) {
                for (let j = 0; j < copyDataSourse[i].length; j++) {
                    let dataSourseItem = copyDataSourse[i][j];
                    if (dataSourseItem.shopId == "" && dataSourseItem.courseNumber == "" && dataSourseItem.teacherId == "" && dataSourseItem.courseAId == "" && dataSourseItem.courseBId == "" && dataSourseItem.courseDate == "" && dataSourseItem.xclassId == "") {
                        copyDataSourse[i][j] = "";
                    }
                }
            }
            let canSubmit = true;
            for (let i = 0; i < copyDataSourse.length; i++) {
                for (let j = 0; j < copyDataSourse[i].length; j++) {
                    if( copyDataSourse[i][j] != "" ){
                        if (copyDataSourse[i][j].courseAId != "" && copyDataSourse[i][j].courseBId != "" && copyDataSourse[i][j].teacherId != "") {
                            aoData.push(copyDataSourse[i][j]);
                        }else{
                            canSubmit = false;
                            this.$Message.error("内容输入有误，选课时“课程”与“老师”为必填项！")
                            break;
                        }
                    }
                }
            }
            let that = this;
            this.$Loading.start();
            if (canSubmit) {
                if (that.hasData) {
                    let aoDataStr = {
                        "shopId":that.shopId,
                        "courseDate": "'" + that.year + "-" + that.thisWeekMonthArray[0] + "-" + that.thisWeekDayArray[0] + "'",
                        "data": aoData
                    };
                    $.ajax({
                        url: config.ajaxUrls.updateCourseByDate,
                        dataType:"json",
                        contentType:"application/json",
                        type: 'PUT',
                        data: JSON.stringify(aoDataStr)
                    })
                    .done(function(res) {
                        if(res.status == 200){
                            that.$Loading.finish();
                            that.$Message.success(res.data);
                            let date = parserDate(that.year + "-" + that.thisWeekMonthArray[0] + "-" + that.thisWeekDayArray[0]);
                            that.initDate(date);
                            that.initDataSourse();
                        }else{
                            that.$Loading.error();
                            that.$Message.error(res.data);
                        }
                    })
                    .fail(function(err) {
                        that.$Loading.error();
                        that.$Message.success(err.data);
                    })
                } else {
                    $.ajax({
                        url: config.ajaxUrls.createCourseChoose,
                        dataType:"json",
                        contentType:"application/json",
                        type: 'POST',
                        data: JSON.stringify( aoData )
                    })
                    .done(function(res) {
                        if(res.status == 200){
                            that.$Loading.finish();
                            that.$Message.success(res.data);
                            let date = parserDate(that.year + "-" + that.thisWeekMonthArray[0] + "-" + that.thisWeekDayArray[0]);
                            that.initDate(date);
                            that.initDataSourse();
                        }else{
                            that.$Loading.error();
                            that.$Message.error(res.data);
                        }
                    })
                    .fail(function(err) {
                        that.$Loading.error();
                        that.$Message.success(err.data);
                    })
                }

            }
        }
    },
    created(){
        if (localStorage.getItem("shopId")) {
            this.shopId = localStorage.getItem("shopId");
        } else {
            this.shopId = "1";
            localStorage.setItem("shopId","1");
        }
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(0).addClass('active');
        let date = new Date();
        this.initDate(date);
        this.initDataSourse();
    }
})
