var level1 = function(game) {};

var player;
var platforms;
var clouds;
var cursors;
var baddie;
var button;
var cloud1;
var cloud2;
var atherBckg;
var wasStanding;
var rock;
var aetherPlatforms;
var sKey;

var downJustReleased = false;

var jumpTimer = 0;
var locked = false;
var lockedTo = false;
var wasLocked = false;
var willJump = false;

var stars;
var eye;
var stars;
var score = 0;
var scoreText;
var lives = 3;
var livesText;
var timer;
var seconds;
var aether;

// sounds
var starcollect;
var music;

var playerStat;

level1.prototype = {
	create: function() {
		// Reset variabled for this game
		this.game.time.reset();
		score = 0;
		lives = 3;
		aether = false;

		// Start physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Add sounds and audio
		starcollect = this.game.add.audio('starcollect');
		starcollect.addMarker('starcoll', 0, 1);
		//starcollect.fadeOut(2000);
		music = this.game.add.audio('gillitie');
		music.addMarker('music', 0, 21.4);
		music.loop = true;
		music.play('music', 0, 1, true);

		// Create the sky/background
		var sky = this.game.add.image(0,0,'woods');
		sky = this.game.add.image(3200,0,'woodscourt');

		aetherBckg = this.game.add.sprite(0,0,'aether');
		aetherBckg.alpha = 0.5;
		aetherBckg.scale.setTo(4,1);
		this.game.world.sendToBack(aetherBckg);

		// Create the platforms group
		platforms = this.game.add.group();
		platforms.enableBody = true;

		// Create the ground
		var ground = this.game.add.tileSprite(0, this.game.world.height - 48, 850, 548, 'ground');
		platforms.add(ground);
		ground.body.immovable = true;

		var ground2 = this.game.add.tileSprite(1705,this.game.world.height - 48, 800, 48, 'ground');
		platforms.add(ground2);
		ground2.body.immovable = true;

		var ground3 = this.game.add.tileSprite(4800, this.game.world.height - 48, 1200, 48, 'ground');
		platforms.add(ground3);
		ground3.body.immovable = true;

		var ground4 = this.game.add.tileSprite(5600, this.game.world.height - 48, 800, 48, 'groundtransition');
		platforms.add(ground4);
		ground4.body.immovable = true;

		// First ledge
		var ledge = platforms.create(400,400,'platform');
		ledge.body.immovable = true;

		// Second ledge
		ledge = platforms.create(-150,250, 'platform');
		ledge.body.immovable = true;

		ledge = platforms.create(5100, 200, 'platformbig');
		ledge.body.immovable = true;

		ledge = platforms.create(5500, 400, 'platformsmall');
		ledge.body.immovable = true;

		ledge = platforms.create(5700, 300, 'platformsmall');
		ledge.body.immovable = true;


		// Create moving platforms
		clouds = this.game.add.physicsGroup();

		cloud1 = clouds.create(900,450, 'platform');
		cloud1.body.velocity.y = 0
		cloud1.body.allowGravity = false;
		cloud1.body.immovable = true;

		cloud2 = clouds.create(1300, 100, 'platform');
		cloud2.body.velocity.y = 0;
		cloud2.body.allowGravity = false;
		cloud2.body.immovable = true;

		// Create platforms only in real world
		realPlatforms = this.game.add.group();
		realPlatforms.enableBody = true;

		var realPlatf = realPlatforms.create(3800, 300, 'platform');
		realPlatf.body.immovable = true;

		realPlatf = realPlatforms.create(2600,150, 'platform');
		realPlatf.scale.setTo(1.3,1);
		realPlatf.body.immovable = true;


		// Create hidden aether platforms
		aetherPlatforms = this.game.add.group();
		aetherPlatforms.enableBody = true;

		var aethPlatf = aetherPlatforms.create(2200, 300, 'platform');
		aethPlatf.body.allowGravity = false;
		aethPlatf.body.immovable = true;

		aethPlatf = aetherPlatforms.create(1900, 450, 'platform');
		aethPlatf.body.allowGravity = false;
		aethPlatf.body.immovable = true;

		aethPlatf = aetherPlatforms.create(3200, 300, 'platform');
		aethPlatf.body.allowGravity = false;
		aethPlatf.body.immovable = true;

		aethPlatf = aetherPlatforms.create(4400, 300, 'platform');
		aethPlatf.body.allowGravity = false;
		aethPlatf.body.immovable = true;

		this.game.world.sendToBack(aetherPlatforms);
		
		// Create hidden button which starts the platforms
		button = this.game.add.sprite(50,230, 'button');
		button.anchor.setTo(0.5,0);
		this.game.physics.arcade.enable(button);
		button.body.immovable = true;
		button.body.allowGravity = false;
		this.game.world.sendToBack(button);

		// Create a rock
		rock = this.game.add.sprite(2400, this.game.world.height - 60 - 48, 'rock');
		this.game.physics.arcade.enable(rock);
		rock.body.immovable = true;
		rock.body.allowGravity = false;

		// Create the player sprite, set properties and animations
		player = this.game.add.sprite(32, this.game.world.height - 134, 'renard');
		this.game.physics.arcade.enable(player);
		player.body.bounce.y = 0;
		player.body.gravity.y = 800;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0,1,2,3],10,true);
		player.animations.add('right', [5,6,7,8],10,true);
		player.animations.add('up', [4]);

		// Create the diamond
		diamond = this.game.add.sprite(6500, this.game.world.height - 500, 'baddie');
		diamond.frame = 1;
		this.game.physics.arcade.enable(diamond);
		diamond.body.bounce.y = 0;
		diamond.body.gravity.y = 400;

		// Create the stars group and the stars
		stars = this.game.add.group();
		stars.enableBody = true;

		for (var i=0; i < 12; i++) {
			var star = stars.create(i*70, 0, 'star');
			star.body.gravity.y = 300;
			star.body.bounce.y = 0.4 + Math.random()*0.1;
		}

		star = stars.create(5200,100, 'star');
		star.body.gravity.y = 300;

		star = stars.create(5270, 100, 'star');
		star.body.gravity.y = 300;

		star = stars.create(5340, 100, 'star');
		star.body.gravity.y = 300;

		// Create the coyote eye (1-up)
		eye = this.game.add.sprite(5130, 100, 'eye');
		this.game.physics.arcade.enable(eye);
		eye.body.gravity.y = 300;


		// Create the cursor keys and the 'switch' key
		cursors = this.game.input.keyboard.createCursorKeys();
		downKey = cursors.down;
		downKey.onDown.add(this.downPressed, this);
		downKey.onUp.add(this.downReleased, this);
		skey = this.game.input.keyboard.addKey(83);
		skey.onDown.add(this.sPressed,this);

		// Score, lives and timer
		scoreText = this.game.add.text(16,16,'Score: 0', { fontSize: '32px', fill: '#000'});
		scoreText.fixedToCamera = true;

		livesText = this.game.add.text(180,16,'Lives: 3', { fontSize: '32px', fill: '#000'});
		livesText.fixedToCamera = true;

		timer = this.game.add.text(16,50,""+400, { fontSize: '32px', fill: '#000'});
		timer.fixedToCamera = true;

		var leveltext = this.game.add.text(700, 16, "Level 1", {fontSize: '32px', fill: '#000'});
		leveltext. fixedToCamera = true;
		},


	update: function() {
		// Update the timer
		seconds = this.game.time.totalElapsedSeconds();
		timer.text = 400-Math.floor(seconds);

		clouds.forEach(this.wrapPlatform, this);

		// Handle collision
		var hitPlatform = this.game.physics.arcade.collide(player, platforms);
		this.game.physics.arcade.collide(diamond, platforms);
		this.game.physics.arcade.collide(stars, platforms);
		this.game.physics.arcade.collide(eye, platforms);
		this.game.physics.arcade.collide(stars,clouds);
		this.game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
		this.game.physics.arcade.overlap(player, diamond, this.collectDiamond, null, this);
		this.game.physics.arcade.overlap(player, eye, this.collectEye, null ,this);
		this.game.physics.arcade.collide(player, clouds, this.customSep, null, this);
		this.game.physics.arcade.collide(player, rock);
		if(aether) {
			this.game.physics.arcade.collide(player, button, this.buttonPressed, null, this);
			this.game.physics.arcade.collide(player, aetherPlatforms);
		}
		if (!aether) {
			this.game.physics.arcade.collide(player, realPlatforms);
		}
		this.game.physics.arcade.collide(button, platforms);

		// Check if has just switched to standing mode, move player
		if (downJustReleased) {
			player.body.y-=18;
			downJustReleased = false;
		}
		// Check if he has fallen off world
		if (player.body.y > 500) {
			player.body.collideWorldBounds = false;
		}

		// Check if he has finished the level
		if (player.body.x > 6350) {
			player.body.collideWorldBounds = false;
			if (player.body.x > 6420) {
				score = score + (500-Math.floor(seconds));
				this.game.state.start("BetweenLevels");
			}
		}

		// Kill if fallen off world, and return to start
		if (player.body.y > 700) {
			lives-=1;
			livesText.text = 'Lives: '+ lives;
			player.body.y = 450;
			player.body.x = 32;
			player.body.collideWorldBounds = true;
		}

		var standing = player.body.blocked.down || player.body.touching.down || locked;
		// Stop the player (so he doesn't keep moving after key is released)
		player.body.velocity.x = 0;

		// Handle cursor events
		if (cursors.left.isDown) {
			player.body.velocity.x = -200;
			player.animations.play('left');
			}
			else if (cursors.right.isDown) {
				player.body.velocity.x = 200;
				player.animations.play('right');
			}
			else {
				player.animations.stop();
				player.frame = 4;
		}

		// Jumping
		if (!standing && wasStanding) {
                edgeTimer = this.time.time + 250;
        }

        //  Allowed to jump?
        if ((standing || this.time.time <= edgeTimer) && cursors.up.isDown && this.time.time > jumpTimer && player.key == 'renard')
        {
            player.body.velocity.y = -550;
            jumpTimer = this.time.time + 750;
        }

        wasStanding = standing;

		// Keep the camera focused on the player
		this.game.camera.x = player.body.x-200;

		// Game over when lives gone
		if (lives <=0 ) {
			this.game.state.start("GameOver");
		}

		if (400-Math.floor(seconds)<=0) {
			this.game.state.start("GameOver");
		}
	},

	// Function for star collision
	collectStar: function(player, star) {
		if (!aether) {
			starcollect.play('starcoll');
			star.kill();
	    	score += 20;
	    	scoreText.text = 'Score: '+score;
		}
	},

	// Function for diamond collision
	collectDiamond: function(player, diamond) {
		if (!aether) {
			diamond.kill();
			score += 100;
			scoreText.text = 'Score: '+score;

			score = score + (500-Math.floor(seconds));
			this.game.state.start("BetweenLevels");
		}
	},

	collectEye: function(player, eye) {
		eye.kill();
		lives += 1;
		livesText.text = "Lives: "+lives;
	},

	buttonPressed: function(player, button) {
		if (player.body.y+84 == button.body.y) {
			button.loadTexture('buttonPressed');
			button.body.height = 13;
			button.body.y = 240;
			cloud1.body.velocity.y = -80;
			cloud2.body.velocity.y = 100;
		}
		
	},

	// Function for handling s-key event
	sPressed: function(key) {
		if (!aether) {
			this.game.world.bringToTop(aetherBckg);
			this.game.world.bringToTop(player);
			this.game.world.bringToTop(eye);
			this.game.world.bringToTop(aetherPlatforms);
			this.game.world.sendToBack(realPlatforms);
			this.game.world.bringToTop(button);
			aether = true; 
		}
		else {
			this.game.world.sendToBack(aetherBckg);
			this.game.world.sendToBack(aetherPlatforms);
			this.game.world.bringToTop(realPlatforms);
			this.game.world.sendToBack(button);
			aether = false;
		}
	},

	downPressed: function(key) {
		player.loadTexture('renardDown');
		player.body.width = 61;
		player.body.height = 68;
		player.animations.add('left', [0,1,2,3],10,true);
		player.animations.add('right', [5,6,7,8],10,true);
	},

	downReleased: function(key) {
		if (player.body.x < 5056 || player.body.x > 5444) {
			player.loadTexture('renard');
			player.body.width = 36;
			player.body.height = 84;
			player.animations.add('left', [0,1,2,3],10,true);
			player.animations.add('right', [5,6,7,8],10,true);
			downJustReleased = true;
		}
	},

	customSep: function(player, platform) {
		if (!locked && player.body.velocity > 0) {
			locked = true;
			lockedTo = platform;
			platform.playerLocked = true;

			player.body.velocity.y = 0;
		}
	},

	checkLock: function() {
		player.body.velocity.y = 0;

		if (player.body.right < lockedTo.body.x || player.body.x > lockedTo.body.right) {
			this.cancelLock();
		}
	},

	cancelLock: function() {
		wasLocked = true;
		locked = false;
	},

	wrapPlatform: function (platform) {
        if (platform.body.y < -30)
        {
            platform.body.y = 600;
        }
        else if (platform.body.y > 630) {
        	platform.body.y = 0;
        }
    }
}