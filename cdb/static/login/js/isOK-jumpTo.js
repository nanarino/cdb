			function countDown(secs, surl) {
				var $jumpTo = $(".focusbox-title span");
				$jumpTo.html(secs)
				if(--secs > 0) {
					setTimeout("countDown(" + secs + ",'" + surl + "')", 1000);
				} else {
					location.href = surl;
				}
			}
			countDown(3, '/index');