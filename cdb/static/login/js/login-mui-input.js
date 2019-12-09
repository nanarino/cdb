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
		$("#login-form").submit();
	}
	$('#login-btn').on('click', function(){
		checkUser()
	})
})