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
	Hunts._life = null;
	Hunts._lifes = null;
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
		this.add.sprite(0, Hunts.GAME_HEIGHT-85, 'floor');
		this.add.sprite(10, 5, 'score-bg');
		//this.add.sprite(10, 80, 'life-bg');
		//this.coinsound = this.add.audio('coins');
		var music = this.add.audio('select',10,true);
		var dropcoin = this.add.audio('dropcoin',10,true);
		this.sound.play('select');
		this._coinanime = this.add.sprite(30, 60, 'coinanime-small');
		this._coinanime.animations.add('spin',[0,1,2,3,4,5,6,7,8,9], 10, true);
		this._coinanime.animations.play('spin');



		// dodavanje pausa gumba
		var pauseButton =	this.add.button(Hunts.GAME_WIDTH-80, 5, 'button-pause', this.managePause, this, 1, 0);

		// izrada igrača
		this._player = this.add.sprite(5, 785, 'player-idle');

		// dodavanje animacije na igrača
		this._player.animations.add('idle', [0,1,2,3,4,5,6,7], 10, true);
		this.game.input.onDown.add(function(){
			this._player.destroy();
			this._player = this.add.sprite(5, 770, 'player-idle-attack');
			this._player.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11], 15, false);
			this._player.animations.play('idle');
		},this);
		// animacija igrača
		this._player.animations.play('idle');
		// postavljanje fonta
		// this._fontStyle = { font: "40px font", fill: "#E6D769", stroke: "#9d5f37", strokeThickness: 5, align: "center" };
		// inicijalizacija timera
		this._spawnCoinsTimer = 0;
		// inicijalizacija scorea
		Hunts._scoreText = this.add.bitmapText(90, 58,'casltefont', "0",34);

		// postavljanje zivota igrača
		Hunts._health = 3;
		Hunts._lifes =  this.add.group();
		for (var i = 0, j = 30; i < Hunts._health; i++, j=j+32) {
			// this._lifeanime = this.add.sprite(j, 105, 'life');
			// this._lifeanime.animations.add('idle',[0,1,2,3,4,5,6,7], 8, true);
			// this._lifeanime.animations.play('idle');
			Hunts._life = Hunts._lifes.create(j,105,'life');

		}
		// Hunts._lifeText = this.add.text(120, 90, Hunts._health, this._fontStyle);

		// kreiranje grupe
		this._coinsGroup = this.add.group();
		this._lifeGroup = this.add.group();
		// spustanje coinsa
		Hunts.item.spawnCoins(this);
		this._lifeCoinsTimer = this.rnd.integerInRange(5, 10);
		console.log(this._lifeCoinsTimer);

	},

	managePause: function(){
		// pauziranje igre
		this.game.paused = true;
		// dodavanje pripadnog teksta za pautu
		var pausedBack = this.add.sprite((Hunts.GAME_WIDTH)/2, (Hunts.GAME_HEIGHT)/2, 'pause-bg');
		pausedBack.anchor.setTo(0.5, 0.5);
		var pausedText = this.add.bitmapText((Hunts.GAME_WIDTH)/2, (Hunts.GAME_HEIGHT)/2,'casltefont', "Pause\nClick to continue",42);
		pausedText.anchor.setTo(0.5, 0.5);
		// event koji gleda dal se desio klik ili tap
		 this.input.onDown.add(function(){
		 	// micanje pripadnog teksta za pauzu
		 	pausedText.destroy();
			pausedBack.destroy();
		 	// ponovno pokretanje nakon pauze
			this.game.paused = false;
		 }, this);

	},

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
		if(Hunts._score > 15) {
			this.physics.arcade.gravity.y = 300;
		}
		if(Hunts._score > 30) {
			this.physics.arcade.gravity.y = 400;
		}
		if(Hunts._score > 50) {
			this.physics.arcade.gravity.y = 500;
		}
		if(Hunts._score > 75) {
			this.physics.arcade.gravity.y = 650;
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
		}
	}

};

Hunts.item = {
	spawnLife: function(game){
		var dropPos = Math.floor(Math.random()*Hunts.GAME_WIDTH);
		var dropOffset = [0, 1, 2, 3, 4, 5, 6, 7];
		var coinsType = Math.floor(Math.random()*20);
		var coins = game.add.sprite(dropPos, dropOffset[coinsType], 'life');
		this.musicLife = game.add.audio('bonus',1,false);
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
		this.musicCoinDead = game.add.audio('dropcoin',1,false);
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
		// reset kada izađe izvan ekrana
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
		this.musicLife.play();
		// dodavanje bodova za isto
		Hunts._health += 1;
		Hunts._life = Hunts._lifes.getChildAt();
	},


	deadMove: function()
	{
	this._player.animations.play('deadMove',10,false);
	},
	removeCoins: function(coins,life){
		// uništavanje elementa
		coins.kill();
		this.musicCoinDead.play();

		//this.musicCoin.play();
		// smanjene života u sličaju da element padne
		Hunts._health -= 1;
		Hunts._life = Hunts._lifes.getFirstAlive();

    if (Hunts._life)
    {
        Hunts._life.destroy();
    }
		// Hunts._lifeText.setText(Hunts._health);
	}
};
