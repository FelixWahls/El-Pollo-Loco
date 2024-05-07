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

	IMAGES_IDLE_LONG = [
		'img/2_character_pepe/1_idle/long_idle/I-11.png',
		'img/2_character_pepe/1_idle/long_idle/I-12.png',
		'img/2_character_pepe/1_idle/long_idle/I-13.png',
		'img/2_character_pepe/1_idle/long_idle/I-14.png',
		'img/2_character_pepe/1_idle/long_idle/I-15.png',
		'img/2_character_pepe/1_idle/long_idle/I-16.png',
		'img/2_character_pepe/1_idle/long_idle/I-17.png',
		'img/2_character_pepe/1_idle/long_idle/I-18.png',
		'img/2_character_pepe/1_idle/long_idle/I-19.png',
		'img/2_character_pepe/1_idle/long_idle/I-20.png',
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
	lastAction;

	constructor() {
		super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
		this.x = 100;
		this.loadImages(this.IMAGES_IDLE);
		this.loadImages(this.IMAGES_IDLE_LONG);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_JUMPING);
		this.loadImages(this.IMAGES_DEAD);
		this.loadImages(this.IMAGES_HURT);
		this.applyGravity();
		this.animate();
	}

	/**
	 * checks states and conditions in a set interval
	 */
	animate() {
		this.lastAction = new Date().getTime();
		setInterval(() => this.getIdleAnimation(), 250);
		setInterval(() => this.getMovement(), 1000 / 60);
		setInterval(() => this.getCharacterStatus(), 50);
	}

	/**
	 * calculates the current Image for jumping based on the speedY value
	 */
	getJumpingImg() {
		if (this.speedY >= 3 && this.currImg > 1) {
			this.currImg = 1;
		} else if (this.speedY < 3 && this.speedY > -3 && this.currImg > 2) {
			this.currImg = 2;
		} else if (this.speedY <= -3) {
			this.currImg = 3;
		}
	}

	getIdleAnimation() {
		if (!this.longIdle()) {
			this.playAnimation(this.IMAGES_IDLE);
		} else {
			this.playAnimation(this.IMAGES_IDLE_LONG);
		}
	}

	longIdle() {
		let timePassed = new Date().getTime() - this.lastAction;
		timePassed = timePassed / 1000;
		return timePassed > 6;
	}

	/**
	 * executes the movement of the character
	 */
	getMovement() {
		if (this.canMoveRight()) {
			this.otherDirection = false;
			this.moveRight();
			this.lastAction = new Date().getTime();
		}
		if (this.canMoveLeft()) {
			this.otherDirection = true;
			this.moveLeft();
			this.lastAction = new Date().getTime();
		}
		if (this.canJump()) {
			this.jump();
			this.lastAction = new Date().getTime();
			jumping_sound.play();
			this.currImg = 0;
		}
		this.world.camera_x = -this.x + 200;
	}

	/**
	 * checks the current status of the character and calls functions accordingly
	 */
	getCharacterStatus() {
		walking_sound.pause();
		if (this.isDead()) {
			this.loseGame();
		} else if (this.isHurt()) {
			this.playAnimation(this.IMAGES_HURT);
			this.lastAction = new Date().getTime();
			hurt_sound.play();
		} else if (this.isAboveGround()) {
			this.getJumpingImg();
			this.playAnimation(this.IMAGES_JUMPING);
		} else {
			this.walk();
		}
	}

	/**
	 *
	 * @returns if the Character is able to move right
	 */
	canMoveRight() {
		return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
	}

	/**
	 *
	 * @returns if the Character is able to move left
	 */
	canMoveLeft() {
		return this.world.keyboard.LEFT && this.x > -490;
	}

	/**
	 *
	 * @returns if the Character is able to jump
	 */
	canJump() {
		return this.world.keyboard.SPACE && !this.isAboveGround();
	}

	/**
	 * calls the lost screen and plays dead animation once
	 */
	loseGame() {
		this.playAnimation(this.IMAGES_DEAD);
		clearAllIntervals();
		showLoseScreen();
		bg_sound.pause();
	}

	/**
	 * plays walking images and sound if the character is moving on the ground
	 */
	walk() {
		if (this.characterOnGround()) {
			this.playAnimation(this.IMAGES_WALKING);
			walking_sound.play();
		}
	}

	/**
	 *
	 * @returns if the character is on the ground and moving
	 */
	characterOnGround() {
		return !this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT);
	}
}
