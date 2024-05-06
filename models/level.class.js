class Level {
	enemies;
	coin;
	flasks;
	clouds;
	backgroundObjects;
	level_end_x = 3440;

	constructor(enemies, coin, flasks, clouds, backgroundObjects) {
		this.enemies = enemies;
		this.coin = coin;
		this.flasks = flasks;
		this.clouds = clouds;
		this.backgroundObjects = backgroundObjects;
	}
}
