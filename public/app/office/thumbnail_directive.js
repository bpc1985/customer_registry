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
            scope.images = [
                '/images/profiles/profilpicture_1.png',
                '/images/profiles/profilpicture_2.png',
                '/images/profiles/profilpicture_3.png',
                '/images/profiles/profilpicture_4.png',
                '/images/profiles/profilpicture_5.png',
                '/images/profiles/profilpicture_6.png',
                '/images/profiles/profilpicture_7.png',
                '/images/profiles/profilpicture_8.png',
                '/images/profiles/profilpicture_9.png',
                '/images/profiles/profilpicture_10.png'
            ];
            if(!scope.selectedImage){
                scope.selectedImage = scope.images[0];
            }
            $timeout(function () {
                $("#selectImage").imagepicker();
            }, 0);
        }
    };
});