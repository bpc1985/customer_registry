angular.module('app').controller('crNavBarLoginCtrl', function($scope, $translate, $location, crIdentity, crNotifier, crAuth, crRootFactory){
    crRootFactory.setLanguageDir('account');
    $scope.identity = crIdentity;

    $scope.signin = function(email, password){
        crAuth.authenticateUser(email, password).then(function(success){
            if(success) {
                crNotifier.notify($translate.instant('You have successfully signed in'));
            } else {
                crNotifier.error($translate.instant('Email/Password combination incorrect'));
            }
        });
    };

    $scope.signout = function(){
        crAuth.logoutUser().then(function(){
            $scope.email = "";
            $scope.password = "";
            crNotifier.notify($translate.instant("You have successfully signed out"));
            $location.path('/');
        });
    };
});
