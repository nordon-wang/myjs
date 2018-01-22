function notifyMe() {
	// 先检查浏览器是否支持
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	}

	// 检查用户是否同意接受通知
	else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		var notification = new Notification("Hi there!");
		debugger;
	}

	// 否则我们需要向用户获取权限
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function(permission) {
			// 如果用户同意，就可以向他们发送通知
			if (permission === "granted") {
				var notification = new Notification("Hi there!");
			}
			debugger;
		});
	}


	// 最后，如果用户已经授权了相关通知
	// 你出于尊重，就不需要再打扰他们了
}