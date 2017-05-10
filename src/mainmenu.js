var mainMenu = function(game) {};

mainMenu.prototype = {
	create: function() {
		score = 0;
		playerStat = null;
		
		var titlebackground = this.game.add.sprite(0,0, 'titlebackground');

		//var gametitle = this.game.add.sprite(400,160, "gametitle");
		//gametitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(400,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5); 
		var highscoreButton = this.game.add.button(400,480, "highscore",this.openHighscores,this);
		highscoreButton.anchor.setTo(0.5,0.5);
	},

	playTheGame: function() {
		this.game.state.start("Level1");
	},

	openHighscores: function() {
		this.game.state.start("HighScore");
	}
}