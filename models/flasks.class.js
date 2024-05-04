class Flask extends MovableObject {
	height = 80;
	width = 80;
	y = 350;
	offset = {
		top: 15,
		left: 35,
		right: 20,
		bottom: 10,
	};
	IMAGES_FLASK = [
		'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
		'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
	];

	constructor(x, img) {
		super().loadImage(this.IMAGES_FLASK[img]);
		this.loadImages(this.IMAGES_FLASK);
		this.x = x;
	}
	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_FLASK);
		}, 250);
	}
}
