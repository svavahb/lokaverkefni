var highscore = function(game) {};

highscore.prototype = {
	create: function() {
		scoreBoard = [];

		var highscoreTitle = this.game.add.sprite(400,80, "highscoretitle");
		highscoreTitle.anchor.setTo(0.5,0.5);

		var backButton = this.game.add.button(100,540, "back",this.backToMain, this);
		backButton.anchor.setTo(0.5,0.5);

		var game2 = this.game;

		// Retrieve high scores from database
		database.ref("highscores").on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				scoreBoard.push(childSnapshot.val());
			});
			var j;
			//sorterum eftir high score
			for (var i=0; i<scoreBoard.length; i++) {
				j = i;
				while (j>0 && scoreBoard[j-1].score < scoreBoard[j].score) {
					var tmp = scoreBoard[j-1];
					scoreBoard[j-1] = scoreBoard[j];
					scoreBoard[j] = tmp;
					j = j-1;
				}
			}

			if (scoreBoard.length>10) {
				scoreBoard.splice(-(scoreBoard.length-10));
			}

			for (var i=0; i<scoreBoard.length; i++) {
				var noOfPoints
				var scoreText = game2.add.text(400,150+i*40,""+scoreBoard[i].name+"..............."+scoreBoard[i].score, { fontSize: '16px', fill: '#fff'});
				scoreText.anchor.setTo(0.5,0.5);
			}
		});


		/*if (playerStat != null) {
			scoreBoard.push(playerStat);
		}

		var j;
		//sorterum eftir high score
		for (var i=0; i<scoreBoard.length; i++) {
			j = i;
			while (j>0 && scoreBoard[j-1].score < scoreBoard[j].score) {
				var tmp = scoreBoard[j-1];
				scoreBoard[j-1] = scoreBoard[j];
				scoreBoard[j] = tmp;
				j = j-1;
			}
		}

		if (scoreBoard.length>10) {
			scoreBoard.splice(-1,1);
		}

		for (var i=0; i<scoreBoard.length; i++) {
			var noOfPoints
			var scoreText = this.game.add.text(400,150+i*40,""+scoreBoard[i].name+"..............."+scoreBoard[i].score, { fontSize: '16px', fill: '#FFF'});
			scoreText.anchor.setTo(0.5,0.5);
		}*/
	},

	backToMain: function() {
		this.game.state.start("MainMenu");
	}
}