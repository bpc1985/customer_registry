angular.module('app').controller('crOfficeCreateCtrl', function($scope, $http, $location, crNotifier, crOfficeFactory, crPersonFactory, crCompanyFactory){
    $scope.init = function(){
        $scope.weekdays = [];

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
        $scope.office.open_times.weekdays = $scope.weekdays;
        $scope.office.services = $scope.office.services.split(",");

        console.log($scope.office);

        crOfficeFactory.createOffice($scope.office).then(function(){
            crNotifier.notify('New office has been created!');
            $location.path('/offices');
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.init();
});
