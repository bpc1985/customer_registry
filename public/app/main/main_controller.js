angular.module('app').controller('crMainCtrl', function($scope, crRootFactory){
    crRootFactory.setLanguageDir('main');

    $scope.myVar = "Hello World";
});
