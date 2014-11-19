angular.module('app').directive('companyPopup', function() {
    return {
        restrict : 'A',
        scope : {
            popup: "=",
        },
        link : function(scope, element, attrs) {
            if(scope.popup){
                angular.element(element).modal('show');
            }
        }
    };
});
