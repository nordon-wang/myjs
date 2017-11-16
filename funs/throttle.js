// 节流
/**
 *
 * 当某一个事件频繁触发时，将其设置成在规定的时间内触发，防止一直触发
 * 	短时间内不断触发某个事件，非常消耗性能
 */
$(document).ready(function() {
	var scrollBox = $('.scroll-box');
	//调用throttle函数，传入相应的方法和规定的时间;
	var thro = throttle(throFun, 2000);
	//触发事件;
	scrollBox.on('scroll', function() {
		//调用执行函数;
		thro();
	})

	// 封装函数;    
	function throttle(method, time) {
		var timer = null;
		var startTime = new Date();
		return function() {
			var context = this;
			var endTime = new Date();
			var resTime = endTime - startTime;
			//判断大于等于我们给的时间采取执行函数;
			if (resTime >= time) {
				method.call(context);
				//执行完函数之后重置初始时间，等于最后一次触发的时间
				startTime = endTime;
			}
		}
	}

	function throFun() {
		console.log('success');
	}
});