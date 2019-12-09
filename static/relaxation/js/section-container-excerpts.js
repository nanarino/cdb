$(document).ready(function(){
	var page1 = [{"excerpt":"/static/relaxation/img/1.jpg","title":"戳这里分享你的音乐","href":"javascript:rewardsON();rewardsLog('该功能未完成','');","time":"功能未完成"},
		{"excerpt":"/static/relaxation/img/2.jpg","title":"戳这里分享你的图集","href":"javascript:rewardsON();rewardsLog('该功能未完成','');","time":"功能未完成"},
		{"excerpt":"/static/relaxation/img/3.jpg","title":"戳这里发表你的论述","href":"/relaxation/addArticle","time":"9012年了 目前就只有这个"},
        {"excerpt":"/static/relaxation/img/4.jpg","title":"戳这里完善个人信息","href":"javascript:rewardsON();rewardsLog('该功能未完成','');","time":"功能未完成"},
	]
	var ecpTag=''
	for (var i in page1 ) {
		ecpTag=ecpTag
		+'<article class="excerpt excerpt-c4 excerpt-hoverplugin"><a class="thumbnail" href="'
        + (window.isLogin?page1[i].href:"/user/login/?next=/relaxation/")
        +'"><img src="'
		+page1[i].excerpt
        +'" class="thumb" style="display: inline;"></a><h2><a href="'
        + (window.isLogin?page1[i].href:"/user/login/?next=/relaxation/")
        +'">'
		+page1[i].title
		+'</a></h2><footer><time>'
		+page1[i].time
		+'</time></footer></article>'	
	}

	$(".excerpts").append(ecpTag)
})