$(document).ready(function(){
	var page1 = [{"excerpt":"/picture/img/1.jpg","title":"PC壁纸 第49期","time":"2019年1月4日"},
		{"excerpt":"/picture/img/2.jpg","title":"蕾姆Cos 第2期","time":"2019年1月3日"},
		{"excerpt":"/picture/img/3.jpg","title":"碧蓝航线 第26期","time":"2019年1月3日"},	
		{"excerpt":"/picture/img/4.jpg","title":"PC壁纸 第48期","time":"2019年1月3日"},	
		{"excerpt":"/picture/img/5.jpg","title":"手机壁纸 第258期","time":"2019年1月3日"},	
		{"excerpt":"/picture/img/6.jpg","title":"PC壁纸 第47期","time":"2019年1月2日"},
		{"excerpt":"/picture/img/7.jpg","title":"FGO 第21期","time":"2019年1月2日"},	
		{"excerpt":"/picture/img/8.jpg","title":"手机壁纸 第257期","time":"2018年12月28日"},	
		{"excerpt":"/picture/img/9.jpg","title":"蕾姆Cos 第1期","time":"2018年12月28日"},	
		{"excerpt":"/picture/img/10.jpg","title":"土间埋 第3期","time":"2018年12月27日"},	
	]
	var ecpTag=''
	for (var i in page1 ) {
		ecpTag=ecpTag
		+'<article class="excerpt excerpt-c5 excerpt-hoverplugin"><a target="_blank" class="thumbnail" href="#"><img src="'
		+page1[i].excerpt
		+'" data-src="#" class="thumb" style="display: inline;"></a><h2><a target="_blank" href="#">'
		+page1[i].title
		+'</a></h2><footer><time>'
		+page1[i].time
		+'</time></footer></article>'	
	}


	$(".excerpts").append(ecpTag)
})