angular.module('app').directive('timepickerList', function() {
    return {
        restrict : 'E',
        templateUrl: "/app/office/timepickerlist.html",
        scope : {
            weekdays: "=",
            holiday: "="
        },
        controller : function($scope, $element) {

        },
        link : function(scope, element, attrs) {
            if(scope.weekdays && scope.weekdays.length === 0){
                var days = ['_monday_', '_tuesday_', '_wednesday_', '_thursday_', '_friday_', '_saturday_', '_sunday_'];
                for (var i = 0; i < 7; i++) {
                    scope.weekdays[i] = {
                        day_of_week: days[i],
                        from: '8:00',
                        to: '17:00',
                        is_closed: false
                    };
                }
            }
        }
    };
});