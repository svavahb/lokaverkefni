var gameFinish = function(game) {};

var nameInput;

gameFinish.prototype = {
	create: function() {
		var pleaseEntertext = this.game.add.text(400,200,"Please enter your name",{ fontSize: '24px', fill: '#FFF'});
		pleaseEntertext.anchor.setTo(0.5,0.5);
		nameInput = this.game.add.inputField(310, 300, {
                font: '18px Arial',
                fill: '#FFF',
                fillAlpha: 0,
                fontWeight: 'bold',
                width: 150,
                max: 20,
                padding: 8,
                borderWidth: 1,
                borderColor: '#FFF',
                placeHolder: 'name',
                textAlign: 'center',
                zoom: true,
                max: 10
            });

		var submitButton = this.game.add.button(400,400,"submit",this.submit,this);
		submitButton.anchor.setTo(0.5,0.5);
	},

	submit: function() {
		playerStat = {name: nameInput.value, score: score};
		
        // Insert the player's stats into the database
        var newKey = database.ref().child('highscores').push().key;
        database.ref('highscores/'+newKey).set(playerStat);

        this.game.state.start("HighScore");
	}
}