angular.module('app').directive('contactList', function() {
    return {
        restrict : 'E',
        templateUrl: "/app/office/contact_list.html",
        scope : {
            persons: "=",
            contactPersons: "=",
            isEditOffice: "="
        },
        controller : function($scope, $element) {
            var firstTime = true;

            $scope.toggleSelectedPersons = function(personId){
                if(firstTime && !$scope.isEditOffice && ($scope.contactPersons[0] === personId)){
                    firstTime = false;
                    $scope.contactPersons.splice(0, 1);
                }
                else {
                    var idx = $scope.contactPersons.indexOf(personId);
                    if (idx > -1) {
                        $scope.contactPersons.splice(idx, 1);
                    } else {
                        $scope.contactPersons.push(personId);
                    }
                }
            };

            $scope.checkedPersons = function(personId){
                if($scope.contactPersons){
                    return $scope.contactPersons.indexOf(personId) > -1 ? true : false;
                }
                return false;
            };
        },
        link : function(scope, element, attrs) {
        }
    };
});