app.factory('crRootFactory', function($translate, $translatePartialLoader, $translateLocalStorage){

    var rootFactory = {
        setLanguageDir: function(language_folder){
            $translatePartialLoader.addPart(language_folder);
            $translate.refresh();
            $translate.use($translateLocalStorage.get($translate.storageKey()));
        },
    }

    return rootFactory;
});
