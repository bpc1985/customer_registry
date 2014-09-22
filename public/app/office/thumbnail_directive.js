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
                'https://cdn0.iconfinder.com/data/icons/flowers-and-leaves/48/flower_14-128.png',
                'http://png-3.findicons.com/files/icons/1243/hello_kitty/128/flowers.png',
                'http://png-4.findicons.com/files/icons/474/nature/128/blue_flower.png',
                'https://cdn4.iconfinder.com/data/icons/sibcode-line-simple/512/flower-128.png',
                'https://cdn1.iconfinder.com/data/icons/nature-camping/32/flower-128.png',
                'https://cdn0.iconfinder.com/data/icons/flowers-and-leaves/55/flower_19-128.png',
                'http://www.marshallscott.com/wp-content/uploads/2011/09/1315507348_kuickshow.png',
                'https://cdn1.iconfinder.com/data/icons/green-shopper/128/horticulture.png',
                'http://icons.iconseeker.com/png/fullsize/somatic-xtras2/flower-4.png',
                'http://static.iconsplace.com/icons/preview/orange/flower-128.png'
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