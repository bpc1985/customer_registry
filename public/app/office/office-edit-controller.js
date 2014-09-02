angular.module('app').controller('crOfficeEditCtrl',
            function($scope, $location, $routeParams, $translate, Restangular, crNotifier, crOfficeFactory, crCompanyFactory, crRootFactory, crPersonFactory){

    crRootFactory.setLanguageDir('office');

    $scope.init = function(){
        crOfficeFactory.getOffice($routeParams.id).then(function(office){
            $scope.office = Restangular.copy(office);
            $scope.office.contact_persons = _.pluck($scope.office.contact_persons, 'id');
            $scope.persons = crPersonFactory.getPeople();
        });
    };

    $scope.checkedPersons = function(personId){
        return $scope.office.contact_persons.indexOf(personId) > -1 ? true : false;
    };

    $scope.toggleSelectedPersons = function(personId){
        var idx = $scope.office.contact_persons.indexOf(personId);
        if (idx > -1) {
            $scope.office.contact_persons.splice(idx, 1);
        } else {
            $scope.office.contact_persons.push(personId);
        }
    };

    $scope.update = function(){
        $scope.office.company = $scope.office.company.id;

        crOfficeFactory.updateOffice($scope.office).then(function(){
            crNotifier.notify($translate.instant('Office has been updated'));
            $location.path('/offices');
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.removeZipCode = function(value){
        $scope.office.delivery_areas = _.without($scope.office.delivery_areas, value);
    };

    $scope.removeService = function(value){
        $scope.office.services = _.without($scope.office.services, value);
    };

    $scope.init();
});
