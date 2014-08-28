angular.module('app').controller('crSignupCtrl', function($scope, $location, $rootScope, crNotifier, crIdentity, crAuth){
    $scope.signup = function(){
        var newUserData = {
            password: $scope.password,
            email: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        crAuth.createUser(newUserData).then(function(newUser){
            $rootScope.$broadcast('signup');
            crNotifier.notify('User account has been created');
            $location.path('/');
        }, function(reason){
            crNotifier.error(reason);
        });
    };
});
