class ThrowableObject extends MovableObject {
	IMAGES_SALSA_ROTATE = [
		"img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
		"img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
		"img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
		"img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
	];

	IMAGES_SALSA_EXPLODE = [
		"img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
		"img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
		"img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
		"img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
		"img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
		"img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
	];

	offset = {
		top: 10,
		left: 10,
		right: 10,
		bottom: 10,
	};
	damage = 20;
	hitted = false;

	constructor(x, y) {
		super().loadImage(
			"img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
		);
		this.loadImages(this.IMAGES_SALSA_ROTATE);
		this.loadImages(this.IMAGES_SALSA_EXPLODE);
		this.width = 60;
		this.height = 60;
		this.x = x + 50;
		this.y = y + 100;
		this.throw();
	}

	throw() {
		this.speedY = 20;
		this.applyGravity();
		const bottleX = setInterval(() => {
			if (world.character.otherDirection) {
				this.x -= 6;
			} else {
				this.x += 6;
			}
		}, 1000 / 60);

		const checkFlaskStatus = setInterval(() => {
			if (this.y == 370 || this.hitted) {
				this.currImg = 0;
				flask_breake.play();
				clearInterval(checkFlaskStatus);
			}
		}, 1000 / 60);

		setInterval(() => {
			if (this.y < 370 && !this.hitted) {
				this.playAnimation(this.IMAGES_SALSA_ROTATE);
			} else if (this.y == 370 || this.hitted) {
				clearInterval(bottleX);
				this.hitted = false;
				this.playAnimation(this.IMAGES_SALSA_EXPLODE);
				if (this.currImg == 5) {
					this.x = -4000;
				}
			}
		}, 50);
	}
}