window.App = {

	//Setup namespaces
	Mixins: {},
	pages: {},
    settings:{
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },

    initialize : function() {
        App.Router = new Router();
        Backbone.history.start();
	},

    mapInit: function(mapContainer, mapOptions, panel) {
        this.map = new google.maps.Map(mapContainer, mapOptions);
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setPanel(panel);
        this.geocoder = new google.maps.Geocoder();
    },
}




