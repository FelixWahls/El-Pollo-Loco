class DrawableObject {
	img;
	imageCache = {};
	currImg = 0;
	x;
	y;
	width;
	height;

	/**
	 * loads the current Image
	 * @param {string} path
	 */
	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	/**
	 * draws the current Image into the Context
	 * @param {CanvasElement} ctx
	 */
	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	/**
	 * preloads Images
	 * @param {Array} arr
	 */
	loadImages(arr) {
		arr.forEach((path) => {
			let img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}
}
