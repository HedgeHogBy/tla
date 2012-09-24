App.MainPageFront = Backbone.View.extend({

	el: $("#front"),
    $map: $("#map"),
    $directionsPanel: $("#directions"),
	
    events: {

    },

    initialize : function() {
        this.mapInit(this.$map.get(0), App.mapOptions);
        this.directionsInit(this.$map.get(0), this.$directionsPanel.get(0));
    },

    render : function() {

    }

});

App.pages.home = new App.MainPageFront();