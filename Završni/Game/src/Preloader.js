Hunts.Preloader = function(game){
	// definicija visine i širine
	Hunts.GAME_WIDTH = 640;
	Hunts.GAME_HEIGHT = 960;
};
Hunts.Preloader.prototype = {
	preload: function(){
		//postavljenje i učitavanje slika
		this.stage.backgroundColor = '#aeaeae';
		this.preloadBar = this.add.sprite((Hunts.GAME_WIDTH-311)/2, (Hunts.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		this.load.bitmapFont('castefont', 'fonts/BlackCastleMF-14.fnt');
		this.load.audio('coins', 'img/coins1.wav');
		this.load.audio('select', 'img/select.wav');
		// slike
		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor1.png');
	//	this.load.image('monster-cover', 'img/regeman.png');
		this.load.image('title', 'img/new_title.png');
		this.load.image('game-over', 'img/gameover4.png');
		this.load.image('score-bg', 'img/score-bg-test.png');
		this.load.image('life-bg', 'img/score-bg-test.png');

		//this.load.image('button-pause', 'img/button-pause-new.png');
		this.load.image('button-pause', 'img/pause-new.png');
		this.load.image('button-restart', 'img/button-restart.png');
		this.load.image('button-home', 'img/button-home.png');
		this.load.image('button-mute', 'img/button-mute.png');
		this.load.image('button-unmute', 'img/button-mute-1.png');
		// spriteovi
		this.load.spritesheet('coinanime', 'img/coinanime.png', 50, 50);
		this.load.spritesheet('coins', 'img/coinanime.png', 50, 50);
		this.load.spritesheet('life', 'img/life-1.png', 30, 27);
	//	this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('player-idle', 'img/player-idle-pack.png', 117.875, 118);
		this.load.spritesheet('player-idle-attack', 'img/player-idle-attack.png', 150, 132);
		this.load.spritesheet('button-start', 'img/start-button-new.png', 401, 142);
	//	this.load.spritesheet('button-restart', 'img/button-start-new-v1.png', 401, 143);
	},
	create: function(){
		// pokretanje main menu
		this.state.start('MainMenu');
	}
};
