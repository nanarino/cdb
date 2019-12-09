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