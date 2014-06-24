angular.module('app').controller('crCompanyEditCtrl', function($scope, $location, $routeParams, Restangular, crNotifier, crCompanyFactory, crPersonFactory){
    $scope.init = function(){
        crCompanyFactory.getCompany($routeParams.id).then(function(company){
            $scope.company = Restangular.copy(company);
            $scope.persons = crPersonFactory.getPeople();
        });
    };

    $scope.update = function(){
        crCompanyFactory.updateCompany($scope.company).then(function(){
            crNotifier.notify('Company has been updated!');
            $location.path('/companies');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.init();
});
