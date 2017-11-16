// 去抖 防抖
/**
 *
 * 当某一个事件频繁触发时，将其设置成在规定的时间内触发，防止一直触发
 * 	短时间内不断触发某个事件，非常消耗性能
 */
$(document).ready(function() {
	var scrollBox = $('.scroll-box');
	//调用throttle函数，传入相应的方法和规定的时间;
	var thro = debounce(throFun, 2000);
	//触发事件;
	scrollBox.on('scroll', function() {
		//调用执行函数;
		thro();
	})


	function debounce(method, time) {
		var timer = null;
		return function() {
			var context = this;
			//在函数执行的时候先清除timer定时器;
			clearTimeout(timer);
			timer = setTimeout(function() {
				method.call(context);
			}, time);
		}
	}

	function throFun() {
		console.log('success');
	}
});