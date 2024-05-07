class Endboss extends MovableObject {
	y = 65;
	width = 350;
	height = 400;
	energy = 100;
	damage = 40;
	offset = {
		top: 90,
		left: 40,
		right: 60,
		bottom: 90,
	};
	speed = 15;
	hadFirstContact = false;

	IMAGES_ALERT = [
		'img/4_enemie_boss_chicken/2_alert/G5.png',
		'img/4_enemie_boss_chicken/2_alert/G6.png',
		'img/4_enemie_boss_chicken/2_alert/G7.png',
		'img/4_enemie_boss_chicken/2_alert/G8.png',
		'img/4_enemie_boss_chicken/2_alert/G9.png',
		'img/4_enemie_boss_chicken/2_alert/G10.png',
		'img/4_enemie_boss_chicken/2_alert/G11.png',
		'img/4_enemie_boss_chicken/2_alert/G12.png',
	];

	IMAGES_WALKING = [
		'img/4_enemie_boss_chicken/1_walk/G1.png',
		'img/4_enemie_boss_chicken/1_walk/G2.png',
		'img/4_enemie_boss_chicken/1_walk/G3.png',
		'img/4_enemie_boss_chicken/1_walk/G4.png',
	];

	IMAGES_ATTACK = [
		'img/4_enemie_boss_chicken/3_attack/G13.png',
		'img/4_enemie_boss_chicken/3_attack/G14.png',
		'img/4_enemie_boss_chicken/3_attack/G15.png',
		'img/4_enemie_boss_chicken/3_attack/G16.png',
		'img/4_enemie_boss_chicken/3_attack/G17.png',
		'img/4_enemie_boss_chicken/3_attack/G18.png',
		'img/4_enemie_boss_chicken/3_attack/G19.png',
		'img/4_enemie_boss_chicken/3_attack/G20.png',
	];

	IMAGES_HURT = [
		'img/4_enemie_boss_chicken/4_hurt/G21.png',
		'img/4_enemie_boss_chicken/4_hurt/G22.png',
		'img/4_enemie_boss_chicken/4_hurt/G23.png',
	];

	IMAGES_DEAD = [
		'img/4_enemie_boss_chicken/5_dead/G24.png',
		'img/4_enemie_boss_chicken/5_dead/G25.png',
		'img/4_enemie_boss_chicken/5_dead/G26.png',
	];

	constructor() {
		super().loadImage(this.IMAGES_ALERT[0]);
		this.loadImages(this.IMAGES_ALERT);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_HURT);
		this.loadImages(this.IMAGES_DEAD);
		this.loadImages(this.IMAGES_ATTACK);
		this.x = 3250;
		this.animate();
	}

	/**
	 * compares the characters current position with the position of the endboss
	 */
	animate() {
		let i = 0;
		setInterval(() => {
			if (i < 8 && world.character.x > 2800) {
				this.playAnimation(this.IMAGES_ALERT);
				this.hadFirstContact = true;
				i++;
			} else if (this.hadFirstContact) {
				this.getRelPosition();
				this.getAnimations();
			}
		}, 100);
	}

	/**
	 * lets the Endboss move to the other direction if the character is to the right of the endboss
	 */
	getRelPosition() {
		if (world.character.x < this.x + this.offset.left + this.width / 2) {
			this.otherDirection = false;
		} else {
			this.otherDirection = true;
		}
	}

	/**
	 *
	 * @returns if the character is in attack-range
	 */
	characterIsInRange() {
		return this.x - (world.character.x + world.character.width) < 250;
	}

	/**
	 * plays attack animation and bumps up the speed for the time
	 */
	endbossAttack() {
		this.playAnimation(this.IMAGES_ATTACK);
		this.speed = 30;
		if (this.otherDirection) {
			this.moveRight();
		} else {
			this.moveLeft();
		}
	}

	/**
	 * lets the endboss walk
	 */
	endbossWalk() {
		this.speed = 15;
		this.playAnimation(this.IMAGES_WALKING);
		if (this.otherDirection) {
			this.moveRight();
		} else {
			this.moveLeft();
		}
	}

	/**
	 * shows dead animation once and win screen
	 */
	endGame() {
		this.currImg = 0;
		this.playAnimation(this.IMAGES_DEAD);
		if (this.currImg == 3) {
			this.currImg = 3;
		}
		clearAllIntervals();
		showWinScreen();
	}

	/**
	 * checks the current state of the Endboss
	 */
	getAnimations() {
		if (this.isDead()) {
			this.endGame();
			bg_sound.pause();
		} else if (this.isHurt()) {
			this.playAnimation(this.IMAGES_HURT);
		} else if (this.characterIsInRange()) {
			this.endbossAttack();
		} else {
			this.endbossWalk();
		}
	}
}
