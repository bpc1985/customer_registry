angular.module('app').controller('crServiceModalCtrl',
            function($scope, crRootFactory){

    crRootFactory.setLanguageDir('office');

    $scope.removeService = function(value){
        $scope.office.services = _.without($scope.office.services, value);
    };

    $scope.addService = function(){
        if($scope.new_service && !_.contains($scope.office.services, $scope.new_service) ){
            $scope.office.services.push($scope.new_service);
        }
        delete $scope.new_service;
    };
});
