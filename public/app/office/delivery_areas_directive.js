angular.module('app').directive('deliveryAreas', function() {
    return {
        restrict : 'E',
        templateUrl: "/app/office/delivery_areas.html",
        scope : {
            locations: "=",
        },
        controller : function($scope, $element) {
            $scope.removeZipCode = function(location, value){
                location.areas = _.without(location.areas, value);
            };

            $scope.addZipCode = function(location){
                if(location.new_zipcode && !_.contains(location.areas, location.new_zipcode) ){
                    location.areas.push(location.new_zipcode);
                    location.disabled = location.areas.length < 5 ? false : true;
                }
                delete location.new_zipcode;
            };
        },
        link : function(scope, element, attrs) {
            if(scope.locations && scope.locations.length === 0){
                scope.locations = [
                    { price: '', areas: [], disabled: false },
                    { price: '', areas: [], disabled: false },
                    { price: '', areas: [], disabled: false }
                ];
            }
        }
    };
});
