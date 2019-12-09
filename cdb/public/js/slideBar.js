addLoadEvent(function() {
	var _btn = document.querySelector(".btn-slide-bar"),
		_body = document.querySelector("body");
	_btn.onclick = function() {
		_body.classList.toggle("active");
	}
});