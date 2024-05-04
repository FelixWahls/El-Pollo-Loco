class MovableObject extends DrawableObject {
	speed = 0.2;
	otherDirection = false;
	speedY = 0;
	acceleration = 1;
	lastHit = 0;
	energy = 100;

	applyGravity() {
		setInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			}
		}, 1000 / 40);
	}

	isAboveGround() {
		return this.y < 430 - this.height;
	}

	isColliding(mo) {
		return (
			this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
			this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
			this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
			this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
		);
	}

	topCollision(mo) {
		return (
			this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
			this.y + this.height - this.offset.bottom < mo.y + mo.offset.top + mo.height * 0.1
		);
	}

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

	isHurt() {
		let timePassed = new Date().getTime() - this.lastHit;
		timePassed = timePassed / 1000;
		return timePassed < 1;
	}

	isDead() {
		return this.energy == 0;
	}

	playAnimation(images) {
		let i = this.currImg % images.length;
		let path = images[i];
		this.img = this.imageCache[path];
		this.currImg++;
	}

	jump() {
		this.speedY = 17;
	}

	moveRight() {
		this.x += this.speed;
	}

	moveLeft() {
		this.x -= this.speed;
	}
}
