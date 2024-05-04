class StatusbarCoins extends DrawableObject {
	IMAGES_COINS = [
		'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
		'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
		'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
		'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
		'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
		'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
	];
	coinCounter = 0;

	constructor() {
		super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
		this.x = 10;
		this.y = 90;
		this.width = 50;
		this.height = 50;
	}

	drawCounter(ctx) {
		ctx.font = '25px Arial';
		ctx.fillStyle = 'black';
		ctx.strokeStyle = 'white';
		ctx.textAlign = 'center';
		ctx.strokeText(this.coinCounter, this.x + this.width + 5, this.y + this.height - 12);
		ctx.fillText(this.coinCounter, this.x + this.width + 5, this.y + this.height - 12);
	}
}
