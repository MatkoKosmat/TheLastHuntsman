Candy.GameOver = function(game){};
var GameOver = {

    preload : function() {
        // Load the needed image for this game screen.
        this.load.image('game-over', 'img/gameover.png');
    },

    create : function() {

        // Create button to start game like in Menu.
        this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', this.MainMenu, this, 1, 0, 2);

        // Add text with information about the score from last game.
      //  this.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
      //  this.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });

    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Game');

    }

};
