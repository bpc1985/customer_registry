angular.module('app').directive('serviceList', function() {
    return {
        restrict : 'E',
        templateUrl: "/app/office/service_list.html",
        scope : {
            services: "=",
        },
        controller : function($scope, $element) {
            $scope.new_service = "";
            $scope.removeService = function(value){
                $scope.services = _.without($scope.services, value);
            };

            $scope.addService = function(){
                if($scope.new_service && !_.contains($scope.services, $scope.new_service) ){
                    $scope.services.push($scope.new_service);
                }
                delete $scope.new_service;
            };
        },
        link : function(scope, element, attrs) {

        }
    };
});