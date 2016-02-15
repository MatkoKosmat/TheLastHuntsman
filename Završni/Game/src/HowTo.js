var howTo = function(game){};

howTo.prototype = {

    create : function() {
      this.add.sprite(0, 0, 'background-default');
      var howTo = this.game.add.sprite((Hunts.GAME_WIDTH)/2, (Hunts.GAME_HEIGHT)/2, 'howto-bg');
  		howTo.anchor.setTo(0.5, 0.5);
      var playNow = this.game.add.button((Hunts.GAME_WIDTH+400)/2, (Hunts.GAME_HEIGHT+450)/2, 'button-play-small',this.startGame,this,1,0);
      playNow.anchor.setTo(0.5, 0.5);
      var goBack = this.game.add.button((Hunts.GAME_WIDTH-400)/2, (Hunts.GAME_HEIGHT+450)/2, 'button-back',this.mainMenuGame,this,1,0);
      goBack.anchor.setTo(0.5, 0.5);
    },

  mainMenuGame: function () {
        // Change the state back to Game.
        this.state.start('MainMenu');
    },
    startGame: function () {
        // Change the state back to Game.
        this.state.start('Game');
    }
};
