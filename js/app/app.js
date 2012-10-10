window.App = {

	//Setup namespaces
	Mixins: {},
	pages: {},
    settings:{
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    markersArr: [],

    initialize : function() {
        App.Router = new Router();
        Backbone.history.start();
	},
}




