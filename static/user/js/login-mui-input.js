$(document).ready(function(){
	function checkUser(){
		if($("#username").val()===""){
			$(".focusbox-title").html('用户名不能为空')
			return false;
		}
		if($("#password").val()===""){
			$(".focusbox-title").html('密码不能为空')
			return false;
		}
        $.ajax({
            type: "POST",  
            url:location.pathname,  
            data:$("#login-form").serialize(),  
            async: false,  
            error: function(request) {  
                rewardsON()
            },  
            success: function(data) {  
                rewardsON()
                if (data.msg===true){
                    rewardsLog("登录成功","页面即将跳转:<span>3<span>")
                    var reg = new RegExp("(^|&)" + "next" + "=([^&]*)(&|$)","i")
                    var next = location.search.substr(1).match(reg) 
                    if (next === null){
                        next = '/index/'
                    }else{
                        next=next[2]
                    }
                    countDown(3, next)
                }else if(data.msg===false){
                    rewardsLog("登录失败","可能是密码错误")
                }else{
                    rewardsLog("操作失败","可能是服务器抽风了")
                }
            }  
        });
	}
	$('#login-btn').on('click', function(){
		checkUser()
	})
})