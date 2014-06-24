angular.module('app').controller('crPersonModalCreateCtrl',
            function($scope, $http, $location, crNotifier, crPersonFactory){

    $scope.createNewPerson = function(){
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

        console.log("Person Data: ", newPersonData);

        crPersonFactory.createPerson(newPersonData).then(function(newPerson){
            crNotifier.notify('New person has been created!');
            $scope.persons.push(newPerson);
        }, function(reason){
            crNotifier.error(reason);
        });;
    };
});
