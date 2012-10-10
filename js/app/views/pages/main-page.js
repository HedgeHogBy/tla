App.MainPage = Backbone.View.extend({

	el: $("#front"),
	
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

        this.mapCase = new MapCase();
        this.panel = new Panel({map : this.mapCase.map});
        this.render();

        google.maps.event.addListener(this.mapCase.map, 'click', function (event) {
            that.addMarkerMap(event.latLng);
        });//добавляем событие нажание мышки
    },

    render : function() {

    },

    addMarkerMap: function (position) {
        var title = prompt('Введите название!');

        if(title === ""){
            title = 'Место доставки '+$('#active-places ul').get(0).childElementCount;
        }

        var marker = new google.maps.Marker({
            position: position,
            map: this.mapCase.map,
            title: title,
            zIndex: 999
        });

        App.markersArr.push(marker);

        this.addMarkerList(position, title, App.markersArr.length-1);
    },

    addMarkerList: function(position, title, markerId) {
        var activePlaces = $('#active-places ul');

        this.panel.geocoder.geocode({'latLng': position}, function(results, status) {
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
            that = this,
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
        this.panel.directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                that.panel.directionsDisplay.setDirections(result);
            }
        });
    },

    clearOverlays : function () {
        if (App.markersArr) {
            for (var i = 0; i< App.markersArr.length; i++) {
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