angular.module('app').factory('crIdentity', function($window, crUser){
    var currentUser;
    var userInfo = $window.localStorage["userInfo"];

    if (!_.isUndefined(userInfo) && !_.isEmpty(userInfo)) {
        currentUser = new crUser();
        angular.extend(currentUser, JSON.parse(userInfo));
    }

    return {
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});
