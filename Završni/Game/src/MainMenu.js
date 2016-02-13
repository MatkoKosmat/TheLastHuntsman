Hunts.MainMenu = function(game){};
Hunts.MainMenu.prototype = {
	create: function(){
		// prikaz slika
		this.add.sprite(0, 0, 'background');
		this.add.sprite(0, 0, 'title');
		// button star
		var playButton = this.add.button((Hunts.GAME_WIDTH)/2, (Hunts.GAME_HEIGHT+340)/2, 'button-start', this.startGame, this, 0, 2, 1);
		playButton.anchor.setTo(0.5, 0.5);
		var howtoButton = this.add.button((Hunts.GAME_WIDTH)/2, (Hunts.GAME_HEIGHT+580)/2, 'button-how-to', this.howto, this, 0, 2, 1);
		howtoButton.anchor.setTo(0.5, 0.5);
		var aboutButton = this.add.button((Hunts.GAME_WIDTH)/2, (Hunts.GAME_HEIGHT+810)/2, 'button-about', this.about, this, 0, 2, 1);
		aboutButton.anchor.setTo(0.5, 0.5);
		this.add.button(Hunts.GAME_WIDTH-95, Hunts.GAME_HEIGHT-935, 'audio-button', this.muteGame, this, 1, 0);

	//	var pausedText = this.add.text((Hunts.GAME_WIDTH-594)/2, (Hunts.GAME_HEIGHT-271)/2,Hunts._score);
	},
	muteGame: function(){
		if (!this.sound.mute) {
		//	audiobutton.destroy();
        this.sound.mute = true;
				this.add.button(Hunts.GAME_WIDTH-95, Hunts.GAME_HEIGHT-935, 'audio-button', this.muteGame, this, 4, 3);

    } else {
        this.sound.mute = false;
				this.add.button(Hunts.GAME_WIDTH-95, Hunts.GAME_HEIGHT-935, 'audio-button', this.muteGame, this, 1, 0);

    }
	},
	bestScore: function(){

	},

	startGame: function() {
		// pokretanje skripte game
		this.state.start('Game');
	},
	howto: function() {
		this.game.state.start('howTo');

	},
	about: function() {
		this.game.state.start('about');

	}
};
