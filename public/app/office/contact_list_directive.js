angular.module('app').directive('contactList', function() {
    return {
        restrict : 'E',
        templateUrl: "/app/office/contact_list.html",
        scope : {
            persons: "=",
            contactPersons: "="
        },
        controller : function($scope, $element) {
            $scope.toggleSelectedPersons = function(personId){
                var idx = $scope.contactPersons.indexOf(personId);
                if (idx > -1) {
                    $scope.contactPersons.splice(idx, 1);
                } else {
                    $scope.contactPersons.push(personId);
                }
            };

            $scope.checkedPersons = function(personId){
                return $scope.contactPersons.indexOf(personId) > -1 ? true : false;
            };
        },
        link : function(scope, element, attrs) {

        }
    };
});