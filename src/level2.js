var level2 = function(game) {};

var player;
var robot;
var platforms;
var clouds;
var baddie;
var button;
var cloud1;
var cloud2;
var atherBckg;
var wasStanding;
var rock;
var aetherPlatforms;
var killRobotLedge;

var circleClouds;
var moveCloud;
var degreesCloud = 0;

var moveCloud2;
var spikes;
var spikesquares;

var deathAnim;

var edgeTimer;
var jumpTimer = 0;
var locked = false;
var lockedTo = false;
var wasLocked = false;
var willJump = false;
var player_died = false;
var robot_died = false;
var downJustReleased = false;
var deathAnimFinished = false;
var robotDeathAnimFinished = false;

var timer;
var seconds;
var aether2;

var playerStat;

level2.prototype = {
	create: function() {
		// Reset variabled for this game
		this.game.time.reset();
		aether2 = false;

		// Start physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Create the sky/background
		var sky = this.game.add.tileSprite(0,0,6400,600,'court');

		aetherBckg = this.game.add.sprite(0,0,'aether');
		aetherBckg.alpha = 0.5;
		aetherBckg.scale.setTo(4,1);
		this.game.world.sendToBack(aetherBckg);

		// Create the platforms group
		platforms = this.game.add.group();
		platforms.enableBody = true;

		// Create the ground
		var ground = this.game.add.tileSprite(0, this.game.world.height - 48, 300, 548, 'groundcourt');
		platforms.add(ground);
		ground.body.immovable = true;

		var ground2 = this.game.add.tileSprite(4100,this.game.world.height - 48, 1600, 48, 'groundcourt');
		platforms.add(ground2);
		ground2.body.immovable = true;

		var ground3 = this.game.add.tileSprite(5200, this.game.world.height - 48, 1200, 48, 'groundcourt');
		platforms.add(ground3);
		ground3.body.immovable = true;

		ledge = platforms.create(2400, 400, 'platformcourt');
		ledge.body.immovable = true;

		ledge = platforms.create(6200, 150, 'platformcourt');
		ledge.body.immovable = true;

		ledge = platforms.create(5500, 398, 'platformcourt');
		ledge.body.immovable = true;

		// the wall
		ledge = platforms.create(5500, 118, 'wall');
		ledge.body.immovable = true;

		// the platform that appears when the robot dies
		killRobotLedge = this.game.add.sprite(5900, 250, 'platformcourtsmall');
		this.game.physics.arcade.enable(killRobotLedge);
		killRobotLedge.body.allowGravity = false;
		killRobotLedge.body.immovable = true;
		this.game.world.sendToBack(killRobotLedge);

		// Create moving platform
		clouds = this.game.add.physicsGroup();

		cloud1 = clouds.create(400,150, 'platformcourt');
		cloud1.body.velocity.y = -80;
		cloud1.body.allowGravity = false;
		cloud1.body.immovable = true;

		cloud1 = clouds.create(400,450, 'platformcourt');
		cloud1.body.velocity.y = -80;
		cloud1.body.allowGravity = false;
		cloud1.body.immovable = true;

		cloud2 = clouds.create(800, 100, 'platformcourt');
		cloud2.body.velocity.y = 100;
		cloud2.body.allowGravity = false;
		cloud2.body.immovable = true;

		cloud2 = clouds.create(800, 400, 'platformcourt');
		cloud2.body.velocity.y = 100;
		cloud2.body.allowGravity = false;
		cloud2.body.immovable = true;

		cloud3 = clouds.create(1200, 250, 'platformcourt');
		cloud3.body.velocity.y = -120;
		cloud3.body.allowGravity = false;
		cloud3.body.immovable = true;

		cloud3 = clouds.create(1200, 550, 'platformcourt');
		cloud3.body.velocity.y = -120;
		cloud3.body.allowGravity = false;
		cloud3.body.immovable = true;

		cloud3 = clouds.create(1600, 50, 'platformcourt');
		cloud3.body.velocity.y = 140;
		cloud3.body.allowGravity = false;
		cloud3.body.immovable = true;

		cloud3 = clouds.create(1600, 350, 'platformcourt');
		cloud3.body.velocity.y = 140;
		cloud3.body.allowGravity = false;
		cloud3.body.immovable = true;

		cloud3 = clouds.create(2000, 200, 'platformcourt');
		cloud3.body.velocity.y = -160;
		cloud3.body.allowGravity = false;
		cloud3.body.immovable = true;

		cloud3 = clouds.create(2000, 500, 'platformcourt');
		cloud3.body.velocity.y = -160;
		cloud3.body.allowGravity = false;
		cloud3.body.immovable = true;

		// create circle-moving clouds
		circleClouds = this.game.add.physicsGroup();

		moveCloud = circleClouds.create(3000, 220, 'platformcourtsmall');
		moveCloud.body.allowGravity = false;
		moveCloud.body.immovable = true;

		moveCloud2 = circleClouds.create(3500, 180, 'platformcourtsmall');
		moveCloud2.body.allowGravity = false;
		moveCloud2.body.immovable = true;

		// Create platforms only in real world
		realPlatforms = this.game.add.group();
		realPlatforms.enableBody = true;


		// Create hidden aether platforms
		aetherPlatforms = this.game.add.group();
		aetherPlatforms.enableBody = true;

		aethPlatf = aetherPlatforms.create(-150, 200, 'platformcourt');
		aethPlatf.body.immovable = true;

		aethPlatf = aetherPlatforms.create(2500, 200, 'platformcourtsmall');
		aethPlatf.body.immovable = true;

		this.game.world.sendToBack(aetherPlatforms);

		// Create the player sprite, set properties and animations
		player = this.game.add.sprite(32, 100, 'renard');
		this.game.physics.arcade.enable(player);
		player.body.bounce.y = 0;
		player.body.gravity.y = 800;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0,1,2,3],10,true);
		player.animations.add('right', [5,6,7,8],10,true);
		player.animations.add('up', [4]);
		deathAnim = player.animations.add('death', [9,10,9,10,9,10],10,false);
		deathAnim.onComplete.add(this.playDeathAnim, this);
		
		// Create the robot bad guy
		robot = this.game.add.sprite(6000, 450, 'robot');
		this.game.physics.arcade.enable(robot);
		robot.body.collideWorldBounds = true;
		robot.body.gravity.y = 800;
		robot.animations.add('left', [0,1,2,3],8,true);
		robot.animations.add('right', [5,6,7,8],8,true);
		var robotDeathAnim = robot.animations.add('death', [4,9,4,9,4,9],10,false);
		robotDeathAnim.onComplete.add(this.playRobotAnim, this);
		robot.body.velocity.x = -100;
		robot.animations.play('left');

		// Create the diamonds
		diamond = this.game.add.sprite(6250, 0, 'annie');
		this.game.physics.arcade.enable(diamond);
		diamond.body.bounce.y = 0;
		diamond.body.gravity.y = 400;

		diamondred = this.game.add.sprite(50, 100, 'diamondred');
		this.game.physics.arcade.enable(diamondred);
		diamondred.body.bounce.y = 0;
		diamondred.body.gravity.y = 400;
		this.game.world.sendToBack(diamondred);

		// Create spikes
		spikes = this.game.add.physicsGroup();
		spikes.enableBody = true;
		
		spike = this.game.add.tileSprite(4300, this.game.world.height - 83, 30*2, 38, 'spike');
		spikes.add(spike);
		spike.body.immovable = true;
		spike.body.allowGravity = false;

		spike = this.game.add.tileSprite(4450, this.game.world.height - 83, 30*4, 38, 'spike');
		spikes.add(spike);
		spike.body.immovable = true;
		spike.body.allowGravity = false;

		spike = this.game.add.tileSprite(4650, this.game.world.height - 83, 30*2, 38, 'spike');
		spikes.add(spike);
		spike.body.immovable = true;
		spike.body.allowGravity = false;

		spike = this.game.add.tileSprite(4800, this.game.world.height - 83, 30*6, 38, 'spike');
		spikes.add(spike);
		spike.body.immovable = true;
		spike.body.allowGravity = false;

		spike = this.game.add.tileSprite(5500, 446, 30*11, 38, 'spikeupsidedown');
		spikes.add(spike);
		spike.body.immovable = true;
		spike.body.allowGravity = false;

		spikesquares = this.game.add.physicsGroup();
		spikesquares.enableBody = true;

		spike = this.game.add.sprite(5000, 100, 'spikesquare');
		spikesquares.add(spike);
		spike.body.immovable = true;
		spike.body.allowGravity = false;
		spike.body.velocity.y = -200;

		spike = this.game.add.sprite(5100, 200, 'spikesquare');
		spikesquares.add(spike);
		spike.body.immovable = true;
		spike.body.allowGravity = false;
		spike.body.velocity.y = 250;

		spike = this.game.add.sprite(5250, 300, 'spikesquare');
		spikesquares.add(spike);
		spike.body.immovable = true;
		spike.body.allowGravity = false;
		spike.body.velocity.y = -300;

		// Create the stars group and the stars
		stars = this.game.add.group();
		stars.enableBody = true;

		for (var i=0; i <5 ; i++) {
			var star = stars.create(2420+i*70, 0, 'star');
			star.body.gravity.y = 300;
			star.body.bounce.y = 0.4 + Math.random()*0.1;
		}

		star = stars.create(5600,100, 'star');
		star.body.gravity.y = 300;

		star = stars.create(5670, 100, 'star');
		star.body.gravity.y = 300;

		star = stars.create(5740, 100, 'star');
		star.body.gravity.y = 300;

		// Create the coyote eye (1-up)
		eye = this.game.add.sprite(2550, 50, 'eye');
		this.game.physics.arcade.enable(eye);
		eye.body.gravity.y = 300;
		this.game.world.sendToBack(eye);

		// Create the cursor keys and the 'switch' key
		cursors = this.game.input.keyboard.createCursorKeys();
		downKey = cursors.down;
		var blab = "hæ";
		downKey.onDown.add(this.downPressed, this, 0);
		downKey.onUp.add(this.downReleased, this);
		this.game.input.keyboard.removeKey(83);
		var skey2 = this.game.input.keyboard.addKey(83);
		skey2.onDown.add(this.sPressed,this);

		// Score, lives and timer
		scoreText = this.game.add.text(16,16,'Score: '+score, { fontSize: '32px', fill: '#000'});
		scoreText.fixedToCamera = true;

		livesText = this.game.add.text(180,16,'Lives: '+lives, { fontSize: '32px', fill: '#000'});
		livesText.fixedToCamera = true;

		timer = this.game.add.text(16,50,""+500, { fontSize: '32px', fill: '#000'});
		timer.fixedToCamera = true;

		var leveltext = this.game.add.text(700, 16, "Level 2", {fontSize: '32px', fill: '#000'});
		leveltext. fixedToCamera = true;
		},


	update: function() {
		this.game.physics.arcade.collide(diamond, platforms);
		this.game.physics.arcade.collide(diamondred, aetherPlatforms);
		this.game.physics.arcade.collide(stars, platforms);
		this.game.physics.arcade.collide(stars,clouds);
		this.game.physics.arcade.collide(eye, aetherPlatforms);
		this.game.physics.arcade.collide(robot, platforms);

	
		if (player_died) {
			this.game.physics.arcade.collide(player, platforms);
			player.body.velocity.y = 0;
			player.body.velocity.x = 0;
			player.animations.play('death');
		}

		if (robot_died) {
			robot.body.velocity.x = 0;
			robot.animations.play('death');
			if (robotDeathAnimFinished) {
				score += 200;
				scoreText.text = 'Score: '+score;
				robot.kill();
				robotDeathAnimFinished = false;
			}
			this.game.world.bringToTop(killRobotLedge);
			this.game.physics.arcade.collide(player, killRobotLedge);
		}

		if (!player_died) {
			if (deathAnimFinished) {
				player.body.x = 32;
				player.body.y = 450;
				deathAnimFinished = false;
			}

			if(robot.body.x < 5900) {
			robot.body.velocity.x = 100;
			robot.animations.play('right');
			}
			if(robot.body.x > 6300) {
				robot.body.velocity.x = -100;
				robot.animations.play('left');
			}
			//console.log(player.body.y);
			// Update the timer
			seconds = this.game.time.totalElapsedSeconds();
			timer.text = 400-Math.floor(seconds);

			clouds.forEach(this.wrapPlatform, this);
			spikesquares.forEach(this.wrapSpike, this);

			// Handle collision
			var hitPlatform = this.game.physics.arcade.collide(player, platforms);
			this.game.physics.arcade.collide(player,circleClouds);
			this.game.physics.arcade.collide(player, spikes, this.touchSpike, null, this);
			this.game.physics.arcade.collide(player,spikesquares, this.touchSpikeSquare, null, this);
			this.game.physics.arcade.collide(player,robot, this.touchRobot, null, this);
			this.game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
			this.game.physics.arcade.overlap(player, diamond, this.collectDiamond, null, this);
			this.game.physics.arcade.collide(player, clouds, this.customSep, null, this);
			this.game.physics.arcade.collide(player, rock);
			if(aether2) {
				//this.game.physics.arcade.collide(player, button, this.buttonPressed, null, this);
				this.game.physics.arcade.collide(player, aetherPlatforms);
				this.game.physics.arcade.overlap(player, diamondred, this.collectRedDiamond, null, this);
				this.game.physics.arcade.overlap(player,eye, this.collectEye, null, this);
			}
			if (!aether2) {
				this.game.physics.arcade.collide(player, realPlatforms);
			}

			// move cloud in circles
			degreesCloud+=0.5;
			if (degreesCloud == 360) degreesCloud = 0;
			moveCloud.body.x = 3000+200*Math.sin(degreesCloud*3.1415/180);
			moveCloud.body.y = 300+200*Math.cos(degreesCloud*3.1415/180);

			moveCloud2.body.x = 3600-200*Math.sin(degreesCloud*3.1415/180);
			moveCloud2.body.y = 200-200*Math.cos(degreesCloud*3.1415/180);

			if (downJustReleased) {
				player.body.y-=18;
				downJustReleased = false;
			}

			// Check if he has fallen off world
			if (player.body.y > 500) {
				player.body.collideWorldBounds = false;
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
			if (!standing && wasStanding)
	            {
	                edgeTimer = this.time.time + 250;
	            }

	        //  Allowed to jump?
	        if ((standing || this.time.time <= edgeTimer) && cursors.up.isDown && this.time.time > jumpTimer && !cursors.down.isDown)
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
		}
	},

	// Function for star collision
	collectStar: function(player, star) {
		if (!aether2) {
			star.kill();
	    score += 20;
	    scoreText.text = 'Score: '+score;
		}
	},

	// Function for diamond collision
	collectDiamond: function(player, diamond) {
		if (!aether2) {
			score = score + (500-Math.floor(seconds));
			this.game.state.start("GameWon");
		}
	},

	// Function for red diamond collision
	collectRedDiamond: function(player, diamondred) {
		diamondred.kill();
		score += 50;
		scoreText.text = 'Score: '+score;
	},

	collectEye: function(player, eye) {
		eye.kill();
		lives += 1;
		livesText.text = "Lives: "+lives;
	},

	touchSpike: function(player, spike) {
		if (player.body.y <= spike.body.y-84) {
			lives--;
			livesText.text = 'Lives: '+lives;
			player_died = true;
			player.body.enable = false;
		}
	},

	touchSpikeSquare: function(player, spikesquare) {
		lives--;
		livesText.text = 'Lives: '+lives;
		player_died = true;
		player.body.enable = false;
	},

	touchRobot: function(player, robot) {
		if (player.body.y <= robot.body.y-84) {
			robot_died = true;
			robot.body.enable = false;
		}
		else {
			lives--;
			livesText.text = 'Lives: '+lives;
			player_died = true;
			player.body.enable = false;
		}
		
	},

	playDeathAnim: function() {
		if (player.animations.currentAnim.name == 'death') {
			//player.body.enable = true;
			player_died = false;
			deathAnimFinished = true;
		}
	},

	playRobotAnim: function() {
		if (robot.animations.currentAnim.name == 'death') {
			robotDeathAnimFinished = true;
		}
	},

	// Function for handling s-key event
	sPressed: function(key) {
		if (!aether2) {
			this.game.world.bringToTop(aetherBckg);
			this.game.world.bringToTop(player);
			this.game.world.bringToTop(aetherPlatforms);
			this.game.world.bringToTop(diamondred);
			this.game.world.bringToTop(eye);
			this.game.world.sendToBack(realPlatforms);
			//this.game.world.bringToTop(button);
			aether2 = true; 
		}
		else {
			this.game.world.sendToBack(aetherBckg);
			this.game.world.sendToBack(aetherPlatforms);
			this.game.world.sendToBack(diamondred);
			this.game.world.sendToBack(eye);
			this.game.world.bringToTop(realPlatforms);
			//this.game.world.sendToBack(button);
			aether2 = false;
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
		if (player.body.x > 5450 && player.body.x < 5830 && player.body.y > 398) {
			lives--;
			livesText.text = 'Lives: '+lives;
			player_died = true;
			player.body.enable = false;
		}
		
		player.loadTexture('renard');
		player.body.width = 36;
		player.body.height = 84;
		player.animations.add('left', [0,1,2,3],10,true);
		player.animations.add('right', [5,6,7,8],10,true);
		downJustReleased = true;

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
    },

    wrapSpike: function(spikesquare) {
    	if (spikesquare.body.y >= this.game.world.height - 48 - spikesquare.body.height) {
    		spikesquare.body.velocity.y*=-1;
    	}
    	else if (spikesquare.body.y <= 0) {
    		spikesquare.body.velocity.y*=-1;
    	}
    }
}