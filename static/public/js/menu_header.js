//请在header中引入


$(document).ready(function () {
    let last = '\/' + location.pathname.split("\/")[1] + '\/';
    if (["/user/", "/staff/", "/search/"].indexOf(last) != -1) {
        $(".menu-item-object-custom").html('<a href="javascript:history.go(-1);">后退</a>')
        $(".sitenav-on").on('click', function () {
            history.go(-1)
        })
    } else {
        $(".menu-item-object-custom").html('<a href="' + last + '"> 后退 </a>')
        $(".sitenav-on").on('click', function () {
            location.href = last;
        })
    }
})


$(document).ready(function () {
    //根据登录状态改变导航栏
    if (window.isLogin) {
        console.log("当前为登录状态")
    } else if (window.isLogin === false) {
        $(".usersign").html('<a class="usersign-login" target="_blank" href="/user/login/">登录</a><a class="usersign-register" target="_blank" href="/user/register">注册</a>')
        console.log("当前为游客状态")
    } else {
        rewardsON()
        rewardsLog("登录状态检查失败", "可能是服务器抽风了")
        console.error("查询不到登录状态")
    }

})