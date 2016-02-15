var about = function(game){};

about.prototype = {

    create : function() {
      this.add.sprite(0, 0, 'background-default');
      var about = this.game.add.sprite((Hunts.GAME_WIDTH)/2, (Hunts.GAME_HEIGHT)/2, 'about-bg');
  		about.anchor.setTo(0.5, 0.5);
      var facebook = this.game.add.button((Hunts.GAME_WIDTH+400)/2, (Hunts.GAME_HEIGHT+450)/2, 'button-facebook',this.facebook,this,1,0);
      facebook.anchor.setTo(0.5, 0.5);
      var twitter = this.game.add.button((Hunts.GAME_WIDTH)/2, (Hunts.GAME_HEIGHT+450)/2, 'button-twitter',this.twitter,this,1,0);
      twitter.anchor.setTo(0.5, 0.5);
      var goBack = this.game.add.button((Hunts.GAME_WIDTH-400)/2, (Hunts.GAME_HEIGHT+450)/2, 'button-back',this.mainMenuGame,this,1,0);
      goBack.anchor.setTo(0.5, 0.5);
    },

  facebook: function () {
      openDeviceBrowser('https://www.facebook.com/sharer/sharer.php?u=http://thelasthuntsman.net23.net/');
    },
    twitter: function () {
      openDeviceBrowser('https://twitter.com/intent/tweet?url=http://thelasthuntsman.net23.net/&text=The+Last+Huntsman&via=mkosmat&hashtags=tvzobrana');
    },
    mainMenuGame: function () {
          // Change the state back to Game.
          this.state.start('MainMenu');
      },
};
