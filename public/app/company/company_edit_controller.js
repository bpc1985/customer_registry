angular.module('app').controller('crCompanyEditCtrl',
  function($scope, $location, $routeParams, $translate, Restangular, crNotifier, crCompanyFactory, crPersonFactory, crRootFactory, crModalService){
    crRootFactory.setLanguageDir('company');
    var onRouteChangeOff;

    function routeChange(event, newUrl) {
        crModalService.displayModal(event, newUrl, $scope.companyForm, onRouteChangeOff);
    }

    $scope.init = function(){
        crCompanyFactory.getCompany($routeParams.id).then(function(company){
            $scope.company = Restangular.copy(company);
            $scope.persons = crPersonFactory.getPeople();
        });
        onRouteChangeOff = $scope.$on('$locationChangeStart', routeChange);
    };

    $scope.update = function(){
        $scope.$broadcast('showErrorsCheckValidity');

        if ($scope.personForm.$valid) {
            onRouteChangeOff();
            crCompanyFactory.updateCompany($scope.company).then(function(){
                crNotifier.notify($translate.instant('_company_has_been_updated_'));
                $location.path('/companies');
            }, function(reason){
                crNotifier.error(reason);
            });
        }
    };

    $scope.init();
});
