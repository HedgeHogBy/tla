App.MainPage = Backbone.View.extend({

	el: $("#front"),
    $map: $("#map"),
    $directionsPanel: $("#directions"),
	
    events: {

    },

    initialize : function() {
        $( "#info-panel", ".wrapper" ).accordion({
            collapsible: true,
            autoHeight: false,
            fillSpace: true
        });

        this.render();
    },

    render : function() {
        App.mapInit(this.$("#map").get(0), this.getMapSetup(), this.$directionsPanel.get(0));
    },

    getCurrentLocation : function() {
        var defaultLocation = new google.maps.LatLng(53.90564543790776, 27.554806518554642),
            currentLocation = undefined;//(долгота, широта)

        if (Modernizr.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                if(currentLocation != undefined){
                    this.render();
                }
            });
        }

        return currentLocation || defaultLocation;
    },

    getMapSetup : function(){
        return {
            zoom: App.settings.zoom,
            center: this.getCurrentLocation(),
            mapTypeId: App.settings.mapTypeId
        };
    }

});

App.pages.main = new App.MainPage();