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
		// slike
		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor1.png');
	//	this.load.image('monster-cover', 'img/regeman.png');
		this.load.image('title', 'img/new_title.png');
		this.load.image('game-over', 'img/gameover4.png');
		this.load.image('score-bg', 'img/score-bg-test.png');
		//this.load.image('button-pause', 'img/button-pause-new.png');
		this.load.image('button-pause', 'img/pause-new.png');
		// spriteovi
		//this.load.spritesheet('candy', 'img/coins-new.png', 75, 75);
		this.load.spritesheet('coinanime', 'img/coinanime.png', 50, 50);
		this.load.spritesheet('coins', 'img/coinanime.png', 50, 50);
		this.load.spritesheet('coins', 'img/coins1.png', 50, 50);
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
