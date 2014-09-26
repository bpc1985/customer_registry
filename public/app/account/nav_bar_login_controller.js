angular.module('app').controller('crNavBarLoginCtrl', function($scope, $rootScope, $translate, $location, $rootScope, crIdentity, crNotifier, crAuth, crRootFactory){
    crRootFactory.setLanguageDir('account');

    $rootScope.$on('signup', function(){
        $scope.init();
    });

    $scope.init = function(){
        if(crIdentity.isAuthenticated()){
            $scope.identity = crIdentity;
        }
    };

    $scope.signin = function(email, password){
        crAuth.authenticateUser(email, password).then(function(success){
            if(success) {
                $rootScope.$broadcast('loggedin');
                $scope.identity = crIdentity;
                crNotifier.notify($translate.instant('You have successfully signed in'));
            } else {
                crNotifier.error($translate.instant('Email/Password combination incorrect'));
            }
        });
    };

    $scope.signout = function(){
        crAuth.logoutUser().then(function(){
            $rootScope.$broadcast('loggedout');
            $scope.email = "";
            $scope.password = "";
            crIdentity.currentUser = undefined;
            crNotifier.notify($translate.instant("You have successfully signed out"));
            $location.path('/');
        });
    };

    $scope.init();
});
