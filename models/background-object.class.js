class BackgroundObject extends MovableObject {
	height = 480;
	width = 720;

	/**
	 * passes the current image to the loadImage function and sets the position for the image
	 * @param {string} imagePath
	 * @param {number} x
	 */
	constructor(imagePath, x) {
		super().loadImage(imagePath);
		this.x = x;
		this.y = 480 - this.height;
	}
}
