angular.module('app').controller('crOfficeCreateCtrl',
    function($scope, $translate, $location, crNotifier, crOfficeFactory, crPersonFactory, crCompanyFactory, crRootFactory){
    crRootFactory.setLanguageDir('office');

    $scope.init = function(){
        $scope.weekdays = [];
        $scope.office = { delivery_areas: [] };

        for (var i = 0; i < 7; i++) {
            $scope.weekdays[i] = {
                from: '',
                to: '',
                is_closed: false
            };
        }

        crCompanyFactory.getCompanies().then(function(companies){
            $scope.companies = companies;
            $scope.persons = crPersonFactory.getPeople();
        });
    };

    $scope.create = function(){
        $scope.office.open_times = {
            'weekdays': $scope.weekdays,
            'holiday': $scope.holiday
        };
        $scope.office.services = $scope.office.services.split(",");

        crOfficeFactory.createOffice($scope.office).then(function(){
            crNotifier.notify($translate.instant('New office has been created'));
            $location.path('/offices');
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.removeZipCode = function(value){
        $scope.office.delivery_areas = _.without($scope.office.delivery_areas, value);
    };

    $scope.init();
});
