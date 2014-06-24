angular.module('app').controller('crPersonEditCtrl', function($scope, $location, $routeParams, Restangular, crNotifier, crPersonFactory, crCompanyFactory){
    $scope.init = function(){
        crPersonFactory.getPerson($routeParams.id).then(function(person){
            $scope.person = Restangular.copy(person);
            crCompanyFactory.getCompanies().then(function(companies){
                $scope.companies = companies;
            });
        });
    };

    $scope.update = function(){
        crPersonFactory.updatePerson($scope.person).then(function(){
            crNotifier.notify('Person has been updated!');
            $location.path('/persons');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.init();
});
