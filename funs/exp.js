(function() {
	let root = this;

	let _ = {};

	root._ = _;

	_.reverse = function(str) {
		return str.split('').reverse().join('')
	}
})();

console.log(_.reverse('hello'));