angular.module('app').controller('crPersonEditCtrl',
    function($scope, $translate, $location, $routeParams, Restangular, crNotifier, crPersonFactory, crCompanyFactory, crRootFactory, crIdentity, crModalService){

    crRootFactory.setLanguageDir('person');

    var onRouteChangeOff;

    function routeChange(event, newUrl) {
        crModalService.displayModal(event, newUrl, $scope.personForm, onRouteChangeOff);
    }

    $scope.init = function(){
        crPersonFactory.getPerson($routeParams.id).then(function(person){
            $scope.person = Restangular.copy(person);
            crCompanyFactory.getCompany(crIdentity.currentUser.company).then(function(company){
                $scope.company = Restangular.copy(company);
            });
        });

        onRouteChangeOff = $scope.$on('$locationChangeStart', routeChange);
    };

    $scope.update = function(){
        onRouteChangeOff();
        $scope.person.company = $scope.company.id;
        crPersonFactory.updatePerson($scope.person).then(function(){
            crNotifier.notify($translate.instant('_person_has_been_updated_'));
            $location.path('/persons');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.init();
});
