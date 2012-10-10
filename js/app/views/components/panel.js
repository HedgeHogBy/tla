var Panel = Backbone.View.extend({

    el: $("#directions"),

    initialize : function () {
        this.directionsInit(this.options.map, this.$el.get(0));
    },

    directionsInit: function(mapObject, panelContainer) {
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(mapObject);
        this.directionsDisplay.setPanel(panelContainer);
        this.geocoder = new google.maps.Geocoder();
    },
});
