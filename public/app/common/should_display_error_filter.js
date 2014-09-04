angular.module('app').filter('shouldDisplayError', function(){
    return function(formField, form){
        if(form.attempted){
            form.attempted = false;
        }
        return formField.$invalid && (formField.$dirty || form.attempted);
    };
});