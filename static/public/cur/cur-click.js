var a_idx = 0;
$(document).ready(function(){
    $("a").on("click",function(e) {
        e.stopPropagation();
        //阻止a标签被点击也触发字效果
    });
    var fontColor = 0
    $("body").click(function(e) {
        fontColor+=30
        var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,y = e.pageY;
        $i.css({
            "z-index": 100000000,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "hsl("+fontColor%360+",50%,50%)"
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
            },
            1500,
            function() {
                $i.remove();
            }
        );
    });
});