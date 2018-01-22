// 浏览器调试方法
/**
 * 1.利用 console.trace()调试
 */

var car;
var func1 = function() {
	func2();
}
var func2 = function() {
	func4();
}
var func3 = function() {}

var func4 = function() {
	car = new Car();
	car.funcX();
}
var Car = function() {
	this.brand = 'volvo';
	this.color = 'red';
	this.funcX = function() {
		this.funcY();
	}
	this.funcY = function() {
		this.funcZ();
	}
	this.funcZ = function() {
		console.trace('trace car')
	}
}
func1();


/**
 * 在控制台输出 当方法执行时 直接进入断点  匿名函数不适用
 * debug(方法名-不能加括号，仅仅是方法名)
 * debug(car.funcY)
 */