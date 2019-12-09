//请在header中引入



//导航栏的展开和收起
$(document).ready(function(){
	$('.sitenav-on').on('click', function(){
		$('body').toggleClass('sitenav-active')
	})

	$('.sitenav-mask').on('click', function(){
		$('body').removeClass('sitenav-active')
	})


	$('.searchstart-on').on('click', function(){
		$(this).hide()
		$('.searchstart-off').show()
		$('body').addClass('searchform-active')
		$('.sinput').focus()
	})

	$('.searchstart-off').on('click', function(){
		$(this).hide()
		$('.searchstart-on').show()
		$('body').removeClass('searchform-active')
	})
})

//导航栏的所在路由颜色
$(document).ready(function(){
	if (location.pathname.match(/music/)!==null){
		$('.menu-item').eq(0).addClass('current-menu-item')
	}else if (location.pathname.match(/picture/)!==null){
		$('.menu-item').eq(1).addClass('current-menu-item')
	}else if (location.pathname.match(/library/)!==null){
		$('.menu-item').eq(2).addClass('current-menu-item')
	}else if (location.pathname.match(/relaxation/)!==null){
		$('.menu-item').eq(3).addClass('current-menu-item')
	}else if (location.pathname.match(/staff/)!==null){
		$('.menu-item').eq(4).addClass('current-menu-item')
	}else if (location.pathname.match(/user/)!==null){
		$('.menu-item').eq(5).addClass('current-menu-item')
	}
})