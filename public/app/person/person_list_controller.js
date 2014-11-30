angular.module('app').controller('crPersonListCtrl',
    function($scope, $translate, $location, crNotifier, crIdentity, crPersonFactory, crRootFactory, crModalService){

    crRootFactory.setLanguageDir('person');

    $scope.list = function(){
        $scope.people = crPersonFactory.getPeople();
        $scope.identity = crIdentity;
    };

    $scope.delete = function(person){
        var modalOptions = {
            headerText: 'Poistaa ' + person.pname + '?',
            bodyText: 'Haluatko poistaa tiedot lopullisesti?'
        };

        crModalService.showModal({}, modalOptions).then(function (result) {
            if (result === 'ok') {
                _.remove($scope.people, {'id': person.id});
                crPersonFactory.deletePerson(person).then(function(){
                    crNotifier.notify($translate.instant('_person_has_been_deleted_'));
                }, function(reason){
                    crNotifier.error(reason);
                });
            }
        });
    };

    $scope.list();
});
