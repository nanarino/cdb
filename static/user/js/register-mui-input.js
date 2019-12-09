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
		if($("#password").val() !== $("#password_confirm").val()){
			$("#password").val("")
			$("#password_confirm").val("")
			$(".focusbox-title").html("两次密码不一致")
			return false;
		}
        $.ajax({
            type: "POST",  
            url:location.pathname,  
            data:$("#register-form").serialize(),  
            async: false,  
            error: function(request) {  
                rewardsON()
            },  
            success: function(data) {  
                rewardsON()
                if (data.msg===true){
                    rewardsLog("注册成功","页面即将跳转:<span>3<span>")
                    countDown(3, "/index/")
                }else if(data.msg===false){
                    rewardsLog("注册失败","可能是用户名已存在")
                }else{
                    rewardsLog("操作失败","可能是服务器抽风了")
                }
            }  
        });
	}
	$('#register-btn').on('click', function(){
		checkUser()
	})
})