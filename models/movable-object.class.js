class MovableObject extends DrawableObject {
	speed = 0.2;
	otherDirection = false;
	speedY = 0;
	acceleration = 1;
	lastHit = 0;
	energy = 100;

	/**
	 * lets Items and Character fall to the ground
	 */
	applyGravity() {
		setInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			}
		}, 1000 / 40);
	}

	/**
	 *
	 * @returns if the character or the items is above the ground
	 */
	isAboveGround() {
		return this.y < 430 - this.height;
	}

	/**
	 *
	 * @param {Object} mo
	 * @returns boolean if two things are colliding
	 */
	isColliding(mo) {
		return (
			this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
			this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
			this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
			this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
		);
	}

	/**
	 *
	 * @param {Object} mo
	 * @returns if the Bottom is colliding with the top 10% of the objects top frame
	 */
	topCollision(mo) {
		return (
			this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
			this.y + this.height - this.offset.bottom < mo.y + mo.offset.top + mo.height * 0.1
		);
	}

	/**
	 * removes Health or Energy from the hurt Object based on the hitting objects damage
	 * @param {Object} mo
	 */
	hit(mo) {
		if (!this.isHurt()) {
			this.energy -= mo.damage;
			if (this.energy < 0) {
				this.energy = 0;
			} else {
				this.lastHit = new Date().getTime();
			}
		}
	}

	/**
	 *
	 * @returns if the time since the last hit is lower than 1 second
	 */
	isHurt() {
		let timePassed = new Date().getTime() - this.lastHit;
		timePassed = timePassed / 1000;
		return timePassed < 1;
	}

	/**
	 *
	 * @returns if the current elements energy is 0
	 */
	isDead() {
		return this.energy == 0;
	}

	/**
	 * iterates over the images from the given array repeatedly
	 * @param {array} images
	 */
	playAnimation(images) {
		let i = this.currImg % images.length;
		let path = images[i];
		this.img = this.imageCache[path];
		this.currImg++;
	}

	/**
	 * lets the Object fly into the air
	 */
	jump() {
		this.speedY = 17;
	}

	/**
	 * lets the object move right
	 */
	moveRight() {
		this.x += this.speed;
	}

	/**
	 * lets the object move left
	 */
	moveLeft() {
		this.x -= this.speed;
	}
}
