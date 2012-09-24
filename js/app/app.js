window.App = {
	history: [],
		
	//Setup namespaces
	Mixins: {},
	pages: {},
	
	initialize : function() {
        var locationMinsk = new google.maps.LatLng(53.90564543790776, 27.554806518554642);//(долгота, широта)

		Backbone.history.start();
        this.markersArr = [];

        this.mapOptions = {
            zoom: 12,
            center: locationMinsk,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.geocoder = new google.maps.Geocoder();
	},

    mapInit: function(mapContainer, mapOptions) {
        this.map = new google.maps.Map(mapContainer, mapOptions);
    },

    directionsInit: function(map, panel){
        this.directionsService = new google.maps.DirectionsService();
        this.directionDisplay = new google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(map);
        this.directionsDisplay.setPanel(panel);
    }
}




