angular.module('app').controller('crPersonListCtrl', function($scope, $http, $location, crNotifier, crPersonFactory){
    $scope.list = function(){
        $scope.people = crPersonFactory.getPeople();
    };

    $scope.delete = function(person){
        _.remove($scope.people, {'id': person.id});

        crPersonFactory.deletePerson(person).then(function(){
            crNotifier.notify('Person has been deleted!');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.list();
});
