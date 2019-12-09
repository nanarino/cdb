$(document).ready(function(){
	var page1 = [{"excerpt":"/static/relaxation/img/1.jpg","title":"在音乐区发表","href":"javascript:rewardsON();rewardsLog('该功能未实装','');","time":"功能未实装"},
		{"excerpt":"/static/relaxation/img/2.jpg","title":"在美图区发表","href":"/relaxation/addAlbum/","time":"上传相册一样使用"},
		{"excerpt":"/static/relaxation/img/3.jpg","title":"在图书馆发表","href":"/relaxation/addArticle/","time":"解析Markdown的语法"},
        {"excerpt":"/static/relaxation/img/4.jpg","title":"个人信息界面","href":"/relaxation/ownSpace/?userId="+window.isLogin,"time":"账号信息修改和完善"},
	]
	var ecpTag=''
	for (var i in page1 ) {
		ecpTag=ecpTag
		+'<article class="excerpt excerpt-c4 excerpt-hoverplugin"><a class="thumbnail" href="'
        + (window.isLogin?page1[i].href:"/user/login/?next="+location.pathname)
        +'"><img src="'
		+page1[i].excerpt
        +'" class="thumb" style="display: inline;"></a><h2><a href="'
        + (window.isLogin?page1[i].href:"/user/login/?next="+location.pathname)
        +'">'
		+page1[i].title
		+'</a></h2><footer><time>'
		+page1[i].time
		+'</time></footer></article>'	
	}

	$(".excerpts").append(ecpTag)
})