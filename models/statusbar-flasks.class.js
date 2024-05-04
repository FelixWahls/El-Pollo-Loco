class StatusbarFlasks extends DrawableObject {
	IMAGES_FLASKS_BAR = [
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
		'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
	];

	percentage = 0;

	constructor() {
		super();
		this.loadImages(this.IMAGES_FLASKS_BAR);
		this.x = 10;
		this.y = 50;
		this.width = 180;
		this.height = 50;
		this.setPercentage(0);
	}

	/**
	 * sets the current image path according to the number of collected flasks * 20 (to get percantage from 100%)
	 * @param {number} percentage
	 */
	setPercentage(percentage) {
		this.percentage = percentage;
		let imagePath = this.IMAGES_FLASKS_BAR[this.resolveImageIndex()];
		this.img = this.imageCache[imagePath];
	}

	/**
	 *
	 * @returns the number of the image that has to be shown
	 */
	resolveImageIndex() {
		if (this.percentage == 100) {
			return 5;
		} else if (this.percentage >= 80) {
			return 4;
		} else if (this.percentage >= 60) {
			return 3;
		} else if (this.percentage >= 40) {
			return 2;
		} else if (this.percentage >= 20) {
			return 1;
		} else {
			return 0;
		}
	}
}
