Hunts.Game = function(game){
	// definicija varijabli
	this._player = null;
	this._coinsGroup = null;
	this._lifeGroup = null;
	this._spawnCoinsTimer = 0;
	this._lifeCoinsTimer = 0;
	this._fontStyle = null;
	this._coinanime = null;
	this._lifeanime = null;
	// definicija varijabli koje se koriste u item
	Hunts._scoreText = null;
	Hunts._lifeText = null;
	Hunts._score = 0;
	Hunts._health = 0;
	Hunts._coinsound = null;
};

Hunts.Game.prototype = {
	create: function(){
		// start phaser physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// set gravitacije
		this.physics.arcade.gravity.y = 200;
		// prikaz slika backgrounda, score i poda
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-30, Hunts.GAME_HEIGHT-160, 'floor');
		this.add.sprite(10, 5, 'score-bg');
		this.add.sprite(10, 80, 'life-bg');
		//this.coinsound = this.add.audio('coins');
		var music = this.add.audio('select',10,true);
		this.sound.play('select');
		this._coinanime = this.add.sprite(15, 15, 'coinanime');
		this._coinanime.animations.add('spin',[0,1,2,3,4,5,6,7,8,9], 10, true);
		this._coinanime.animations.play('spin');

		this._lifeanime = this.add.sprite(15, 90, 'life');
		this._lifeanime.animations.add('idle',[0,1,2,3,4,5,6,7], 10, true);
		this._lifeanime.animations.play('idle');
		// dodavanje pausa gumba
		this.add.button(Hunts.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
	// 	var popup = this.add.sprite(200, 200, 'player-idle-die');
	 //
  //   popup.alpha = 0.8;
  //   popup.anchor.set(0.5);
  //   popup.inputEnabled = true;
  //   popup.input.enableDrag();
	 //
	// 	//  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
	//  var pw = (popup.width / 2) - 30;
	//  var ph = (popup.height / 2) - 8;
	 //
	//  //  And click the close button to close it down again
	//  var closeButton = this.add.sprite(pw, -ph, 'start-button-new');
	//  //  Create a tween that will pop-open the window, but only if it's not already tweening or open
	//  var tween = this.add.tween(popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	//  closeButton.inputEnabled = true;
	//  closeButton.input.priorityID = 1;
	//  closeButton.input.useHandCursor = true;
	//  closeButton.events.onInputDown.add(this.closeWindow, this);
	 //
	//  //  Add the "close button" to the popup window image
	//  popup.addChild(closeButton);
	 //
	//  //  Hide it awaiting a click
	//  popup.scale.set(0.1);
		// izrada igrača
		this._player = this.add.sprite(5, 785, 'player-idle');

		// dodavanje animacije na igrača
		this._player.animations.add('idle', [0,1,2,3,4,5,6,7], 10, true);
	//	this._player.animations.add('attackMove',[0,1,2,3,4,5,6,7], 10, true);
	//	this._player.animations.add('deadMove',[0,1,2,3,4,5,6,7], 10, true);
		this.game.input.onDown.add(function(){
			this._player.destroy();
			this._player = this.add.sprite(5, 770, 'player-idle-attack');
			this._player.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11], 15, false);
			this._player.animations.play('idle');
		},this);
		// animacija igrača
		this._player.animations.play('idle');
		// postavljanje fonta
		this._fontStyle = { font: "40px BlackCastleMF", fill: "#E6D769", stroke: "#9d5f37", strokeThickness: 5, align: "center" };
		// inicijalizacija timera
		this._spawnCoinsTimer = 0;
		// inicijalizacija scorea
		Hunts._scoreText = this.add.text(120, 20, "0", this._fontStyle);

		// postavljanje zivota igrača
		Hunts._health = 1;
		Hunts._lifeText = this.add.text(120, 90, Hunts._health, this._fontStyle);

		// kreiranje grupe
		this._coinsGroup = this.add.group();
		this._lifeGroup = this.add.group();
		// spustanje coinsa
		Hunts.item.spawnCoins(this);
		this._lifeCoinsTimer = this.rnd.integerInRange(5, 10);
		console.log(this._lifeCoinsTimer);

	},
// 	openWindow: function() {
// 		//  Create a tween that will pop-open the window, but only if it's not already tweening or open
// 		tween = this.add.tween(popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
//     if ((tween !== null && tween.isRunning) || popup.scale.x === 1)
//     {
//         return;
//     }
//
//
//
// },
// closeWindow: function () {
//
//     if (tween && tween.isRunning || popup.scale.x === 0.1)
//     {
//         return;
//     }
//
//     //  Create a tween that will close the window, but only if it's not already tweening or closed
//     tween = game.add.tween(popup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
//
// },
	managePause: function(){
		// pauziranje igre
		this.game.paused = true;
		// dodavanje pripadnog teksta za pautu
		var pausedText = this.add.text((Hunts.GAME_WIDTH-594)/2, (Hunts.GAME_HEIGHT-271)/2, "Igra je pauzirana\nKlikni za nastavak.", this._fontStyle);
		// event koji gleda dal se desio klik ili tap
		this.input.onDown.add(function(){
			// micanje pripadnog teksta za pauzu
			pausedText.destroy();
			// ponovno pokretanje nakon pauze
			this.game.paused = false;
		}, this);
	},
	// restartGame: function(){
	// 	this.input.onDown.add(function(){
	// 		// micanje pripadnog teksta za pauzu
	// 		pausedText.destroy();
	// 		// ponovno pokretanje nakon pauze
	// 		this.game.paused = false;
	// 	}, this);
	// },
	update: function(){
		// update timera za svaki frame
		this._spawnCoinsTimer += this.time.elapsed;

		// ako timer dosegne više od 800 ms
		if(this._spawnCoinsTimer > 800) {
			// resetiraj ga
			this._spawnCoinsTimer = 0;
			// i ispusti novi coin
			Hunts.item.spawnCoins(this);
		}
		//life
		if(this._lifeCoinsTimer > 5 && Hunts._score > 10) {
			// resetiraj ga
			this._lifeCoinsTimer = 0;
			// i ispusti novi coin
			Hunts.item.spawnLife(this);
		}
		// loop za sve coin elemente
		this._coinsGroup.forEach(function(coins){
			// rotacija padajućih elemenata
			coins.angle += coins.rotateMe;
		});
		// ako je igrač umro
		if(!Hunts._health) {
			// prikaz pripadajuće poruke
			this.game.state.start('gameOver');
	// 		var gameover = this.add.sprite((Hunts.GAME_WIDTH-594)/2, (Hunts.GAME_HEIGHT-271)/2, 'game-over');
	// 		// pause the game
	// 		this._player.animations.paused = false;
	// 		this.game.paused = true;
	// 		this.input.onDown.add(function(){
	// 			// micanje pripadnog teksta za pauzu
	// 			gameover.destroy();
	// 			this.game.paused = false;
	// 			Hunts._score = 0;
	// 			// ponovno pokretanje nakon pauze
	// 			this.state.restart();
	// 		}, this);
		}
	}

};

Hunts.item = {
	spawnLife: function(game){
		var dropPos = Math.floor(Math.random()*Hunts.GAME_WIDTH);
		var dropOffset = [0, 1, 2, 3, 4, 5, 6, 7];
		var coinsType = Math.floor(Math.random()*20);
		var coins = game.add.sprite(dropPos, dropOffset[coinsType], 'life');
		this.musicCoin = game.add.audio('life',1,false);
		coins.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 20, true);
		coins.animations.play('spin');
		game.physics.enable(coins, Phaser.Physics.ARCADE);
		coins.inputEnabled = true;
		coins.events.onInputDown.add(this.clickLife, this);
		coins.checkWorldBounds = true;
		coins.events.onOutOfBounds.add(this.removeCoins, this);
		coins.anchor.setTo(0.5, 0.5);
		coins.rotateMe = (Math.random()*4)-2;
		game._coinsGroup.add(coins);
	},
	spawnCoins: function(game){
		// računanje pozicije pada elemenata
		var dropPos = Math.floor(Math.random()*Hunts.GAME_WIDTH);
		// definicija offseta za svaki padajući element
		var dropOffset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		// random generirani padajući elelemt
		var coinsType = Math.floor(Math.random()*20);
		// kreiranje novog padajućeg elementa
		var coins = game.add.sprite(dropPos, dropOffset[coinsType], 'coins');
		this.musicCoin = game.add.audio('coins',1,false);


		// dodavanje animacije
		coins.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true);
		// pokretanje definirane animacije
		coins.animations.play('spin');

		// omogućavanje physics enginea
		game.physics.enable(coins, Phaser.Physics.ARCADE);
		// omogućavanje da su coinsi klikabilni
		coins.inputEnabled = true;
		// dodavanje eventa
			coins.events.onInputDown.add(this.clickCoins, this);

		// be sure that the candy will fire an event when it goes out of the screen
		coins.checkWorldBounds = true;
		// reset candy when it goes out of screen
		coins.events.onOutOfBounds.add(this.removeCoins, this);
		// dodavanje anchora za rotaciju i poziciju
		coins.anchor.setTo(0.5, 0.5);
		// definiranje random rotacije
		coins.rotateMe = (Math.random()*4)-2;
		// dodavanje grupe
		game._coinsGroup.add(coins);
	},

	clickCoins: function(coins){
		// uništavanje elementa na klik

		coins.kill();
		this.musicCoin.play();
		// dodavanje bodova za isto
		Hunts._score += 1;
		// update bodova
		Hunts._scoreText.setText(Hunts._score);

	},
	clickLife: function(coins){
		// uništavanje elementa na klik

		coins.kill();
		this.musicCoin.play();
		// dodavanje bodova za isto
		Hunts._health += 1;
		// update bodova
		Hunts._lifeText.setText(Hunts._health);
		//Hunts._lifeText.create(this._lifeanime);
		// this._lifeanime = this.add.sprite(45, 90, 'life');
		// this._lifeanime.animations.add('idle',[0,1,2,3,4,5,6,7], 10, true);
		// this._lifeanime.animations.play('idle');

	},


	deadMove: function()
	{
	this._player.animations.play('deadMove',10,false);
	},
	removeCoins: function(coins){
		// uništavanje elementa
		coins.kill();
		this.musicCoin.play();
		// smanjene života u sličaju da element padne
		Hunts._health -= 1;
		Hunts._lifeText.setText(Hunts._health);
	}
};
