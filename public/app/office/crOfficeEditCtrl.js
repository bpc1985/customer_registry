angular.module('app').controller('crOfficeEditCtrl', function($scope, $location, $routeParams, Restangular, crNotifier, crOfficeFactory, crCompanyFactory, crPersonFactory){
    $scope.init = function(){
        crOfficeFactory.getOffice($routeParams.id).then(function(office){
            $scope.office = Restangular.copy(office);
            crCompanyFactory.getCompanies().then(function(companies){
                $scope.companies = companies;
                $scope.persons = crPersonFactory.getPeople();
            });
        });
    };

    $scope.update = function(){
        crOfficeFactory.updateOffice($scope.office).then(function(){
            crNotifier.notify('Office has been updated!');
            $location.path('/offices');
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.init();
});
