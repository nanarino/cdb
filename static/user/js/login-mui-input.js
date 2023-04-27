$(document).ready(function () {
    function checkUser() {
        if (isLogin) {
            rewardsON()
            rewardsLog("警告", "请先注销已登录账户再进行登录")
            return false;
        }
        if ($("#username").val() === "") {
            $(".focusbox-title").html('用户名不能为空')
            rewardsON()
            rewardsLog("操作失败", "用户名不能为空")
            return false;
        }
        if ($("#password").val() === "") {
            $(".focusbox-title").html('密码不能为空')
            rewardsON()
            rewardsLog("操作失败", "密码不能为空")
            return false;
        }
        $.ajax({
            type: "POST",
            url: location.pathname,
            data: $("#login-form").serialize(),
            async: false,
            error: function (request) {
                rewardsON()
                rewardsLog("登录失败", "可能是您的网络原因")
            },
            success: function (data) {
                rewardsON()
                if (data.msg === true) {
                    rewardsLog("登录成功", "页面即将跳转:<span>3</span>")
                    var next = getGET("next")
                    if ([null, "/user/login/", "/user/register/"].indexOf(next) != -1) {
                        next = '/index/'
                    } else {
                        next = next[2]
                    }
                    $('#login-btn').off("click")
                    countDown(3, next)
                } else if (data.msg === false) {
                    rewardsLog("登录失败", "可能是密码错误")
                } else {
                    rewardsLog("操作失败", "可能是服务器抽风了")
                }
            }
        });
    }
    $('#login-btn').on('click', function () {
        checkUser()
    })
    if (isLogin) {
        rewardsON()
        rewardsLog("请勿重复登录", "请先注销已登录账户")
    }
})