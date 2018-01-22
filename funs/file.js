/**
 * 本地文件操作与上次
 * 	1.通过 input type='file'
 * 	2.拖拽方式将文件拖拽过来
 * 	3.编辑框内复制黏贴
 */

// 1
$("#file-input").on("change", function() {
	console.log(`file name is ${this.value}`);

	let formData = new FormData(this.form);
	/**
	 * ormData打印出来是一个空的Objet，但并不是说它的内容是空的，
	 * 只是它对前端开发人员是透明的，无法查看、修改、删除里面的内容，
	 * 只能append添加字段。
	 */
	formData.append('filename', this.value);
	// console.log(formData);


	/**
	 * FromData()无法得到文件内容 使用FileReader()
	 */

	let fileReader = new FileReader();
	fileReader.onload = function() {
		if (/^image/.test(this.type)) {
			// 读取结果在fileReader.result()中
		}
		$(`<img src="${this.result}">`).appendTo("body");
		// debugger;
	}

	console.log(this.files[0]); // 按base64的方式读取，结果是base64，任何文件都可转成base64的形式
	fileReader.readAsDataURL(this.files[0]);

	// 以二进制字符串方式读取，结果是二进制内容的utf-8形式，已被废弃了
	fileReader.readAsBinaryString(this.files[0]);

	// 以原始二进制方式读取，读取结果可直接转成整数数组
	fileReader.readAsArrayBuffer(this.files[0]);
});


/**
 * 2.拖拽
 */

$('.img-container').on('dragover', function(event) {
		event.preventDefault();
	})
	.on('drop', function(event) {
		event.preventDefault();
		let file = event.originalEvent.dataTransfer.files[0];

		let fileReader = new FileReader();

		// 然后就可以使用FileReader进行操作
		fileReader.readAsDataURL(file);
		fileReader.onload = function() {
			if (/^image/.test(this.type)) {
				// 读取结果在fileReader.result()中
			}
			$(`<img src="${this.result}">`).appendTo($('.img-container'));
			// debugger;
		}
	});