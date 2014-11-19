angular.module('app').directive('thumbnail', function($timeout) {
    return {
        restrict : 'E',
        templateUrl: "/app/office/thumbnail.html",
        scope: {
            selectedImage: '='
        },
        controller : function($scope, $element) {

        },
        link : function(scope, element, attrs) {
            scope.images = [];

            for(var i = 1; i <= 85; i++ ){
                scope.images.push('/images/profiles/profilpicture_' + i + '.png');
            }

            if(!scope.selectedImage){
                scope.selectedImage = scope.images[0];
            }
            $timeout(function () {
                $("#selectImage").imagepicker();
            }, 0);
        }
    };
});