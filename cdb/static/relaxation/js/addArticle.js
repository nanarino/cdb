$(document).ready(function(){
	function checkaddArticle(){
		if($("#artc-title").val().trim()===""){
			$(".focusbox-title").html('标题不能为空')
			console.log("标题不能为空")
			return false;
		}
		if($("#artc-comment").val().trim()===""){
			$(".focusbox-title").html('正文不能为空')
			console.log("正文不能为空")
			return false;
		}
		$("#articleform").submit();
	}
	$('#artc-submit').on('click', function(){
		checkaddArticle()
	})
})