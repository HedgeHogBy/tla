var Destinations = Backbone.Collection.extend({
	model: Destination,
	
	url: basehref + '/api/search',
});

