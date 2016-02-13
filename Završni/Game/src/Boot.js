var Hunts = {};
Hunts.Boot = function(game){};
Hunts.Boot.prototype = {
	preload: function(){
		//dodavanje slike za loading bar
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
