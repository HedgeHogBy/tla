App.Router = Backbone.Router.extend({

	routes : {
		"broadcast/:id" : "playChannel"
	},

/*	playChannel : function(id) {
		App.debug.log("App.Router: Location changed to " + location.hash);

		if(!App.pages.live.isVisible){
			App.show(App.pages.live);
		}

		App.mainMenu.highlight($("#live-menuitem"));

		$.ajax({
			dataType: "json",
			url : basehref + '/api/channel/' + id,
			success : function(data) {
				var channel = new Channel(data[0]);

				App.debug.log("App.Router: Fetched channel '" + channel.get("title") + "'");
				App.pages.live.setChannel(channel);
				App.pages.live.play();
			},
			error : function() {
				App.native.alert({
					title: "Indholdet er ikke tilgængeligt",
					text: "Indholdet er ikke tilgængeligt"
				});
				App.countDown = 2;
				App.show(App.pages.home);
				App.mainMenu.highlight($("#home-menuitem"));
			}
		});
	},
	*/

});

App.router = new App.Router();
