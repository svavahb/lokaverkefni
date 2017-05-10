var boot = function(game) {
	console.log("Starting game");
};

boot.prototype = {
	preload: function() {
		//this.game.load.image("loading","assets/loading.png");
		this.game.world.setBounds(0, 0, 6400, 600);
	},
	create: function() {
		this.game.state.start("Preload");
	}
}