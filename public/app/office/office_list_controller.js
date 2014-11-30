angular.module('app').controller('crOfficeListCtrl', function($scope, $http, $translate, crNotifier, crOfficeFactory, crRootFactory, crIdentity, crModalService){
    crRootFactory.setLanguageDir('office');

    $scope.list = function(){
        $scope.offices = crOfficeFactory.getOffices();
        $scope.identity = crIdentity;
    };

    $scope.delete = function(office){
        var modalOptions = {
            headerText: 'Poistaa ' + office.office_name + '?',
            bodyText: 'Haluatko poistaa tiedot lopullisesti?'
        };

        crModalService.showModal({}, modalOptions).then(function (result) {
            if (result === 'ok') {
                _.remove($scope.offices, {'id': office.id});
                crOfficeFactory.deleteOffice(office).then(function(){
                    crNotifier.notify($translate.instant('_office_has_been_deleted_'));
                }, function(reason){
                    crNotifier.error(reason);
                });
            }
        });
    };

    $scope.list();
});
