angular.module('app').controller('crOfficeEditCtrl', function($scope, $location, $routeParams, Restangular, crNotifier, crOfficeFactory, crCompanyFactory, crPersonFactory){
    $scope.init = function(){
        crOfficeFactory.getOffice($routeParams.id).then(function(office){
            $scope.office = Restangular.copy(office);
        });
    };

    $scope.update = function(){
        $scope.office.company = $scope.office.company.id;
        $scope.office.contact_persons = _.pluck($scope.office.contact_persons, 'id');

        console.log("$scope.office: ", $scope.office);

        crOfficeFactory.updateOffice($scope.office).then(function(){
            crNotifier.notify('Office has been updated!');
            $location.path('/offices');
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.init();
});
