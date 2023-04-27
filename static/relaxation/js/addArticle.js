$(document).ready(function () {
    function checkaddArticle() {
        if ($("#artc-title").val().trim() === "") {
            $(".focusbox-title").html('标题不能为空')
            rewardsON()
            rewardsLog("上传失败", "标题不能为空")
            return false;
        }
        if ($("#artc-content").val().trim() === "") {
            $(".focusbox-title").html('正文不能为空')
            rewardsON()
            rewardsLog("上传失败", "正文不能为空")
            return false;
        }
        $('#artc-submit').off("click").css('cssText', 'background-color:#ABABA4;border-color:#ABABA4;');
        $.ajax({
            type: "POST",
            url: location.pathname,
            data: $("#articleform").serialize(),
            async: false,
            error: function (request) {
                rewardsON()
                rewardsLog("发表失败", "可能是您的网络原因")
            },
            success: function (data) {
                rewardsON()
                if (data.msg === true) {
                    rewardsLog("发表成功", "页面即将跳转:<span>3</span>")
                    countDown(3, "/library/")
                } else if (data.msg === "not_login") {
                    rewardsLog("请先登录", "页面即将跳转:<span>3</span>")
                    countDown(3, "/user/login/?next=" + location.pathname)
                } else {
                    rewardsLog("发表失败", "可能是服务器抽风")
                }
            }
        });
    }
    $('#artc-submit').on('click', function () {
        checkaddArticle()
    })
})