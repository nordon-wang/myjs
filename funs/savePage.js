// console.log('test');
/**
 * https://juejin.im/post/5a17c5e26fb9a04527254689
 * 需求:
 * 	完善卡片信息，分享出去时候信息更加立体
 * 	编辑个人资料入口
 * 	保存图片入口
 * 	可解决医生名片缓存时间问题
 */
console.log('1');

setTimeout(function() {
	console.log('2');
	process.nextTick(function() {
		console.log('3');
	})
	new Promise(function(resolve) {
		console.log('4');
		resolve();
	}).then(function() {
		console.log('5')
	})
});
process.nextTick(function() {
	console.log('6');
});
new Promise(function(resolve) {
	console.log('7');
	resolve();
}).then(function() {
	console.log('8')
});

setTimeout(function() {
	console.log('9');
	process.nextTick(function() {
		console.log('10');
	})
	new Promise(function(resolve) {
		console.log('11');
		resolve();
	}).then(function() {
		console.log('12')
	})
});
//浏览器 1，7，6，8，2，4，3，5，9，11，10，12。
// node1
// 7
// 6
// 8
// 2
// 4
// 9
// 11
// 3
// 10
// 5
// 12