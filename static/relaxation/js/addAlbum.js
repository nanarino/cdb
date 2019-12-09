$(document).ready(function(){

    let uploadList=[]
    let canupList=["image/gif","image/jpeg","image/png"]
    $("#upload")[0].ondragover = function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };
    $("#upload")[0].ondrop = function (e) {
        // 1.file对象
        const file = e.dataTransfer.files.item(0);
        if(uploadList.length>=9){return false;}
        if (canupList.indexOf(file.type)===-1){return false;}
        uploadList.push(file)
        console.log(uploadList)

        // 创建文件读取对象
        const f = new FileReader();
        // 读取图片 格式base64
        f.readAsDataURL(file);
        f.onload = function(e) {
            const img = new Image();
            // 格式base64
            img.src = this.result;
            img.style.width="20%"
            upload.appendChild(img);
        };
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

	function checkaddAlbum(){
		if($("#album-title").val().trim()===""){
			$(".focusbox-title").html('标题不能为空')
            rewardsON()
            rewardsLog('发表失败','标题不能为空')
			return false;
		}
		if(uploadList.length<1){
			$(".focusbox-title").html('图集不能为空')
			rewardsON()
            rewardsLog('发表失败','图集不能为空')
			return false;
		}
        var form_data = new FormData();
        form_data.append('title', $("#album-title").val().trim());
        form_data.append('motif', $("#album-motif").val().trim());
        form_data.append('length',uploadList.length);
        uploadList.forEach(function(v,i){
            form_data.append('file'+i, v);
        })
        $('#artc-submit').off("click").css('cssText','background-color:#ABABA4;border-color:#ABABA4;');
        rewardsON()
        rewardsLog("正在上传","请耐心等待")
        $.ajax({
            type: "POST",  
            url:location.pathname,  
            data:form_data,  
            async:true,
                processData: false,  // tell jquery not to process the data
                contentType: false,   // tell jquery not to set contentType         
            error: function(request) {  
                rewardsON()
                rewardsLog("上传失败","可能是您的网络原因")
            },  
            success: function(data) {  
                rewardsON()
                if (data.msg===true){
                    rewardsLog("发表成功","页面即将跳转:<span>3</span>")
                    countDown(3, "/picture/")
                }else if(data.msg===false){
                    rewardsLog("发表失败","请检查图片张数")
                }else if(data.msg==="error"){
                    rewardsLog("上传出错","图片储存过程出错")
                }else if(data.msg==="not_login"){
                    rewardsLog("请先登录","页面即将跳转:<span>3</span>")
                    countDown(3, "/user/login/?next="+location.pathname)
                }else{
                    rewardsLog("发表失败","可能是服务器抽风")
                }
            }  
        });
	}
	$('#artc-submit').on('click', function(){
		checkaddAlbum()
	})
})