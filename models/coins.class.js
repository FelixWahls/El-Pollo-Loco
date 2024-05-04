class Coin extends MovableObject {
	height = 150;
	width = 150;
	offset = {
		top: 55,
		left: 55,
		right: 55,
		bottom: 55,
	};
	IMAGES_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

	constructor(x, y) {
		super().loadImage(this.IMAGES_COIN[0]);
		this.loadImages(this.IMAGES_COIN);
		this.x = x;
		this.y = y;
		this.speed = 0.3 + Math.random() * 0.35;
		this.animate();
	}
	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_COIN);
		}, 250);
	}
}
