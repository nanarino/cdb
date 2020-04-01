//请在header中引入

//导航栏的所在路由颜色
$(document).ready(function () {
	if (location.pathname.match(/music/) !== null) {
		$('.menu-item').eq(0).addClass('current-menu-item')
	} else if (location.pathname.match(/picture/) !== null) {
		$('.menu-item').eq(1).addClass('current-menu-item')
	} else if (location.pathname.match(/library/) !== null) {
		$('.menu-item').eq(2).addClass('current-menu-item')
	} else if (location.pathname.match(/relaxation/) !== null) {
		$('.menu-item').eq(3).addClass('current-menu-item')
	} else if (location.pathname.match(/staff/) !== null) {
		$('.menu-item').eq(4).addClass('current-menu-item')
	} else if (location.pathname.match(/user/) !== null) {
		$('.menu-item').eq(5).addClass('current-menu-item')
	}
})
