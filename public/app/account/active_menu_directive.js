angular.module('app').directive('activeMenu', function($location) {
    var makeWatcher = function(location) {
        return function() {
            return location.url();
        };
    };

    var addStyleToLink = function(link, val, className){
        if (link.attr("href") === val) {
            link.addClass(className);
        } else {
            link.removeClass(className);
        }
    };
 
    var makeLinkUpdater = function(links, className) {
        return function (value) {
            var val = /(\/[^\/]+)/.exec(value);
            angular.forEach(links, function(link) {
                link = angular.element(link);
                if(_.isNull(val)){
                    addStyleToLink(link, value, className);
                } else {
                    addStyleToLink(link, val[1], className);
                }
            });
        };
    };

    var link = function(scope, element, attrs) {
        var links = element.find("a");
        var className = attrs.activeMenu;
        scope.$watch(makeWatcher($location), makeLinkUpdater(links, className));
    };

    return {
        link:link
    };
});