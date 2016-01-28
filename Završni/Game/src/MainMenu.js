Candy.MainMenu = function(game){};
Candy.MainMenu.prototype = {
	create: function(){
		// prikaz slika
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-20, Candy.GAME_HEIGHT-650, 'monster-cover');
		this.add.sprite(0, 0, 'title');
		// button star
		this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// pokretanje skripte game
		this.state.start('Game');
	}
};
