angular.module('app').controller('crOfficeCreateCtrl', function($scope, $http, $location, crNotifier, crOfficeFactory, crPersonFactory, crCompanyFactory){
    $scope.init = function(){
        crCompanyFactory.getCompanies().then(function(companies){
            $scope.companies = companies;
            $scope.persons = crPersonFactory.getPeople();
        });
    };

    $scope.create = function(){
        var newOfficeData = {
            office_name: $scope.office.office_name,
            company: $scope.office.company,
            is_headoffice: $scope.office.is_headoffice,
            responsible1: $scope.office.responsible1,
            responsible2: $scope.office.responsible2,
            open_times: $scope.office.open_times,
            visitable_location: $scope.office.visitable_location,
            street_address: $scope.office.street_address,
            zipcode: $scope.office.zipcode,
            city: $scope.office.city,
            lat: $scope.office.lat,
            lng: $scope.office.lng,
            b2bcustomerid: $scope.office.b2bcustomerid,
            locationchecked: $scope.office.locationchecked
        };

        crOfficeFactory.createOffice(newOfficeData).then(function(){
            crNotifier.notify('New office has been created!');
            $location.path('/offices');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.init();
});
