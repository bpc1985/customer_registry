angular.module('app').controller('crProfileCtrl', function($scope, crNotifier, crAuth, crIdentity){
    $scope.email = crIdentity.currentUser.email;
    $scope.fname = crIdentity.currentUser.firstName;
    $scope.lname = crIdentity.currentUser.lastName;

    $scope.update = function(){
        var newUserData = {
            email: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        if($scope.password && $scope.password.length > 0 && ($scope.password === $scope.confirm_password)) {
            newUserData.password = $scope.password;
        }

        crAuth.updateCurrentUser(newUserData).then(function() {
            crNotifier.notify('Your user account has been updated');
        }, function(reason) {
            crNotifier.error(reason);
        })
    };
});
