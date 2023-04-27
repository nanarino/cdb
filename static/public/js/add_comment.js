$(document).ready(function () {
    function checkaddComment() {
        if ($(".comt-area").val().trim() === "") {
            rewardsON()
            rewardsLog("评论失败", "评论内容不可为空")
            return false;
        }
        $.ajax({
            type: "POST",
            url: /add_comment/,
            data: $("#commentform").serialize(),
            async: false,
            error: function (request) {
                rewardsON()
            },
            success: function (data) {
                rewardsON()
                if (data.msg === true) {
                    rewardsLog("迫害成功", "手机端的评论在最下面")
                    let ecpTag = '<li><a href="/relaxation/ownSpace/?userId=' + window.isLogin + '" title="我自己"><img src="/static/user/avatar/akr' + window.isLogin % 4 + '.jpg" class="avatar avatar-100" height="50" width="50"><div class="inner"><time><strong>' + '我自己' + '</strong>' + '刚刚' + '</time>' + $(".comt-area").val() + '</div></a></li>'
                    $(".widget-comments ul").append(ecpTag)
                    $(".comt-area").val("")
                } else if (data.msg === "not_login") {
                    rewardsLog("请先登录", "页面即将跳转:<span>3</span>")
                    countDown(3, "/user/login/?next=" + location.pathname)
                } else {
                    rewardsLog("迫害失败", "可能是网络问题")
                }
            }
        });
    }
    $('.comt-submit').on('click', function () {
        checkaddComment()
    })
})