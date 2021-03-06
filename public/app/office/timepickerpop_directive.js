angular.module('app').factory('timepickerState', function() {
    var pickers = [];
    return {
        addPicker: function(picker) {
            pickers.push(picker);
        },
        closeAll: function() {
            for (var i=0; i<pickers.length; i++) {
                pickers[i].close();
            }
        },
        setDefaultTime: function(inputTime){
            if(inputTime === "8:00"){
                inputTime = new Date();
                inputTime.setHours(8, 0);
            }
            else if(inputTime === "17:00"){
                inputTime = new Date();
                inputTime.setHours(17, 0);
            }
            return inputTime;
        }
    };
});

angular.module('app').directive("timeFormat", function($filter) {
    return {
        restrict : 'A',
        require : 'ngModel',
        scope : {
            showMeridian : '=',
        },
        link : function(scope, element, attrs, ngModel) {
            var parseTime = function(viewValue) {
                viewValue = new Date(viewValue);
                if (!viewValue) {
                    ngModel.$setValidity('time', true);
                    return null;
                }
                else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
                    ngModel.$setValidity('time', true);
                    return viewValue;
                }
                else if (angular.isString(viewValue)) {
                    var timeRegex = /^(0?[0-9]|1[0-2]):[0-5][0-9] ?[a|p]m$/i;
                    if (!scope.showMeridian) {
                        timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                    }
                    if (!timeRegex.test(viewValue)) {
                        ngModel.$setValidity('time', false);
                        return undefined;
                    }
                    else {
                        ngModel.$setValidity('time', true);
                        var date = new Date();
                        var sp = viewValue.split(":");
                        var apm = sp[1].match(/[a|p]m/i);
                        if (apm) {
                            sp[1] = sp[1].replace(/[a|p]m/i, '');
                            if (apm[0].toLowerCase() == 'pm') {
                                sp[0] = sp[0] + 12;
                            }
                        }
                        date.setHours(sp[0], sp[1]);
                        return date;
                    };
                } else {
                    ngModel.$setValidity('time', false);
                    return undefined;
                };
            };
            ngModel.$parsers.push(parseTime);

            var showTime = function(data) {
                parseTime(data);
                var timeFormat = (!scope.showMeridian) ? "HH:mm" : "hh:mm a";
                return $filter('date')(data, timeFormat);
            };

            ngModel.$formatters.push(showTime);
            scope.$watch('showMeridian', function(value) {
                var myTime = ngModel.$modelValue;
                if (myTime) { element.val(showTime(myTime)); }
            });
        }
    };
})

angular.module('app').directive('timepickerPop', function($document, timepickerState) {
    return {
        restrict : 'E',
        transclude : false,
        scope : {
            inputTime : "=",
            showMeridian : "=",
            disabled : "=",
            description : "@"
        },
        controller : function($scope, $element) {
            $scope.isOpen = false;

            $scope.disabledInt = angular.isUndefined($scope.disabled)? false : $scope.disabled;

            $scope.toggle = function() {
                if ($scope.isOpen) {
                    $scope.close();
                } else {
                    $scope.open();
                }
            };
        },
        link : function(scope, element, attrs) {
            var picker = {
                open : function () {
                    timepickerState.closeAll();
                    scope.isOpen = true;
                },
                close: function () {
                    scope.isOpen = false;
                }
            }
            timepickerState.addPicker(picker);

            scope.inputTime = timepickerState.setDefaultTime(scope.inputTime);
            scope.open = picker.open;
            scope.close = picker.close;

            scope.$watch("disabled", function(value) {
                scope.disabledInt = angular.isUndefined(scope.disabled)? false : scope.disabled;
            });

            element.bind('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            $document.bind('click', function(event) {
                scope.$apply(function() {
                    scope.isOpen = false;
                });
            });
        },
        template : "<input type='text' placeholder='{{description}}' class='form-control' ng-model='inputTime' time-format show-meridian='showMeridian' ng-focus='open()' />"
          + "  <div class='input-group-btn' ng-class='{open:isOpen}'> "
          + "    <button type='button' ng-disabled='disabledInt' class='btn btn-default' ng-class=\"{'btn-primary':isOpen}\" data-toggle='dropdown' ng-click='toggle()'> "
          + "        <i class='glyphicon glyphicon-time'></i></button> "
          + "          <div class='dropdown-menu pull-right choose_time'> "
          + "            <timepicker ng-model='inputTime' show-meridian='showMeridian'></timepicker> "
          + "           </div> "
          + "  </div>"
    };
});
