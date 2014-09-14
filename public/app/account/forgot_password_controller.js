angular.module('app').controller('crForgotPasswordCtrl', function($scope, crAuth){
    $scope.forgotPass = function(){
        crAuth.forgotPassword($scope.email).then(function(){

        });
    };
});
