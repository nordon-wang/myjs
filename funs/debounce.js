// 去抖 防抖
// 1.
/**
 *
 * 当某一个事件频繁触发时，将其设置成在规定的时间内触发，防止一直触发
 * 	短时间内不断触发某个事件，非常消耗性能
 */
// $(document).ready(function() {
// 	var scrollBox = $('.scroll-box');
// 	//调用throttle函数，传入相应的方法和规定的时间;
// 	var thro = debounce(throFun, 2000);
// 	//触发事件;
// 	scrollBox.on('scroll', function() {
// 		//调用执行函数;
// 		thro();
// 	})


// 	function debounce(method, time) {
// 		var timer = null;
// 		return function() {
// 			var context = this;
// 			//在函数执行的时候先清除timer定时器;
// 			clearTimeout(timer);
// 			timer = setTimeout(function() {
// 				method.call(context);
// 			}, time);
// 		}
// 	}

// 	function throFun() {
// 		console.log('success');
// 	}
// });



// 2.
/**
 * 防抖：无论怎么频繁的触发事件，只需要控制事件触发n秒之后才执行
 * 		若是在n秒的时间内又一次触发事件，那么更新时间，在最后一次触发的时间上+n秒之后才触发事件
 * 		若是在n秒之内不再触发事件，那么在n秒这个时间节点触发事件
 * 		--就是在触发一个时间之后的n秒之内不再触发事件，才执行事件
 */

let count = 1;
let container = document.getElementById('container');

function getAction() {
	container.innerHTML = count++;
}

// container.onmousemove = getAction;
// container.addEventListener('mousemove', getAction);

/**
 * 去抖
 * @param  {[type]} func      需要执行的函数
 * @param  {[type]} wait      需要延迟事件的等待时间
 * @param  {[type]} immediate 是否立即执行
 */
function debounce1(func, wait, immediate) {
	let timer, result;
	return function() {
		// 修改this指向
		let _this = this;

		// event对象处理 
		let args = arguments;

		if (timer) {
			clearTimeout(timer);
		}

		// 第一次立即执行
		if (immediate) {
			// 若已执行 不再执行
			let callnow = !timer;

			timer = setTimeout(function() {
				timer = null;
				// 在此若是不调用一次函数 那么停止后不会执行
				func.apply(_this, args);
			}, wait);

			if (callnow) {
				func.apply(_this, args);
			}

		} else {
			timer = setTimeout(function() {
				func.apply(_this, args);
			}, wait);
		}

	};
}

/**
 * debounce1 调用这个函数 并得到其中return 的匿名函数
 * debounce1() 相当于将return的匿名函数执行
 * @type {[type]}
 */
container.onmousemove = debounce1(getAction, 500, true);