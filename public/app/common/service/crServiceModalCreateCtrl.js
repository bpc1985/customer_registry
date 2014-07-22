angular.module('app').controller('crServiceModalCreateCtrl',
            function($scope, $http, $location, crNotifier){

    $scope.createNewService = function(){
        $scope.services.push($scope.service_name);
        crNotifier.notify('New person has been created!');
    };
});
