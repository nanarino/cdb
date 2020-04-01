$(document).ready(function () {
    function checkUser() {
        if (isLogin) {
            rewardsON()
            rewardsLog("警告", "请先注销已登录账户再进行注册")
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
        if ($("#password").val() !== $("#password_confirm").val()) {
            $("#password").val("")
            $("#password_confirm").val("")
            $(".focusbox-title").html("两次密码不一致")
            rewardsON()
            rewardsLog("操作失败", "两次密码不一致")
            return false;
        }
        $.ajax({
            type: "POST",
            url: location.pathname,
            data: $("#register-form").serialize(),
            async: false,
            error: function (request) {
                rewardsON()
            },
            success: function (data) {
                rewardsON()
                if (data.msg === true) {
                    rewardsLog("注册成功", "页面即将跳转:<span>3</span>")
                    var next = getGET("next")
                    if ([null, "/user/login/", "/user/register/"].indexOf(next) != -1) {
                        next = '/index/'
                    } else {
                        next = next[2]
                    }
                    $('#register-btn').off("click")
                    countDown(3, next)
                } else if (data.msg === false) {
                    rewardsLog("注册失败", "可能是用户名已存在")
                } else if (data.msg === "error") {
                    rewardsLog("注册失败", "密码过于简单或者含有特殊字符")
                } else {
                    rewardsLog("操作失败", "可能是服务器抽风了")
                }
            }
        });
    }
    $('#register-btn').on('click', function () {
        checkUser()
    })
    if (isLogin) {
        rewardsON()
        rewardsLog("提示", "请先注销已登录账户再进行注册")
    }
})