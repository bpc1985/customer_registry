angular.module('app').directive('gmap', function ($window, $translate) {
     // directive link function
    var link = function(scope, element, attrs) {
        var map, mapOptions, infowindow;
        var combined_address;
        var geocoder = new google.maps.Geocoder();

        /*
        function injectGoogleMap() {
            var wf = document.createElement('script');
            wf.type = 'text/javascript';
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
            console.log("Added Google Map JS Script");
        };
        */

        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        function createMapOptions(latitude, longitude){
            mapOptions = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
        }

        function setMarker(map, latitude, longitude, title, content) {
            var marker;
            var markerOptions = {
                position: new google.maps.LatLng(latitude, longitude),
                map: map,
                title: title,
                draggable: true
            };

            scope.latitude  = latitude;
            scope.longitude = longitude;
            scope.$apply();

            marker = new google.maps.Marker(markerOptions);

            google.maps.event.addListener(marker, 'dragend', function (map_marker) {
                scope.latitude  = map_marker.latLng.lat();
                scope.longitude = map_marker.latLng.lng();
                scope.$apply();
            });

            infowindow = new google.maps.InfoWindow({
              content: $translate.instant('If pin is not right place, you can move it')
            });

            google.maps.event.addListener(marker, 'click', function (map_marker) {
                infowindow.open(map, marker);
            });
        }

        function runMap(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    createMapOptions(position.coords.latitude, position.coords.longitude);
                    initMap();
                    setMarker(map, position.coords.latitude, position.coords.longitude, $translate.instant('If pin is not right place, you can move it'), 'Just some content');
                });
            } else {
                alert("Geolocation is not supported by this browser.");
                createMapOptions(172059075759336, 24.941139147607373);
                initMap();
                setMarker(map, 60.172059075759336, 24.941139147607373, $translate.instant('If pin is not right place, you can move it'), 'Just some content');
            }
        }

        runMap();

        scope.$watch('[address, city]', function(){
            if(scope.address){
                map = null;
                combined_address = scope.address + ', ' + scope.city;

                geocoder.geocode( { 'address': combined_address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        lat = results[0].geometry.location.lat();
                        lng = results[0].geometry.location.lng();

                        createMapOptions(lat, lng);
                        map = new google.maps.Map(element[0], mapOptions);
                        map.setCenter(results[0].geometry.location);
                        setMarker(map, lat, lng, $translate.instant('If pin is not right place, you can move it'), 'Just some content');
                    }
                });
            }
        }, true);
    };

    return {
        restrict: 'E',
        template: '<div id="gmaps" style="width:100%;height:450px;"></div>',
        replace: true,
        scope: {
            address: "=",
            city: "=",
            latitude: "=",
            longitude: "="
        },
        link: link
    };
});
