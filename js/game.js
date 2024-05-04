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

function startGame() {
	initLevel();
	init();
	hideStart();
}

window.addEventListener('touchstart', () => {
	document.getElementById('action-btns').classList.remove('d-none');
});

function init() {
	canvas = document.getElementById('canvas');
	world = new World(canvas, keyboard);
}

function showFullscreen() {
	let container = document.getElementById('fullscreen');
	enterFullscreen(container);
	document.getElementById('show-full').classList.add('d-none');
	document.getElementById('hide-full').classList.remove('d-none');
	addButtonHeight();
}

function hideFullscreen() {
	let container = document.getElementById('fullscreen');
	exitFullscreen(container);
	document.getElementById('show-full').classList.remove('d-none');
	document.getElementById('hide-full').classList.add('d-none');
	removeButtonHeight();
	console.log('ausgeführt');
}

function enterFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	}
}

function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

function addButtonHeight() {
	document.querySelectorAll('.game-btn').forEach((el) => el.classList.add('bigger'));
}

function removeButtonHeight() {
	document.querySelectorAll('.game-btn').forEach((el) => el.classList.remove('bigger'));
}

function hideStart() {
	document.getElementById('start-screen-img').classList.add('d-none');
	document.getElementById('play-btn').classList.add('d-none');
}

function clearAllIntervals() {
	for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function goToMenu() {
	window.location.reload();
}

function replay() {
	document.getElementById('win-screen').classList.add('d-none');
	document.getElementById('lose-screen').classList.add('d-none');
	startGame();
}

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

function showLoseScreen() {
	document.getElementById('lose-screen').classList.remove('d-none');
}

function showWinScreen() {
	document.getElementById('win-screen').classList.remove('d-none');
}

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