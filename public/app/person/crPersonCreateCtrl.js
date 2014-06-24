angular.module('app').controller('crPersonCreateCtrl', function($scope, $http, $location, crNotifier, crPersonFactory, crCompanyFactory){
    $scope.init = function(){
        crCompanyFactory.getCompanies().then(function(companies){
            $scope.companies = companies;
        });
    };

    $scope.create = function(){
        var newPersonData = {
            pname: $scope.person.pname,
            title: $scope.person.title,
            telephone: $scope.person.telephone,
            mobile: $scope.person.mobile,
            street: $scope.person.street,
            zipcode: $scope.person.zipcode,
            city: $scope.person.city,
            country: $scope.person.country,
            email: $scope.person.email,
            company: $scope.person.company
        };

        crPersonFactory.createPerson(newPersonData).then(function(){
            crNotifier.notify('New person has been created!');
            $location.path('/persons');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.init();
});
