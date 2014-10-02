angular.module('app').controller('crCompanyEditCtrl',
  function($scope, $location, $routeParams, $translate, Restangular, crNotifier, crCompanyFactory, crPersonFactory, crRootFactory){
    crRootFactory.setLanguageDir('company');

    $scope.init = function(){
        crCompanyFactory.getCompany($routeParams.id).then(function(company){
            $scope.company = Restangular.copy(company);
            $scope.persons = crPersonFactory.getPeople();
        });
    };

    $scope.update = function(){
        crCompanyFactory.updateCompany($scope.company).then(function(){
            crNotifier.notify($translate.instant('_company_has_been_updated_'));
            $location.path('/companies');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.init();
});
