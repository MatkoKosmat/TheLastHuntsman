var gameOver = function(game) {};

gameOver.prototype = {
    init: function(score) {
      //  var ScoreText = this.add.text((Hunts.GAME_WIDTH-594)/2, (Hunts.GAME_HEIGHT-271)/2, "Score:" + Hunts._score);
      //this.game.paused = true;
      //alert("You scored: "+ Hunts._score);
      //var scoreFinal = Hunts._score;
    },

    create: function() {
      // this._fontStyle = { font: "40px BlackCastleMF", fill: "#E6D769", stroke: "#9d5f37", strokeThickness: 5, align: "center" };
      this.add.sprite(0, 0, 'background-default');
      var gameOverTitle = this.game.add.sprite((Hunts.GAME_WIDTH - 640), (Hunts.GAME_HEIGHT - 700), "game-over");
      var restartButton = this.game.add.button((Hunts.GAME_WIDTH - 150), (Hunts.GAME_HEIGHT - 435), "button-restart", this.restartGame, this, 1, 0);
      var homeButton = this.game.add.button((Hunts.GAME_WIDTH - 570), (Hunts.GAME_HEIGHT - 435), "button-home", this.startGame, this, 1, 0);
      var ScoreText = this.add.bitmapText((Hunts.GAME_WIDTH - 190) / 2, (Hunts.GAME_HEIGHT - 330), 'casltefont', Hunts._score + " Coins", 64);
      var gameover_audio = this.add.audio('gameover', 10, true);
      var twitter = this.game.add.button((Hunts.GAME_WIDTH)/2, (Hunts.GAME_HEIGHT+595)/2, 'button-twitter',this.tweetscore,this,1,0);
      twitter.anchor.setTo(0.5, 0.5);
      this.sound.play('gameover');
      this._player = this.add.sprite(80, 270, 'gameoveranime');
      this._player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 10, false);
      this._player.animations.play('idle');
    },

    tweetscore: function() {
      //share score on twitter
      var tweetbegin = 'http://twitter.com/home?status=';
      var tweettxt = 'I scored '+Hunts._score+' at this game -' + window.location.href + '.';
       var finaltweet = tweetbegin +encodeURIComponent(tweettxt);
       window.open(finaltweet,'_blank');
     },

      restartGame: function() {

        // Change the state back to Game.
        this.state.start('Game');
        Hunts._score = 0;

      },

      startGame: function() {

        // Change the state back to Game.
        this.state.start('MainMenu');
        Hunts._score = 0;

      }


    };
