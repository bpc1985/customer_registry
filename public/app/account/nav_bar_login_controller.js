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
                crNotifier.notify($translate.instant('_you_have_successfully_signed_in_'));
            } else {
                crNotifier.error($translate.instant('_email_password_combination_incorrect_'));
            }
        });
    };

    $scope.signout = function(){
        crAuth.logoutUser().then(function(){
            $rootScope.$broadcast('loggedout');
            $scope.email = "";
            $scope.password = "";
            crIdentity.currentUser = undefined;
            crNotifier.notify($translate.instant("_you_have_successfully_signed_out_"));
            $location.path('/');
        });
    };

    $scope.init();
});
