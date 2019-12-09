//请在layout中紧跟jq引入

//获取GET请求参数
function getGET(key){
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)","i")
    return location.search.substr(1).match(reg)
}//null or Array[2]

//弹窗
function rewardsLog(h3,h4){
    $(".rewards-popover h3").text(h3)
    $(".rewards-popover h4").html(h4)
}
function rewardsON(){
    rewardsLog("操作失败","可能是网络原因")
    $(".rewards-popover-mask").css("display","block").on('click', function(){
        $(this).css("display","none");
    })
    $(".rewards-popover").css("display","block")
}
//重定向
function countDown(secs, surl) {
	var $jumpTo = $(".rewards-popover h4 span");
	$jumpTo.html(secs)
	if(--secs > 0) {
		setTimeout("countDown(" + secs + ",'" + surl + "')", 1000);
	} else {
		location.href = surl;
	}
}//countDown(3, '/index');

//请求登录状态
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url:"/user/isLogin/",  
        data:{},
        async: false,  
        error: function(request) {  
            rewardsON()
            rewardsLog("登录状态检查失败","请检查您的网络")
        },  
        success: function(data) {
            window.isLogin=data.msg
        }  
    }); 
})

//请求注销登录
function logout(){
    $.ajax({
        type: "GET",
        url:"/user/logout/",  
        data:{},
        async: false,  
        error: function(request) {  
            rewardsON()
        },  
        success: function(data) {  
            if (data.msg==true){
                rewardsON()
                rewardsLog("注销成功","")
                $('.sitenav-mask').trigger("click")
                setTimeout("location.reload(true)",1500)
            }else{
                rewardsON()
            }
        }  
    }); 
}





console.log("%c欢迎来到茶道部", "color:#41B5A5;padding:54px 0px 72px 155px;line-height:126px;background:url('http://www.akokono.com/static/public/img/miku.gif') no-repeat;font-size:2em");