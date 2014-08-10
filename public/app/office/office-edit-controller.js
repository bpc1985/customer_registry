angular.module('app').controller('crOfficeEditCtrl',
            function($scope, $location, $routeParams, $translate, Restangular, crNotifier, crOfficeFactory, crCompanyFactory, crRootFactory){

    crRootFactory.setLanguageDir('office');

    $scope.init = function(){
        crOfficeFactory.getOffice($routeParams.id).then(function(office){
            $scope.office = Restangular.copy(office);
            $scope.services = $scope.office.services;
            $scope.office.contact_persons = _.pluck($scope.office.contact_persons, 'id');

            Restangular.all('people').getList().then(function(people){
                $scope.persons = people;
            });
        });
    };

    $scope.update = function(){
        $scope.office.company = $scope.office.company.id;
        console.log("$scope.office: ", $scope.office);

        crOfficeFactory.updateOffice($scope.office).then(function(){
            crNotifier.notify($translate.instant('Office has been updated'));
            $location.path('/offices');
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.init();
});
