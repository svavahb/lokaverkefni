var gameWon = function(game) {};
var counterWon = 0;

gameWon.prototype = {
	create: function() {
		counterWon = 0;
		var gameover = this.game.add.sprite(400,300,"gamewon");
		gameover.anchor.setTo(0.5,0.5);
		var finalScoreText = this.game.add.text(400,400,'Final score: '+score, { fontSize: '24px', fill: '#FFF'});
		finalScoreText.anchor.setTo(0.5,0.5);
	},

	update: function() {
		//Bíða smá, opna svo næsta state: game finish
		counterWon++;

		if(counterWon>200) {
			this.game.state.start("GameFinish");
		}
	}
}