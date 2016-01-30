Hunts.MainMenu = function(game){};
Hunts.MainMenu.prototype = {
	create: function(){
		// prikaz slika
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-20, Hunts.GAME_HEIGHT-650, 'monster-cover');
		this.add.sprite(0, 0, 'title');
		// button star
		this.add.button(Hunts.GAME_WIDTH-401, Hunts.GAME_HEIGHT-143, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// pokretanje skripte game
		this.state.start('Game');
	}
};
