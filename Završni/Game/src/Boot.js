var Candy = {};
Candy.Boot = function(game){};
Candy.Boot.prototype = {
	preload: function(){
		//preload slika
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function(){

		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	//	this.scale.setScreenSize(true);
		// start Preloader
		this.state.start('Preloader');
	}
};
