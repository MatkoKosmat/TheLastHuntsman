Candy.Game = function(game){
	// definicija varijabli
	this._player = null;
	this._candyGroup = null;
	this._spawnCandyTimer = 0;
	this._fontStyle = null;
	this._coinanime = null;
	// definicija varijabli koje se koriste u item
	Candy._scoreText = null;
	Candy._score = 0;
	Candy._health = 0;
};
Candy.Game.prototype = {
	create: function(){
		// start phaser physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// set gravitacije
		this.physics.arcade.gravity.y = 200;
		// prikaz slika backgrounda, score i poda
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-30, Candy.GAME_HEIGHT-160, 'floor');
		this.add.sprite(10, 5, 'score-bg');

		this._coinanime = this.add.sprite(15, 15, 'coinanime');
		this._coinanime.animations.add('spin',[0,1,2,3,4,5,6,7,8,9], 10, true);
		this._coinanime.animations.play('spin');
		// dodavanje pausa gumba
		this.add.button(Candy.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		// izrada igrača
		this._player = this.add.sprite(5, 785, 'player-idle');

		// dodavanje animacije na igrača
		this._player.animations.add('idle', [0,1,2,3,4,5,6,7], 10, true);
		this._player.animations.add('attackMove',[0,1,2,3,4,5,6,7], 10, true);
		this._player.animations.add('deadMove',[0,1,2,3,4,5,6,7], 10, true);
		// animacija igrača
		this._player.animations.play('idle');
		// postavljanje fonta
		this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
		// inicijalizacija timera
		this._spawnCandyTimer = 0;
		// inicijalizacija scorea
		Candy._scoreText = this.add.text(120, 20, "0", this._fontStyle);
		// postavljanje zivota igrača
		Candy._health = 10;
		// kreiranje grupe
		this._candyGroup = this.add.group();
		// spawn first candy
		Candy.item.spawnCandy(this);

		function mainMenuBack(){
			var mainMenu = this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', mainMenuBack, this, 1, 0, 2);
			this.state.start('MainMenu');
		}
	},
	managePause: function(){
		// pauziranje igre
		this.game.paused = true;
		// dodavanje pripadnog teksta za pautu
		var pausedText = this.add.text((Candy.GAME_WIDTH-594)/2, (Candy.GAME_HEIGHT-271)/2, "Igra je pauzirana\nKlikni za nastavak.", this._fontStyle);
		// event koji gleda dal se desio klik ili tap
		this.input.onDown.add(function(){
			// micanje pripadnog teksta za pauzu
			pausedText.destroy();
			// ponovno pokretanje nakon pauze
			this.game.paused = false;
		}, this);
	},
	update: function(){
		// update timer every frame
		this._spawnCandyTimer += this.time.elapsed;
		// if spawn timer reach one second (1000 miliseconds)
		if(this._spawnCandyTimer > 800) {
			// reset it
			this._spawnCandyTimer = 0;
			// and spawn new candy
			Candy.item.spawnCandy(this);
		}
		// loop through all candy on the screen
		this._candyGroup.forEach(function(candy){
			// rotacija padajućih elemenata
			candy.angle += candy.rotateMe;
		});
		// ako je igrač umro
		if(!Candy._health) {
			// show the game over message

			var gameover = this.add.sprite((Candy.GAME_WIDTH-594)/2, (Candy.GAME_HEIGHT-271)/2, 'game-over');
	//		var mainMenu = this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', mainMenuBack, this, 1, 0, 2);
			// pause the game
			this.game.paused = true;
			this.input.onDown.add(function(){
				// micanje pripadnog teksta za pauzu
				gameover.destroy();
				this.game.paused = false;
				Candy._score = 0;
				// ponovno pokretanje nakon pauze
				this.state.restart();
			}, this);
		}
	}

};

Candy.item = {
	spawnCandy: function(game){
		// računanje pozicije pada elemenata
		var dropPos = Math.floor(Math.random()*Candy.GAME_WIDTH);
		// definicija offseta za svaki padajući element
		var dropOffset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		// random generirani padajući elelemt
		var candyType = Math.floor(Math.random()*20);
		// kreiranje novog padajućeg elementa
		var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy');
		// add new animation frame
		candy.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true);
		// play the newly created animation
		candy.animations.play('spin');
		// enable candy body for physic engine
		game.physics.enable(candy, Phaser.Physics.ARCADE);
		// enable candy to be clicked/tapped
		candy.inputEnabled = true;
		// add event listener to click/tap
		candy.events.onInputDown.add(this.clickCandy, this);
		// be sure that the candy will fire an event when it goes out of the screen
		candy.checkWorldBounds = true;
		// reset candy when it goes out of screen
		candy.events.onOutOfBounds.add(this.removeCandy, this);
		// set the anchor (for rotation, position etc) to the middle of the candy
		candy.anchor.setTo(0.5, 0.5);
		// set the random rotation value
		candy.rotateMe = (Math.random()*4)-2;
		// add candy to the group
		game._candyGroup.add(candy);
	},

	clickCandy: function(candy){
		// uništavanje elementa na klik
		candy.kill();
		// dodavanje bodova za isto
		Candy._score += 1;
		// update bodova
		Candy._scoreText.setText(Candy._score);
	},
	attackMove: function()
	{
	this._player.animations.play('attackMove', 10, false);
	},

	deadMove: function()
	{
	this._player.animations.play('deadMove',10,false);
	},
	removeCandy: function(candy){
		// uništavanje elementa
		candy.kill();
		// smanjene života u sličaju da element padne
		Candy._health -= 10;
	}
};
