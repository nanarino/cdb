//请在header中引入

//导航栏的展开和收起
$(document).ready(function () {
    $('.sitenav-on').on('click', function (e) {
        $('body').toggleClass('sitenav-active')
        e.stopPropagation();
    })

    $('.sitenav-mask').on('click', function (e) {
        $('body').removeClass('sitenav-active')
        e.stopPropagation();
    })


    $('.searchstart-on').on('click', function (e) {
        $(this).hide()
        $('.searchstart-off').show()
        $('body').addClass('searchform-active')
        $('.sinput').focus()
        e.stopPropagation();
    })

    $('.searchstart-off').on('click', function (e) {
        $(this).hide()
        $('.searchstart-on').show()
        $('body').removeClass('searchform-active')
        e.stopPropagation();
    })
})

$(document).ready(function () {
    //根据登录状态改变导航栏
    if (window.isLogin) {
        $(".menu-item-object-custom").html('<a href="javascript:logout();">退出</a>')
        console.log("当前为登录状态")
    } else if (window.isLogin === false) {
        $(".menu-item-object-custom").html('<a href="/user/login/?next=' + location.pathname + '">登录</a>')
        $(".usersign").html('<a class="usersign-login" target="_blank" href="/user/login/">登录</a><a class="usersign-register" target="_blank" href="/user/register">注册</a>')
        console.log("当前为游客状态")
    } else {
        rewardsON()
        rewardsLog("登录状态检查失败", "可能是服务器抽风了")
        console.error("查询不到登录状态")
    }

})