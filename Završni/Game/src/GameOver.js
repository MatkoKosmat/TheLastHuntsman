var gameOver = function(game){};

gameOver.prototype = {
  init: function(score){
  //  var ScoreText = this.add.text((Hunts.GAME_WIDTH-594)/2, (Hunts.GAME_HEIGHT-271)/2, "Score:" + Hunts._score);
    //this.game.paused = true;
		//alert("You scored: "+ Hunts._score);
    //var scoreFinal = Hunts._score;
	},

    create : function() {
    this._fontStyle = { font: "40px BlackCastleMF", fill: "#E6D769", stroke: "#9d5f37", strokeThickness: 5, align: "center" };
    var gameOverTitle = this.game.add.sprite((Hunts.GAME_WIDTH-600), (Hunts.GAME_HEIGHT-700),"game-over");
		var restartButton = this.game.add.button((Hunts.GAME_WIDTH-150), (Hunts.GAME_HEIGHT-390),"button-restart",this.restartGame,this);
    var homeButton = this.game.add.button((Hunts.GAME_WIDTH-570), (Hunts.GAME_HEIGHT-390),"button-home",this.startGame,this);
    var ScoreText = this.add.text((Hunts.GAME_WIDTH-180)/2, (Hunts.GAME_HEIGHT-390),"You Score is:\n"+Hunts._score+" Coins.", this._fontStyle);
    this._player = this.add.sprite(5, 770, 'player-idle-attack');
    this._player.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11], 15, false);
    this._player.animations.play('idle');
    },

    restartGame: function () {

        // Change the state back to Game.
        this.state.start('Game');
        Hunts._score = 0;

    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('MainMenu');
        Hunts._score = 0;

    }


};
