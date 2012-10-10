var MapCase = Backbone.View.extend({

    el: $("#map"),

    initialize : function () {
        this.mapInit(this.$el.get(0), this.getMapSettings());
    },

    mapInit: function(mapContainer, mapOptions) {
        this.map = new google.maps.Map(mapContainer, mapOptions);
    },

    getCurrentLocation : function() {
        var defaultLocation = new google.maps.LatLng(53.90564543790776, 27.554806518554642),
            currentLocation = undefined;//(долгота, широта)

        if (Modernizr.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                if(currentLocation != undefined){
                    this.render();  //todo add propper handling (http://diveintohtml5.info/geolocation.html#divingin)
                }
            });
        }

        return currentLocation || defaultLocation;
    },

    getMapSettings : function(){
        return {
            zoom: App.settings.zoom,
            center: this.getCurrentLocation(),
            mapTypeId: App.settings.mapTypeId
        };
    }
});
