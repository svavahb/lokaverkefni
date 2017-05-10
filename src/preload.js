var preload = function(game) {};

var scoreBoard = [];
var database;

preload.prototype = {
	preload: function() {

		// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyDQIeTZRWE2vIzufAKHNydA9wXX47Dd-9s",
	    authDomain: "lokaverkefni-2ba5f.firebaseapp.com",
	    databaseURL: "https://lokaverkefni-2ba5f.firebaseio.com",
	    storageBucket: "lokaverkefni-2ba5f.appspot.com",
	    messagingSenderId: "129509575141"
	  	};
	  	firebase.initializeApp(config);
	  	database = firebase.database();
		// get haft loading bar hér líka
		/*
		var loadingBar = this.add.sprite(160,240,"loading");
		loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadingBar);
		*/

		// Text graphics
		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("play","assets/play.png");
		this.game.load.image("highscore","assets/highscore.png");
		this.game.load.image("highscoretitle", "assets/highscoretitle.png");
		this.game.load.image("submit","assets/submit.png");
		this.game.load.image("back","assets/back.png");
		this.game.load.image("gameover","assets/gameover.png");
		this.game.load.image("gamewon", "assets/gamewon.png");

		// Backgrounds
		this.game.load.image('titlebackground', 'assets/titlebackground.png');
		this.game.load.image('woods', 'assets/woods.png');
		this.game.load.image('woodscourt', 'assets/woodsend.png');
		this.game.load.image('court', 'assets/court.png');
		this.game.load.image('aether', 'assets/aetherbckg.png');

		// Platforms & walls
		this.game.load.image('ground','assets/ground.png');
		this.game.load.image('ground2', 'assets/ground2.png');
		this.game.load.image('groundtransition', 'assets/forestcourtground.png');
		this.game.load.image('groundcourt', 'assets/groundcourt.png');
		this.game.load.image('platform', 'assets/platform2.png');
		this.game.load.image('platformbig', 'assets/platformbig.png');
		this.game.load.image('platformsmall', 'assets/platformsmall.png');
		this.game.load.image('platformcourt', 'assets/platformcourt.png');
		this.game.load.image('platformcourtsmall', 'assets/platformcourtsmall.png');
		this.game.load.image('wall', 'assets/wall.png');

		// Items and objects
		this.game.load.image('star', 'assets/star.png');
		this.game.load.image('eye', 'assets/eye.png');
		this.game.load.image('rock', 'assets/rock.png');
		this.game.load.image('baddie', 'assets/diamond.png');
		this.game.load.image('diamondred', 'assets/diamondred.png');
		this.game.load.image('spike', 'assets/spike.png');
		this.game.load.image('spikeupsidedown', 'assets/spikeupsidedown.png');
		this.game.load.image('spikesquare', 'assets/spikesquare.png');
		this.game.load.image('button', 'assets/button_trans.png');
		this.game.load.image('buttonPressed', 'assets/buttonpressed_trans.png');
		this.game.load.image('annie', 'assets/annie.png');

		// Spritesheets
		this.game.load.spritesheet('renard', 'assets/reynardine.png',36,84);
		this.game.load.spritesheet('renardDown', 'assets/reynardineDown.png', 61, 68);
		this.game.load.spritesheet('robot', 'assets/robot.png', 45, 96);

		// Plugins
		this.game.plugins.add(PhaserInput.Plugin);

		// Audio
		this.game.load.audio('starcollect', ['assets/starcollect.mp3']);
		this.game.load.audio('gillitie', ['assets/gillitie.mp3']);
	},
	create: function() {
		this.game.state.start("MainMenu");
	}
}