var betweenLevels = function(game) {};

var counterBetween = 0;

betweenLevels.prototype = {
	create: function() {
		counterBetween = 0;
		var levelFinishedText = this.game.add.text(400,200, 'Level 1 finished!', { fontSize: '24px', fill: '#FFF'});
		levelFinishedText.anchor.setTo(0.5,0.5);
		var currentScoreText = this.game.add.text(400,300,'Current score: '+score, { fontSize: '24px', fill: '#FFF'});
		currentScoreText.anchor.setTo(0.5,0.5);
		var currentLivesText = this.game.add.text(400,400, 'Lives left: '+lives, { fontSize: '24px', fill: '#FFF'});
		currentLivesText.anchor.setTo(0.5,0.5);
	},

	update: function() {
		counterBetween++;

		if (counterBetween>200) {
			this.game.state.start("Level2");
		}

	}
}