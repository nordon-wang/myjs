// 节流
/**
 *
 * 当某一个事件频繁触发时，将其设置成在规定的时间内触发，防止一直触发
 * 	短时间内不断触发某个事件，非常消耗性能
 */
/*$(document).ready(function() {
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
});*/


/**
 * 节流的原理很简单：
 * 如果你持续触发事件，每隔一段时间，只执行一次事件。
 * 根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
 * 我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。
 * 关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
 */


let count = 1;
let container = document.getElementById('container');

function getAction() {
	container.innerHTML = count++;
}


/**
 * 2.1时间戳
 * 	当停止触发时  不再触发事件
 */
function throttle1(func, wait) {
	let _this, args;

	// previous = 0时，进入便会触发一次事件
	// previous = +new Date() 时，经历wait秒之后才会触发第一次事件
	let previous = 0;

	return function() {
		let now = +new Date();

		_this = this;
		args = arguments;

		if (now - previous > wait) {
			func.apply(_this, args);
			previous = now;
		}
	}
}

/**
 * 2.2 定时器
 *  停止触发事件 还会在wait秒之后触发最后一次
 */

function throttle2(func, wait) {
	let _this, args, timer, result;

	let previous = 0;

	return function() {

		_this = this;
		args = arguments;

		if (!timer) {
			timer = setTimeout(function() {
				timer = null;
				func.apply(_this, args);
			}, wait);
		}

	}
}

/**
 * 2.3双剑合璧
 */

function throttle3(func, wait) {
	let _this, args, timer, result;
	let previous = 0;

	let later = function() {
		previous = +new Date();
		timer = null;
		func.apply(_this, args);
	}

	let throttled = function() {
		let now = +new Date();

		//下次触发 func 剩余的时间
		let remaining = wait - (now - previous);

		_this = this;
		args = arguments;

		// 如果没有剩余的时间了或者你改了系统时间
		if (remaining <= 0 || remaining > wait) {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}

			previous = now;
			func.apply(_this, args);
		} else if (!timer) {
			timer = setTimeout(later, remaining);
		}

	}

	return throttled;
}

container.onmousemove = throttle3(getAction, 500);