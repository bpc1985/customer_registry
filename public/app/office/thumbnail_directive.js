angular.module('app').directive('thumbnail', function() {
    return {
        restrict : 'E',
        templateUrl: "/app/office/thumbnail.html",
        controller : function($scope, $element) {

        },
        link : function(scope, element, attrs) {
            $("#selectImage").imagepicker();
        }
    };
});