angular.module('app').controller('RootCtrl', function($translate, $scope, $cookies, $translateLocalStorage, $translatePartialLoader, crNotifier){
    $translatePartialLoader.addPart('root');

    if($translateLocalStorage.get($translate.storageKey())){
        $scope.language = $translateLocalStorage.get($translate.storageKey());
    }

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        moment.lang(langKey);
        crNotifier.notify($translate.instant("Language has been changed"));
    };
});
