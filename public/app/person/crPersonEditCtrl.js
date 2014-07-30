angular.module('app').controller('crPersonEditCtrl', function($scope, $translate, $location, $routeParams, Restangular, crNotifier, crPersonFactory, crCompanyFactory, crRootFactory){
    crRootFactory.setLanguageDir('person');

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
            crNotifier.notify($translate.instant('Person has been updated'));
            $location.path('/persons');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.init();
});
