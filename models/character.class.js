class Character extends MovableObject {
	height = 250;
	width = 125;
	y = 180;
	speed = 8;
	offset = {
		top: 120,
		left: 30,
		right: 40,
		bottom: 10,
	};
	IMAGES_IDLE = [
		'img/2_character_pepe/1_idle/idle/I-1.png',
		'img/2_character_pepe/1_idle/idle/I-2.png',
		'img/2_character_pepe/1_idle/idle/I-3.png',
		'img/2_character_pepe/1_idle/idle/I-4.png',
		'img/2_character_pepe/1_idle/idle/I-5.png',
		'img/2_character_pepe/1_idle/idle/I-6.png',
		'img/2_character_pepe/1_idle/idle/I-7.png',
		'img/2_character_pepe/1_idle/idle/I-8.png',
		'img/2_character_pepe/1_idle/idle/I-9.png',
		'img/2_character_pepe/1_idle/idle/I-10.png',
	];

	IMAGES_WALKING = [
		'img/2_character_pepe/2_walk/W-21.png',
		'img/2_character_pepe/2_walk/W-22.png',
		'img/2_character_pepe/2_walk/W-23.png',
		'img/2_character_pepe/2_walk/W-24.png',
		'img/2_character_pepe/2_walk/W-25.png',
		'img/2_character_pepe/2_walk/W-26.png',
	];

	IMAGES_JUMPING = [
		'img/2_character_pepe/3_jump/J-34.png',
		'img/2_character_pepe/3_jump/J-35.png',
		'img/2_character_pepe/3_jump/J-36.png',
		'img/2_character_pepe/3_jump/J-37.png',
		'img/2_character_pepe/3_jump/J-38.png',
	];

	IMAGES_HURT = [
		'img/2_character_pepe/4_hurt/H-41.png',
		'img/2_character_pepe/4_hurt/H-42.png',
		'img/2_character_pepe/4_hurt/H-43.png',
	];

	IMAGES_DEAD = [
		'img/2_character_pepe/5_dead/D-51.png',
		'img/2_character_pepe/5_dead/D-52.png',
		'img/2_character_pepe/5_dead/D-53.png',
		'img/2_character_pepe/5_dead/D-54.png',
		'img/2_character_pepe/5_dead/D-55.png',
		'img/2_character_pepe/5_dead/D-56.png',
		'img/2_character_pepe/5_dead/D-57.png',
	];
	world;

	constructor() {
		super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
		this.x = 100;
		this.loadImages(this.IMAGES_IDLE);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_JUMPING);
		this.loadImages(this.IMAGES_DEAD);
		this.loadImages(this.IMAGES_HURT);
		this.applyGravity();
		this.animate();
	}

	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_IDLE);
		}, 250);

		setInterval(() => {
			if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
				this.otherDirection = false;
				this.moveRight();
			}
			if (this.world.keyboard.LEFT && this.x > -490) {
				this.otherDirection = true;
				this.moveLeft();
			}
			if (this.world.keyboard.SPACE && !this.isAboveGround()) {
				this.jump();
				jumping_sound.play();
				this.currImg = 0;
			}

			this.world.camera_x = -this.x + 200;
		}, 1000 / 60);

		setInterval(() => {
			walking_sound.pause();

			if (this.isDead()) {
				this.playAnimation(this.IMAGES_DEAD);
				clearAllIntervals();
				showLoseScreen();
				bg_sound.pause();
			} else if (this.isHurt()) {
				this.playAnimation(this.IMAGES_HURT);
				hurt_sound.play();
			} else if (this.isAboveGround()) {
				this.getJumpingImg();
				this.playAnimation(this.IMAGES_JUMPING);
			} else {
				if (
					!this.isAboveGround() &&
					(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
				) {
					this.playAnimation(this.IMAGES_WALKING);
					walking_sound.play();
				}
			}
		}, 50);
	}

	getJumpingImg() {
		if (this.speedY >= 3 && this.currImg > 1) {
			this.currImg = 1;
		} else if (this.speedY < 3 && this.speedY > -3 && this.currImg > 2) {
			this.currImg = 2;
		} else if (this.speedY <= -3) {
			this.currImg = 3;
		}
	}
}
