const shuffle = arr => { //打乱数组
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let idx = Math.floor(Math.random() * (len - i));
        let temp = arr[idx];
        arr[idx] = arr[len - i - 1];
        arr[len - i - 1] = temp;
    }
    return arr;
};

const isValid = arr => { //判断数列的逆序是否为偶数  偶数=>有解
    let count = 0, len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[i]) {
                count++;
            }
        }
    }
    return count % 2 === 0;
};

window.onload = () => {
    const jigsawW = Math.min((window.innerWidth / 4 - 2.5) | 0, 194);
    jigsawview.style.height = (4 * jigsawW + 2) + 'px';
    jigsawview.style.width = (4 * jigsawW + 2) + 'px';
    Controller.style.left = (2 * jigsawW - 75) + 'px';
    Controller.style.top = (2 * jigsawW - 75) + 'px';
    Controller.style.display = "none";
    let detime = 0, imgpath = "<img src='img" + ~~(Math.random() * 3) + "/img";
    const pstArr = (new Array(16).fill()).map((i, j) => ('0' + j.toString(4)).slice(-2));
    const last = window.jigsaw33;
    const jigsawInit = i => {//初始化拼图位置和宽高
        const thisJigsaw = window['jigsaw' + i];
        thisJigsaw.style.height = (jigsawW - 2) + 'px';
        thisJigsaw.style.width = (jigsawW - 2) + 'px';
        thisJigsaw['pro'] = new Proxy(thisJigsaw, {
            set(target, key, value, proxy) {
                if (key === 'pst') {
                    target.style.top = value[0] * jigsawW + 'px';
                    target.style.left = value[1] * jigsawW + 'px';
                }
                return Reflect.set(target, key, value, proxy);
            }
        });
        thisJigsaw.pro.pst = i;
        thisJigsaw.innerHTML = imgpath + i + ".jpg'/>";
        return thisJigsaw;
    };

    const isWin = () => {//判断拼图名与位置是否全等
        for (let i of pstArr) {
            if (window['jigsaw' + i].pst !== i) return;
        }
        Controller.style.display = "block";
        Controller.innerHTML = `<p>Nice! ${((new Date() - r) / 1000) | 0}s</p><button onclick='history.go(0)'>restart</button>`;
    };

    for (let i of pstArr) {
        jigsawInit(i).onclick = function () {
            if (detime === 1) {
                Controller.style.display = "block";
            }
            if ([10, -10, 1, -1].indexOf(last.pst - this.pst) !== -1) {
                detime++;
                [this.pro.pst, last.pro.pst] = [last.pst, this.pst];
                window.r && isWin();//时间戳存在就判断
            } else if (i !== '33') { //无法换位
                this.style.opacity = 0.3;
                last.style.opacity = 1;
                const that = this;
                setTimeout(() => {
                    that.style.opacity = 1;
                    last.style.opacity = 0.2;
                }, 250);
            }
        }
    }

    btn.onclick = () => {
        btn.onclick = null;
        Controller.style.display = "none";
        let newPstArr = [...pstArr], allpromise = [];
        newPstArr.pop(); //弹出最后一个
        do {
            newPstArr = shuffle(newPstArr);
        }
        while (!isValid(newPstArr)); //直到它有解
        newPstArr.push('33'); //插入最后一个
        for (let [i, v] of Object.entries(newPstArr)) {
            let thisJigsaw = window['jigsaw' + pstArr[i]];
            allpromise.push(new Promise((resolve, reject) => {
                setTimeout(() => {
                    thisJigsaw.pro.pst = '00';
                    resolve([thisJigsaw, v]);
                }, 100 * i);
            }));
        }
        Promise.all(allpromise).then(res => {
            allpromise = [];
            for (let i of res) {
                allpromise.push(new Promise((resolve, reject) => {
                    setTimeout(function () {
                        i[0].pro.pst = i[1];
                    }, 100 * (20 - pstArr.indexOf(i[1])));
                }));
            }
        });
        Promise.all(allpromise).then(res => {
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    window.r = new Date();
                });
            });
        });
    }
}