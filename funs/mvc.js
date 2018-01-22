function observe(value, asRootData) {
	if (!value || typeof value !== 'object') {
		return;
	}
	return new Observer(value);
}

function Observer(value) {
	this.value = value;
	this.walk(value);
}

Observer.prototype = {
	walk: function(obj) {
		let self = this;
		Object.keys(obj).forEach(key => {
			self.observeProperty(obj, key, obj[key]);
		});
	},
	observeProperty: function(obj, key, val) {
		let dep = new Dep();
		let childOb = observe(val);
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get: function() {
				if (Dep.target) {
					dep.depend();
				}
				if (childOb) {
					childOb.dep.depend();
				}
				return val;
			},
			set: function(newVal) {
				if (val === newVal || (newVal !== newVal && val !== val)) {
					return;
				}
				val = newVal;
				// 监听子属性
				childOb = observe(newVal);
				// 通知数据变更
				dep.notify();
			}
		})
	}
}
/**
 * @class 依赖类 Dep
 */
let uid = 0;

function Dep() {
	// dep id
	this.id = uid++;
	// array 存储Watcher
	this.subs = [];
}
Dep.target = null;
Dep.prototype = {
	/**
	 * [添加订阅者]
	 * @param  {[Watcher]} sub [订阅者]
	 */
	addSub: function(sub) {
		this.subs.push(sub);
	},
	/**
	 * [移除订阅者]
	 * @param  {[Watcher]} sub [订阅者]
	 */
	removeSub: function(sub) {
		let index = this.subs.indexOf(sub);
		if (index !== -1) {
			this.subs.splice(index, 1);
		}
	},
	// 通知数据变更
	notify: function() {
		this.subs.forEach(sub => {
			// 执行sub的update更新函数
			sub.update();
		});
	},
	// add Watcher
	depend: function() {
		Dep.target.addDep(this);
	}
}
// 结合Watcher