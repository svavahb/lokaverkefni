var gameOver = function(game) {};
var counter = 0;

gameOver.prototype = {
	create: function() {
		counter = 0;
		var gameover = this.game.add.sprite(400,300,"gameover");
		gameover.anchor.setTo(0.5,0.5);
		var finalScoreText = this.game.add.text(400,400,'Final score: '+score, { fontSize: '24px', fill: '#FFF'});
		finalScoreText.anchor.setTo(0.5,0.5);
	},

	update: function() {
		//Bíða smá, opna svo næsta state: game finish
		counter++;

		if(counter>200) {
			this.game.state.start("GameFinish");
		}
	}
}