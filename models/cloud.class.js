class Cloud extends MovableObject {
	y = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
	height = 300;
	width = 450;

	/**
	 * loads starting image and sets random x-position on the canvas
	 */
	constructor() {
		super().loadImage('img/5_background/layers/4_clouds/1.png');
		this.x = Math.random() * 3550;
		this.speed = 0.01 + Math.random() * 0.1;

		this.animate();
	}

	/**
	 * lets the image move to the left
	 */
	animate() {
		setInterval(() => {
			this.moveLeft();
		});
	}
}
