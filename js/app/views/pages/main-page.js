App.MainPage = Backbone.View.extend({

	el: $("#front"),
    $map: $("#map"),
    $directionsPanel: $("#directions"),
	
    events: {
        "click #calcRoute" : "calcRoute",
        "click #clearLocations" : "clearOverlays"
    },

    initialize : function() {
        var that = this;
        $( "#info-panel", ".wrapper" ).accordion({
            collapsible: true,
            autoHeight: false,
            fillSpace: true
        });

        this.render();

        google.maps.event.addListener(App.map, 'click', function (event) {
            that.addMarkerMap(event.latLng);
        });//добавляем событие нажание мышки
    },

    render : function() {
        App.mapInit(this.$("#map").get(0), this.getMapSettings(), this.$directionsPanel.get(0));
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
    },

    addMarkerMap: function (position) {
        var title = prompt('Введите название!');

        if(title === ""){
            title = 'Место доставки '+$('#active-places ul').get(0).childElementCount;
        }

        var marker = new google.maps.Marker({
            position: position,
            map: App.map,
            title: title,
            zIndex: 999
        });

        App.markersArr.push(marker);

        this.addMarkerList(position, title, App.markersArr.length-1);
    },

    addMarkerList: function(position, title, markerId) {
    var activePlaces = $('#active-places ul');

        App.geocoder.geocode({'latLng': position}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var locationFormatted = results[1].formatted_address;
            }

            var locationInfo =  '<li class="location">'+
                                    '<p>'+title+'</p>'+
                                    '<p>'+locationFormatted+'</p>'+
                                    '<p class="locationLatLng">'+position+'</p>'+
                                    '<a href="#" class="removeLocation action-important">(remove)</a>'+
                                '</li>'

            $(activePlaces).append(locationInfo);
            $('#places-list ul').append(locationInfo);

            $(".removeLocation", "#active-places ul").click(function(e){
                e.preventDefault();
                $(e.currentTarget).parent('.location').remove();
                App.markersArr[markerId].setMap(null);
            });
        });
    },

    calcRoute: function () {
        var start, end, waypts = [],
            locations = $('.locationLatLng','#active-places ul');

        locations.each(function(index, value){
            if (index == 0){
                start = value.textContent;
            } else if(index == locations.length - 1){
                end = value.textContent;
            } else {
                waypts.push({
                    location:value.textContent,
                    stopover:true
                });
            }
        })
        var request = {
            origin:start,
            destination:end,
            waypoints: waypts,
            travelMode:google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
            optimizeWaypoints: true
        };
        App.directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                App.directionsDisplay.setDirections(result);
            }
        });
    },

    clearOverlays : function () {
        if (App.markersArr) {
            for (var i in App.markersArr) {
                App.markersArr[i].setMap(null);
            }
            /*        directionsDisplay.setMap(null);
             directionsDisplay.setPanel(null);*/
            App.markersArr.length = 0;
        }
        $("#active-places ul").empty();
    }

});

App.pages.main = new App.MainPage();