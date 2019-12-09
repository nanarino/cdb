function shuffle(arr) { //随机排列数组
	var len = arr.length;
	for(var i = 0; i < len - 1; i++) {
		var idx = Math.floor(Math.random() * (len - i));
		var temp = arr[idx];
		arr[idx] = arr[len - i - 1];
		arr[len - i - 1] = temp;
	}
	return arr;
}

function isValid(arr) { //判断数列的逆序是否为偶数  偶数=>有解
	var count = 0;
	for(var i = 0; i < 16; i++) {
		for(var j = i + 1; j < 16; j++) {
			if(arr[j] < arr[i]) {
				count++;
			}
		}
	}
	return count % 2 === 0;
}

function PrefixInteger(num, n) { //数字前补零变成字符串     n是位数
	return(Array(n).join(0) + num).slice(-n);
}

$(document).ready(function() {
	//响应式 适应宽度
	let jigsawW = Math.floor((window.innerWidth - 10) / 4)
	if(jigsawW > 194) {
		jigsawW = 194
	} else {
		jigsawview.style.marginTop = 30 + 'px'
	}
	jigsawview.style.height = (4 * jigsawW + 2) + 'px'
	jigsawview.style.width = (4 * jigsawW + 2) + 'px'
	Controller.style.left = (2 * jigsawW - 75) + 'px'
	Controller.style.top = (2 * jigsawW - 75) + 'px'

	let imgpath = "<img src='/static/s/images" + Math.floor(Math.random() * 5) + "/img";
	Controller.style.display = "none"
	let detime = 0
	const pstArr = [0, 1, 2, 3, 10, 11, 12, 13, 20, 21, 22, 23, 30, 31, 32, 33] //每个方块的pst值构成的数组

	for(let i = 0; i < 16; i++) {
		let thisJigsaw = eval('jigsaw' + PrefixInteger(pstArr[i], 2))
		thisJigsaw.style.height = (jigsawW - 2) + 'px'
		thisJigsaw.style.width = (jigsawW - 2) + 'px'
		thisJigsaw.pst = pstArr[i]
		thisJigsaw.style.top = (thisJigsaw.pst - thisJigsaw.pst % 10) / 10 * jigsawW + 'px'
		thisJigsaw.style.left = (thisJigsaw.pst % 10) * jigsawW + 'px';
		thisJigsaw.innerHTML = imgpath + PrefixInteger(pstArr[i], 2) + ".jpg'/>"
		thisJigsaw.onclick = function(e) {
			if(detime == 1) {
				Controller.style.display = "block"
			}
			if((jigsaw33.pst + 10) == thisJigsaw.pst || (jigsaw33.pst - 10) == thisJigsaw.pst) { //上下换位
				detime++
				let a
				a = thisJigsaw.pst
				thisJigsaw.pst = jigsaw33.pst
				jigsaw33.pst = a
				thisJigsaw.style.top = (thisJigsaw.pst - thisJigsaw.pst % 10) / 10 * jigsawW + 'px'
				jigsaw33.style.top = (jigsaw33.pst - jigsaw33.pst % 10) / 10 * jigsawW + 'px'
			} else if((jigsaw33.pst + 1) == thisJigsaw.pst || (jigsaw33.pst - 1) == thisJigsaw.pst) { //左右换位
				detime++
				let a
				a = thisJigsaw.pst
				thisJigsaw.pst = jigsaw33.pst
				jigsaw33.pst = a
				thisJigsaw.style.left = (thisJigsaw.pst % 10) * jigsawW + 'px'
				jigsaw33.style.left = (jigsaw33.pst % 10) * jigsawW + 'px'
			} else if(i != 15) { //无法换位
				thisJigsaw.style.opacity = 0.3
				setTimeout(function() {
					thisJigsaw.style.opacity = 1
				}, 250)
			}
            e.stopPropagation();//阻止冒泡
		}

	}

	btn.onclick = function() {
		do {
			var newPstArr = [...pstArr] //获取拷贝
			newPstArr.pop() //弹出最后一个
			newPstArr = shuffle(newPstArr)
		}
		while (!isValid(newPstArr)); //直到它有解
		newPstArr.push(33) //插入最后一个
		for(let i = 0; i < 16; i++) {
			let thisJigsaw = eval('jigsaw' + PrefixInteger(pstArr[i], 2))
			thisJigsaw.pst = newPstArr[i]
			thisJigsaw.style.top = 0 + 'px'
			thisJigsaw.style.left = 0 + 'px'
			setTimeout(function() {
				thisJigsaw.style.top = (thisJigsaw.pst - thisJigsaw.pst % 10) / 10 * jigsawW + 'px'
				thisJigsaw.style.left = (thisJigsaw.pst % 10) * jigsawW + 'px'
			}, 500)
		}
		Controller.style.display = "none"
	}
});