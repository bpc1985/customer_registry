angular.module('app').controller('crOfficeListCtrl', function($scope, $http, $location, crNotifier, crOfficeFactory){
    $scope.list = function(){
        $scope.offices = crOfficeFactory.getOffices();
    };

    $scope.delete = function(office){
        _.remove($scope.offices, {'id': office.id});
        crOfficeFactory.deleteOffice(office).then(function(){
            crNotifier.notify('Office has been deleted!');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.list();
});
