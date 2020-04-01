$(document).ready(function () {
	var page1 = [{ "excerpt": "/static/staff/img/5.jpg", "title": "部门介绍", "href": "/staff/introduction/", "time": "娱乐部(没啥好介绍的)" },
	{ "excerpt": "/static/staff/img/6.jpg", "title": "本站公告", "href": "/staff/update/", "time": "发帖须知以及更新日志" },
	{ "excerpt": "/static/staff/img/7.jpg", "title": "管理茶道部", "href": "/admin/", "time": "管理员才可以进入" },
	{ "excerpt": "/static/staff/img/8.jpg", "title": "给管理员打钱", "href": "/staff/reward/", "time": "可以偷偷打钱" },
	]
	var ecpTag = ''
	for (var i in page1) {
		ecpTag = ecpTag
			+ '<article class="excerpt excerpt-c4 excerpt-hoverplugin"><a class="thumbnail" href="'
			+ page1[i].href
			+ '"><img src="'
			+ page1[i].excerpt
			+ '" class="thumb" style="display: inline;"></a><h2><a href="'
			+ page1[i].href
			+ '">'
			+ page1[i].title
			+ '</a></h2><footer><time>'
			+ page1[i].time
			+ '</time></footer></article>'
	}

	$(".excerpts").append(ecpTag)
})