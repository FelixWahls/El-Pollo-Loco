class StatusbarEndboss extends DrawableObject {
	IMAGES_HEALTH = [
		'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
		'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
		'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
		'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
		'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
		'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
	];

	percentage = 100;

	constructor() {
		super();
		this.loadImages(this.IMAGES_HEALTH);
		this.x = 500;
		this.y = 15;
		this.width = 180;
		this.height = 50;
		this.setPercentage(100);
	}

	/**
	 * sets the current image path according to the health percentage
	 * @param {number} percentage
	 */
	setPercentage(percentage) {
		this.percentage = percentage;
		let imagePath = this.IMAGES_HEALTH[this.resolveImageIndex()];
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
