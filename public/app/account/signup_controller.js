angular.module('app').controller('crSignupCtrl', function($scope, $location, $rootScope, $translate, crNotifier, crIdentity, crAuth, crPersonFactory){
    $scope.signup = function(){
        var newUserData = {
            password: $scope.password,
            email: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        crAuth.createUser(newUserData).then(function(newUser){
            $rootScope.$broadcast('signup');

            var newPersonData = {
                pname: $scope.fname + " " + $scope.lname,
                email: $scope.email,
                user: newUser.id
            };

            crPersonFactory.createPerson(newPersonData).then(function(newPerson){
                crNotifier.notify($translate.instant('_user_account_has_been_created_'));
                $location.path('/');
            });
        }, function(reason){
            crNotifier.error(reason);
        });
    };
});
