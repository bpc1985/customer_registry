angular.module('app').controller('crForgotPasswordCtrl', function($scope, $location, crNotifier, crAuth){
    $scope.forgotPass = function(){
      crAuth.forgotPassword($scope.email).then(function(){
        // Mail has been sent, no need to react anymore
      }, function(reason) {
        crNotifier.error(reason);
      });
      $location.path('/forgot_password_sent').replace();
      //$scope.$apply();
    };
});
