$(document).ready(function () {
    Vue.prototype.$ = window.$;
    const vm = new Vue({
        el: "#app",
        data() {
            return {
                title: '',
                motif: '',
                maxNumber: 9,
                imgList: [],
                filterList: ["image/gif", "image/jpeg", "image/png", "image/x-icon"],
                size: 0
            }
        },
        methods: {
            dragenter(el) {
                el.stopPropagation();
                el.preventDefault();
            },
            dragover(el) {
                el.stopPropagation();
                el.preventDefault();
            },
            drop(el) {
                el.stopPropagation();
                el.preventDefault();
                if (this.imgList.length + el.dataTransfer.files.length > this.maxNumber) {
                    rewardsON()
                    rewardsLog('操作失败', "已经超出张数！！！")
                    return;
                } else {
                    this.filesList(el.dataTransfer.files);
                }
            },
            filesList(files) {
                [...files].filter((v) => this.filterList.indexOf(v.type) !== -1).forEach((v) => this.fileAdd(v))
            },
            fileAdd(file) {
                this.size += file.size;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    file.src = reader.result;
                    this.imgList.push({ file });
                }
            },
            updateImg(el) {
                if (!el.target.files[0].size) return;
                if (this.imgList.length >= this.maxNumber) {
                    rewardsON()
                    rewardsLog('操作失败', "已经超出张数！！！")
                    return;
                } else {
                    this.filesList(el.target.files);
                }
            },
            delImg(index) {
                this.size -= this.imgList[index].file.size;
                this.imgList.splice(index, 1);
            },
            postData() {
                if (!this.title.trim()) {
                    rewardsON()
                    rewardsLog('发表失败', "当前标题为空请输入标题！")
                    return;
                }
                if (this.imgList.length < 1) {
                    rewardsON()
                    rewardsLog('发表失败', "请至少选择一张图片上传")
                    return;
                }
                var formData = new FormData();
                this.imgList.forEach((value, index) => {
                    formData.append("file" + index, value.file);
                });
                formData.append("length", this.imgList.length);
                formData.append("title", this.title);
                formData.append("motif", this.motif);
                this.$('#artc-submit').off("click").css('cssText', 'background-color:#ABABA4;border-color:#ABABA4;');
                rewardsON()
                rewardsLog("正在上传", "请耐心等待")
                this.$.ajax({
                    type: "POST",
                    url: location.pathname,
                    data: formData,
                    async: true,
                    processData: false,
                    contentType: false,
                    error: function (request) {
                        rewardsON()
                        rewardsLog("上传失败", "可能是您的网络原因")
                    },
                    success: function (data) {
                        rewardsON()
                        if (data.msg === true) {
                            rewardsLog("发表成功", "页面即将跳转:<span>3</span>")
                            countDown(3, "/picture/")
                        } else if (data.msg === false) {
                            rewardsLog("发表失败", "请检查图片张数")
                        } else if (data.msg === "error") {
                            rewardsLog("上传出错", "图片储存过程出错")
                        } else if (data.msg === "not_login") {
                            rewardsLog("请先登录", "页面即将跳转:<span>3</span>")
                            countDown(3, "/user/login/?next=" + location.pathname)
                        } else {
                            rewardsLog("发表失败", "可能是服务器抽风")
                        }
                    }
                });
            }
        },
        computed: {
            bySize() {
                if (this.size === 0) return '0 B';
                let k = 1024,
                    sizes = ['B', 'KB', 'MB', 'GB'],
                    i = Math.floor(Math.log(this.size) / Math.log(k));
                return (this.size / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            }
        }
    })
})