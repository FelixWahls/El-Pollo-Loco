class SmallChicken extends MovableObject {
	y = 385;
	height = 35;
	width = 35;
	energy = 20;
	damage = 10;
	offset = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	};
	IMAGES_WALKING = [
		'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
		'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
		'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
	];

	IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

	constructor() {
		super().loadImage(this.IMAGES_WALKING[0]);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_DEAD);
		this.x = 220 + Math.random() * 2000;
		this.speed = 0.3 + Math.random() * 0.35;

		this.animate();
	}
	animate() {
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 60);

		setInterval(() => {
			if (this.speed > 0) {
				this.playAnimation(this.IMAGES_WALKING);
			} else {
				this.playAnimation(this.IMAGES_DEAD);
				setTimeout(() => {
					this.x = -4000;
				}, 500);
			}
		}, 250);
	}
}
