var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var markersArr = [];

function initialize() {
    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var haightMinsk = new google.maps.LatLng(53.90564543790776, 27.554806518554642);//(долгота, широта)
    var mapOptions = {
        zoom: 12,
        center: haightMinsk,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapContainer = $("#map").get(0);
    map = new google.maps.Map(mapContainer, mapOptions);//инициализация карты
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel($("#directions").get(0));
}

//функция добавления маркера
function addMarkerToMap(location) {
    var title = prompt('Введите название!');
    if(title === ""){
        title = 'Место доставки '+$('#active-places ul').get(0).childElementCount;
    }

    marker = new google.maps.Marker({
        position: location,
        map: map,
        title: title,
        zIndex: 999
    });//добавление маркера

    markersArr.push(marker);

    addMarkerToList(location, title, markersArr.length-1);
}

function addMarkerToList(location, title, markerId) {
    var activePlaces = $('#active-places ul');

    geocoder.geocode({'latLng': location}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            locationFormatted = results[1].formatted_address;
        }

        var locationInfo = '<li class="location"> \
                    <p>'+title+'</p>\
                    <p>'+locationFormatted+'</p>\
                    <p class="locationLatLng">'+location+'</p>\
                    <a href="#" class="removeLocation action-important">(remove)</a>\
                    </li>'

        $(activePlaces).append(locationInfo);
        $('#places-list ul').append(locationInfo);

        $(".removeLocation", "#active-places ul").click(function(e){
            e.preventDefault();
            $(e.currentTarget).parent('.location').remove();
            markersArr[markerId].setMap(null);
        });
    });
}

function calcRoute() {
    var start, end, waypts = [];
    var locations = $('.locationLatLng','#active-places ul');
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
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}

function clearOverlays() {
    if (markersArr) {
        for (i in markersArr) {
            markersArr[i].setMap(null);
        }
/*        directionsDisplay.setMap(null);
        directionsDisplay.setPanel(null);*/
        markersArr.length = 0;
    }
}

$(document).ready(function () {
    initialize();

    google.maps.event.addListener(map, 'click', function (event) {
        addMarkerToMap(event.latLng);
    });//добавляем событие нажание мышки

    $("#calcRoute", "#active-places").click(function(e){
        e.preventDefault();
        calcRoute();
    });

    $("#clearLocations", "#active-places").click(function(e){
        e.preventDefault();
        clearOverlays();
        $("#active-places ul").empty();
    });
});



