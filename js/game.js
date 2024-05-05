let canvas;
let world;
let keyboard = new Keyboard();
let bg_sound = new Audio('audio/bg-audio.mp3');
let walking_sound = new Audio('audio/running.mp3');
let jumping_sound = new Audio('audio/jumping.mp3');
let throwing_sound = new Audio('audio/throwing.mp3');
let coin_pickUp = new Audio('audio/coin-collect.mp3');
let flask_pickUp = new Audio('audio/flask-collect.mp3');
let hurt_sound = new Audio('audio/damage.mp3');
let flask_breake = new Audio('audio/bottle-breake.mp3');

/**
 * calls starting functions
 */
function startGame() {
	initLevel();
	init();
	hideStart();
}

/**
 * checks if the user is on a touch device and displays touch buttons if the user is on touch device
 */
window.addEventListener('touchstart', () => {
	document.getElementById('action-btns').classList.remove('d-none');
});

/**
 * starts the world drawing
 */
function init() {
	canvas = document.getElementById('canvas');
	world = new World(canvas, keyboard);
}

function showHelp() {
	document.getElementById('how-to').classList.remove('d-none');
}

function closeHelp() {
	document.getElementById('how-to').classList.add('d-none');
}

/**
 * initializes fullscreen mode and adjusts button height
 */
function showFullscreen() {
	let container = document.getElementById('fullscreen');
	enterFullscreen(container);
	document.getElementById('show-full').classList.add('d-none');
	document.getElementById('hide-full').classList.remove('d-none');
	addButtonHeight();
}

/**
 * initializes fullscreen mode end and adjusts button height
 */
function hideFullscreen() {
	let container = document.getElementById('fullscreen');
	exitFullscreen(container);
	document.getElementById('show-full').classList.remove('d-none');
	document.getElementById('hide-full').classList.add('d-none');
	removeButtonHeight();
	console.log('ausgeführt');
}

/**
 * enters fullscreen mode
 * @param {HTMLElement} element
 */
function enterFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	}
}

/**
 * exits fullscreen mode
 */
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

/**
 * adjusts height of play buttons
 */
function addButtonHeight() {
	document.querySelectorAll('.game-btn').forEach((el) => el.classList.add('bigger'));
}

/**
 * removes bigger height of play buttons
 */
function removeButtonHeight() {
	document.querySelectorAll('.game-btn').forEach((el) => el.classList.remove('bigger'));
}

/**
 * hides the start screen
 */
function hideStart() {
	document.getElementById('start-screen-img').classList.add('d-none');
	document.getElementById('play-btn').classList.add('d-none');
}

/**
 * clears every interval
 */
function clearAllIntervals() {
	for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * redirects to the menu
 */
function goToMenu() {
	window.location.reload();
}

/**
 * restarts the current level
 */
function replay() {
	document.getElementById('win-screen').classList.add('d-none');
	document.getElementById('lose-screen').classList.add('d-none');
	startGame();
}

/**
 * checks what button was pressed
 */
window.addEventListener('keydown', (e) => {
	if (e.keyCode == 37) {
		keyboard.LEFT = true;
	}
	if (e.keyCode == 38) {
		keyboard.UP = true;
	}
	if (e.keyCode == 39) {
		keyboard.RIGHT = true;
	}
	if (e.keyCode == 40) {
		keyboard.DOWN = true;
	}
	if (e.keyCode == 32) {
		keyboard.SPACE = true;
	}
	if (e.keyCode == 68) {
		keyboard.D = true;
	}
});

/**
 * checks if a button was released
 */
window.addEventListener('keyup', (e) => {
	if (e.keyCode == 37) {
		keyboard.LEFT = false;
	}
	if (e.keyCode == 38) {
		keyboard.UP = false;
	}
	if (e.keyCode == 39) {
		keyboard.RIGHT = false;
	}
	if (e.keyCode == 40) {
		keyboard.DOWN = false;
	}
	if (e.keyCode == 32) {
		keyboard.SPACE = false;
	}
	if (e.keyCode == 68) {
		keyboard.D = false;
	}
});

/**
 * listens for tocuhes
 */
document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('left').addEventListener('touchstart', (e) => {
		e.preventDefault();
		keyboard.LEFT = true;
	});

	document.getElementById('left').addEventListener('touchend', (e) => {
		e.preventDefault();
		keyboard.LEFT = false;
	});

	document.getElementById('right').addEventListener('touchstart', (e) => {
		e.preventDefault();
		keyboard.RIGHT = true;
	});

	document.getElementById('right').addEventListener('touchend', (e) => {
		e.preventDefault();
		keyboard.RIGHT = false;
	});

	document.getElementById('up').addEventListener('touchstart', (e) => {
		e.preventDefault();
		keyboard.SPACE = true;
	});

	document.getElementById('up').addEventListener('touchend', (e) => {
		e.preventDefault();
		keyboard.SPACE = false;
	});

	document.getElementById('throw').addEventListener('touchstart', (e) => {
		e.preventDefault();
		keyboard.D = true;
	});

	document.getElementById('throw').addEventListener('touchend', (e) => {
		e.preventDefault();
		keyboard.D = false;
	});
});

/**
 * displays lost screen
 */
function showLoseScreen() {
	document.getElementById('lose-screen').classList.remove('d-none');
}

/**
 * displays win screen
 */
function showWinScreen() {
	document.getElementById('win-screen').classList.remove('d-none');
}

/**
 * toggles the game-sound
 */
function toggleSound() {
	let img = document.getElementById('sound-toggle');
	let soundOff = img.src.endsWith('sound-off.png');
	bg_sound.loop = true;
	bg_sound.volume = 0.05;
	bg_sound.play();

	if (soundOff) {
		muteAllSounds(img);
	} else {
		enableAllSounds(img);
	}
}

/**
 * mutes every game-sound
 * @param {HTMLElement} img
 */
function muteAllSounds(img) {
	img.src = 'img/icons/sound-on.png';
	bg_sound.muted = false;
	walking_sound.muted = false;
	jumping_sound.muted = false;
	throwing_sound.muted = false;
	coin_pickUp.muted = false;
	flask_pickUp.muted = false;
	hurt_sound.muted = false;
	flask_breake.muted = false;
}

/**
 * eneables every game Sound
 * @param {HTMLElement} img
 */
function enableAllSounds(img) {
	img.src = 'img/icons/sound-off.png';
	bg_sound.muted = true;
	walking_sound.muted = true;
	jumping_sound.muted = true;
	throwing_sound.muted = true;
	coin_pickUp.muted = true;
	flask_pickUp.muted = true;
	hurt_sound.muted = true;
	flask_breake.muted = true;
}
