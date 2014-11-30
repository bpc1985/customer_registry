angular.module('app').controller('crResetPasswordCtrl', function($scope, $translate, crAuth){
    $scope.init = function(){

        crAuth.resetPassword($scope.token).then(function(){
        });

    };

    $scope.init();
});
