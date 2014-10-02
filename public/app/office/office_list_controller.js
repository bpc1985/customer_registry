angular.module('app').controller('crOfficeListCtrl', function($scope, $http, $translate, crNotifier, crOfficeFactory, crRootFactory){
    crRootFactory.setLanguageDir('office');

    $scope.list = function(){
        $scope.offices = crOfficeFactory.getOffices();
    };

    $scope.delete = function(office){
        _.remove($scope.offices, {'id': office.id});
        crOfficeFactory.deleteOffice(office).then(function(){
            crNotifier.notify($translate.instant('_office_has_been_deleted_'));
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.list();
});
