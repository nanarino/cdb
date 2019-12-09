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
        $.ajax({
            type: "POST",  
            url:location.pathname,  
            data:$("#articleform").serialize(),  
            async: false,  
            error: function(request) {  
                rewardsON()
            },  
            success: function(data) {  
                rewardsON()
                if (data.msg===true){
                    rewardsLog("发表成功","页面即将跳转:<span>3<span>")
                    countDown(3, "/library/")
                }else{
                    rewardsLog("发表成功","可能是网络问题")
                }
            }  
        });
	}
	$('#artc-submit').on('click', function(){
		checkaddArticle()
	})
})