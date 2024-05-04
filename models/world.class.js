class World {
	character = new Character();
	level = level1;
	canvas;
	ctx;
	keyboard;
	camera_x = 0;
	statusBarHealth = new StatusbarHealth();
	statusBarCoins = new StatusbarCoins();
	statusBarFlasks = new StatusbarFlasks();
	statusBarEndboss = new StatusbarEndboss();
	throwableObjects = [];
	coins = 0;
	flasks = 0;

	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();
		this.setWorld();
		this.run();
	}

	setWorld() {
		this.character.world = this;
	}

	run() {
		setInterval(() => {
			this.checkCollisions();
			this.checkThrow();
			this.checkBottleThrowCollision();
		}, 1000 / 60);
	}

	checkThrow() {
		if (this.keyboard.D) {
			if (this.flasks > 0) {
				let bottle = new ThrowableObject(
					this.character.x,
					this.character.y
				);
				this.throwableObjects.push(bottle);
				throwing_sound.play();
				this.keyboard.D = false;
				this.flasks--;
				this.statusBarFlasks.setPercentage(this.flasks * 20);
			}
		}
	}

	checkBottleThrowCollision() {
		this.throwableObjects.forEach((flask) => {
			this.level.enemies.forEach((enemy) => {
				if (this.bottleCollision(flask, enemy)) {
					flask.hitted = true;
					enemy.hit(flask);
					if (enemy instanceof Endboss) {
						this.statusBarEndboss.setPercentage(enemy.energy);
					}
					if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
						enemy.speed = 0;
						enemy.damage = 0;
					}
				}
			});
		});
	}

	bottleCollision(flask, enemy) {
		const xPos =
			flask.x + flask.width >= enemy.x + enemy.offset.left &&
			flask.x <= enemy.x + enemy.width - enemy.offset.right;
		const yPos =
			flask.y + flask.height >= enemy.y + enemy.offset.top &&
			flask.y <= enemy.y + enemy.height - enemy.offset.bottom;
		return xPos && yPos;
	}

	checkCollisions() {
		this.checkEnemyCollision();
		this.checkCoinCollision();
		this.checkFlaskCollision();
	}

	checkEnemyCollision() {
		this.level.enemies.forEach((enemy) => {
			if (this.character.isColliding(enemy)) {
				if (
					this.character.topCollision(enemy) &&
					this.character.speedY < 0
				) {
					enemy.speed = 0;
					enemy.damage = 0;
				} else if (enemy.damage > 0) {
					this.character.hit(enemy);
					this.statusBarHealth.setPercentage(this.character.energy);
				}
			}
		});
	}

	checkCoinCollision() {
		this.level.coin.forEach((coin) => {
			if (this.character.isColliding(coin)) {
				this.collectCoin();
				coin.x = -4000;
				this.statusBarCoins.coinCounter = this.coins;
			}
		});
	}

	checkFlaskCollision() {
		this.level.flasks.forEach((flask) => {
			if (this.character.isColliding(flask)) {
				if (this.flasks < 5) {
					this.collectFlask();
					flask.x = -4000;
					this.statusBarFlasks.setPercentage(this.flasks * 20);
				}
			}
		});
	}

	collectCoin() {
		coin_pickUp.currentTime = 0;
		coin_pickUp.play();
		this.coins++;
	}

	collectFlask() {
		flask_pickUp.currentTime = 0;
		flask_pickUp.play();
		this.flasks++;
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.translate(this.camera_x, 0);

		this.addObjectsToMap(this.level.backgroundObjects);
		this.addObjectsToMap(this.level.coin);
		this.addObjectsToMap(this.level.flasks);
		this.addObjectsToMap(this.level.clouds);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);

		/* Space for fixed Objects */
		this.ctx.translate(-this.camera_x, 0);
		this.addToMap(this.statusBarHealth);
		this.addToMap(this.statusBarCoins);
		this.statusBarCoins.drawCounter(this.ctx);
		this.addToMap(this.statusBarFlasks);
		this.addToMap(this.statusBarEndboss);
		this.ctx.translate(this.camera_x, 0);

		this.addToMap(this.character);
		this.ctx.translate(-this.camera_x, 0);

		//draw() wird immer wieder aufgerufen
		let self = this;
		requestAnimationFrame(function () {
			self.draw();
		});
	}

	addObjectsToMap(objects) {
		objects.forEach((o) => {
			this.addToMap(o);
		});
	}

	addToMap(mo) {
		if (mo.otherDirection) {
			this.flipImage(mo);
		}
		mo.draw(this.ctx);

		if (mo.otherDirection) {
			this.flipImageBack(mo);
		}
	}

	flipImage(mo) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1, 1);
		mo.x = mo.x * -1;
	}

	flipImageBack(mo) {
		mo.x = mo.x * -1;
		this.ctx.restore();
	}
}
