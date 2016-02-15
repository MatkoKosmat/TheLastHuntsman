Hunts.Preloader = function(game){
	// definicija visine i širine
	Hunts.GAME_WIDTH = 640;
	Hunts.GAME_HEIGHT = 960;
};
Hunts.Preloader.prototype = {
	preload: function(){
		//postavljenje i učitavanje slika
		this.stage.backgroundColor = '#9d5e37';
		// loader bar
		this.preloadBar = this.add.sprite((Hunts.GAME_WIDTH-311)/2, (Hunts.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		//font
		this.load.bitmapFont('casltefont', 'fonts/custom-castle-font.png','fonts/custom-castle-font.fnt');

		// audio
		this.load.audio('coins', 'img/coins1.wav');
		this.load.audio('select', 'img/select.wav');
		this.load.audio('gameover', 'img/gameover.wav');
		this.load.audio('bonus', 'img/bonus.wav');
		this.load.audio('dropcoin', 'img/dropcoin.wav');
		// slike
	 	this.load.image('background-default', 'img/background-1.png');
		this.load.image('background', 'img/Trans_backup.jpg');

		this.load.image('floor', 'img/floor-new.png');
		this.load.image('floor', 'img/floor1.png');
		this.load.image('title', 'img/final-title.png');
		// this.load.image('game-over', 'img/gameoverscreen.png');
		//this.load.image('game-over', 'img/gameover-new-screen-black.png');
		this.load.image('game-over', 'img/gameover-new-screen-with-score.png');
		//this.load.image('score-bg', 'img/score-bg-test.png');
		this.load.image('score-bg', 'img/coin-background-big.png');
		this.load.image('pause-bg', 'img/pause-background.png');
		this.load.image('howto-bg', 'img/howto-bg.png');
		this.load.image('about-bg', 'img/about-bg.png');
		// this.load.image('life-bg', 'img/score-bg-test.png');
		// this.load.image('button-pause', 'img/pause-new.png');
		// this.load.image('button-restart', 'img/button-restart.png');
		//this.load.image('button-home', 'img/button-home.png');

		// spriteovi
		this.load.spritesheet('audio-button', 'img/audio.png', 70, 70);
		this.load.spritesheet('coinanime', 'img/coinanime.png', 50, 50);
		this.load.spritesheet('coinanime-small', 'img/coinanime-small.png', 30, 30);
		this.load.spritesheet('coins', 'img/coinanime1.png', 70, 50);
		this.load.spritesheet('life', 'img/life-1.png', 30, 27);
		this.load.spritesheet('player-idle', 'img/player-idle-pack.png', 117.875, 118);
		this.load.spritesheet('player-idle-attack', 'img/player-idle-attack.png', 150, 132);
		this.load.spritesheet('gameoveranime', 'img/player-dead.png', 250, 242);
		this.load.spritesheet('button-start', 'img/play-new-buttons.png', 253, 109);
		this.load.spritesheet('button-how-to', 'img/howto-new-buttons.png', 253, 109);
		this.load.spritesheet('button-about', 'img/about-new-buttons.png', 253, 109);
		this.load.spritesheet('button-pause', 'img/pause-new-button.png', 70, 70);
		this.load.spritesheet('button-restart', 'img/restart-new-button-big.png', 101, 100);
		this.load.spritesheet('button-home', 'img/home-new-button-big.png', 101, 100);
		this.load.spritesheet('button-play-small', 'img/play-small-button.png', 104.5, 102);
		this.load.spritesheet('button-back', 'img/go-back-button.png', 102.5, 102);
		this.load.spritesheet('button-facebook', 'img/facebook-button.png', 102, 102);
		this.load.spritesheet('button-twitter', 'img/twitter-button.png', 102, 102);

	//	this.load.spritesheet('button-start', 'img/start-button-new.png', 401, 142);
	//	this.load.spritesheet('button-restart', 'img/button-start-new-v1.png', 401, 143);
	},
	create: function(){
		// pokretanje main menu
		this.state.start('MainMenu');
	}
};
