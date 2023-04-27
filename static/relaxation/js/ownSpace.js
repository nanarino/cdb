$(document).ready(function () {
    function checksetOwn() {
        if ($("#own-username").val().trim() === "") {
            $(".focusbox-title").html('新用户名不能为空')
            rewardsON()
            rewardsLog("操作失败", "新用户名未输入或有空格")
            return false;
        }
        $('#artc-submit').off("click").css('cssText', 'background-color:#ABABA4;border-color:#ABABA4;');
        $.ajax({
            type: "POST",
            url: location.pathname,
            data: $("#ownSpace").serialize(),
            async: false,
            error: function (request) {
                rewardsON()
                rewardsLog("修改失败", "可能是您的网络原因")
            },
            success: function (data) {
                rewardsON()
                if (data.msg === true) {
                    rewardsLog("修改成功", "记录qq可用于找回密码")
                } else if (data.msg === false) {
                    rewardsLog("修改失败", "可能是新用户名已经被占用")
                } else if (data.msg === "not_login") {
                    rewardsLog("请先登录", "页面即将跳转:<span>3</span>")
                    countDown(3, "/user/login/?next=" + location.pathname)
                } else {
                    rewardsLog("修改失败", "可能是服务器抽风")
                }
            }
        });
    }
    $('#artc-submit').on('click', function () {
        checksetOwn()
    })
})