let level1;
function initLevel() {
	level1 = new Level(
		[new Endboss()],

		[
			new Coin(300, 120),
			new Coin(452, 180),
			new Coin(680, 250),
			new Coin(980, 270),
			new Coin(1240, 270),
			new Coin(1300, 130),
			new Coin(1360, 270),
			new Coin(1800, 240),
			new Coin(2000, 220),
			new Coin(2200, 180),
			new Coin(2300, 270),
		],
		[
			new Flask(300, 0),
			new Flask(450, 0),
			new Flask(600, 1),
			new Flask(720, 0),
			new Flask(980, 1),
			new Flask(1200, 1),
			new Flask(1370, 1),
			new Flask(1600, 0),
			new Flask(1780, 1),
			new Flask(2030, 1),
			new Flask(2070, 1),
			new Flask(2200, 1),
			new Flask(2290, 0),
			new Flask(2400, 1),
			new Flask(2700, 0),
			new Flask(2750, 1),
			new Flask(2890, 1),
		],
		[
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
			new Cloud(),
		],
		[
			new BackgroundObject('img/5_background/layers/air.png', -719),
			new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
			new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
			new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

			new BackgroundObject('img/5_background/layers/air.png', 0),
			new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
			new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
			new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

			new BackgroundObject('img/5_background/layers/air.png', 719),
			new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
			new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
			new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

			new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
			new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
			new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
			new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

			new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
			new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
			new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
			new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

			new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
			new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
			new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
			new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

			new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
			new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
			new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
			new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),
		]
	);
}
