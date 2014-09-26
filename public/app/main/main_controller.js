angular.module('app').controller('crMainCtrl', function($scope, $rootScope, crIdentity, crRootFactory){
    crRootFactory.setLanguageDir('main');

    $rootScope.$on('loggedin', function(){
        $scope.currentUser = crIdentity.currentUser;
    });

    $rootScope.$on('loggedout', function(){
        $scope.currentUser = undefined;
    });

    $scope.currentUser = crIdentity.currentUser;
});
