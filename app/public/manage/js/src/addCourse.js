var index = new Vue({
    el:".index",
    data(){
        return{
            // 上传参数对象
            formItem:{
                courseName:"",
                courseAbstract:"",
                courseThumbA:"",
                courseThumbB:"",
                h5Address:"",
                courseType:"",
                courseSubType:""
            },

            // 课程类别和标签数据
            courseTypeData:config.globalData.courseTypeData,
            courseSubTypeData:config.globalData.courseSubTypeData,

            // 缩略图和h5临时变量
            fileName_1:"",
			imgUrl_1:"",
			progressPercent_1:0,
			fileName_2:"",
			imgUrl_2:"",
			progressPercent_2:0,
			fileName_3:"",
			imgUrl_3:"",
			progressPercent_3:0,
            attachFileName:"",
            attachFilePercent:"",
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
        // 上传缩略图
        doUpload_1(files){

        },
        doUpload_2(files){

        },
        step2_upload_ZIP_change(){

        },
        courseTypeChange(){

        },
        courseSubTypeChange(){

        }
    },
    created(){
        $(".menuBtns").children('.active').removeClass('active');
        $(".menuBtns").children().eq(2).addClass('active');
    }
})



/**
 * 文件名编码
 */
function random_string(len) {
	len = len || 32;
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = chars.length;
	var pwd = '';
	for(let i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

function get_suffix(filename) {
	let pos = filename.lastIndexOf('.');
	let suffix = '';
	if(pos != -1) {
		suffix = filename.substring(pos);
	}
	return suffix;
}

function calculate_object_name(filename) {

	let suffix = get_suffix(filename);
	let g_object_name = random_string(10) + suffix;

    return g_object_name;
}
