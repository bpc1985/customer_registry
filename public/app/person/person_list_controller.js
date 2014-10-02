angular.module('app').controller('crPersonListCtrl',
    function($scope, $translate, $location, crNotifier, crIdentity, crPersonFactory, crRootFactory){

    crRootFactory.setLanguageDir('person');

    $scope.list = function(){
        $scope.people = crPersonFactory.getPeople();
    };

    $scope.delete = function(person){
        _.remove($scope.people, {'id': person.id});

        crPersonFactory.deletePerson(person).then(function(){
            crNotifier.notify($translate.instant('_person_has_been_deleted_'));
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.list();
});
