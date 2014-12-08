angular.module('app').controller('crResetPasswordCtrl', function($scope, $translate,$location,crNotifier, crAuth){
    $scope.reset = function(){
      crAuth.resetPassword($scope.token).then(function(){
            // Password reset, not need to do anything else
      }, function(reason) {
        crNotifier.error(reason);
      });
      crNotifier.notify($translate.instant('_your_password_has_been_reset_'));
      $location.path('/').replace();
      //$scope.$apply();
    };
});
