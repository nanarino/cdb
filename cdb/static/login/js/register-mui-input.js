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
		$("#register-form").submit();
	}
	$('#register-btn').on('click', function(){
		checkUser()
	})
})