angular.module('app').controller('crDeliveryModalCtrl',
            function($scope, crRootFactory){

    crRootFactory.setLanguageDir('office');

    $scope.removeZipCode = function(value){
        $scope.office.delivery_areas = _.without($scope.office.delivery_areas, value);
    };

    $scope.addZipCode = function(){
        if($scope.new_zipcode && !_.contains($scope.office.delivery_areas, $scope.new_zipcode) ){
            $scope.office.delivery_areas.push($scope.new_zipcode);
        }
        delete $scope.new_zipcode;
    };
});
