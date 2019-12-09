$(document).ready(function(){
	var page1 = [{"excerpt":"/static/staff/img/5.jpg","title":"部门介绍","href":"javascript:rewardsON();rewardsLog('没啥好介绍的','茶道部成立于2016/3/31,没有了');","time":"娱乐部(没啥好介绍的)"},
		{"excerpt":"/static/staff/img/6.jpg","title":"页面更新日志","href":"/staff/update/","time":"2019年3月20日13:10:49"},
		{"excerpt":"/static/staff/img/7.jpg","title":"加入茶道部","href":"/staff/join/","time":"戳这里"},
        {"excerpt":"/static/staff/img/8.jpg","title":"给管理员打钱","href":"/staff/reward/","time":"戳这里"},
	]
	var ecpTag=''
	for (var i in page1 ) {
		ecpTag=ecpTag
		+'<article class="excerpt excerpt-c4 excerpt-hoverplugin"><a class="thumbnail" href="'
        +page1[i].href
        +'"><img src="'
		+page1[i].excerpt
        +'" class="thumb" style="display: inline;"></a><h2><a href="'
        +page1[i].href
        +'">'
		+page1[i].title
		+'</a></h2><footer><time>'
		+page1[i].time
		+'</time></footer></article>'	
	}

	$(".excerpts").append(ecpTag)
})