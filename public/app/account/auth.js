angular.module('app').factory('crAuth', function($window, $http, $q, crIdentity, crUser){
    return {
        authenticateUser: function(email, password){
            var deferred = $q.defer();
            $http.post('/login', {email: email, password: password}).then(function(response){
                if(response.data.success){
                    var user = new crUser();
                    angular.extend(user, response.data.user);
                    $window.localStorage["userInfo"] = JSON.stringify(user);
                    crIdentity.currentUser = user;
                    deferred.resolve(true);
                }
                else{
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        },

        createUser: function(newUserData){
            var newUser = new crUser(newUserData);
            var deferred = $q.defer();

            newUser.$save().then(function(){
                crIdentity.currentUser = newUser;
                $window.localStorage["userInfo"] = JSON.stringify(newUser);
                deferred.resolve(newUser);
            }, function(response){
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        },

        updateCurrentUser: function(newUserData){
            var dfd = $q.defer();
            var clone = angular.copy(crIdentity.currentUser);

            angular.extend(clone, newUserData);

            clone.$update().then(function() {
                crIdentity.currentUser = clone;
                $window.localStorage["userInfo"] = JSON.stringify(clone);
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        logoutUser: function(){
            var deferred = $q.defer();
            $http.post("/logout", {logout: true}).then(function(){
                crIdentity.currentUser = undefined;
                $window.localStorage["userInfo"] = '';
                deferred.resolve();
            });
            return deferred.promise;
        },

        forgotPassword: function(email){
            var deferred = $q.defer();
            $http.post('/api/forgot_pwd', {email: email}).success(function(response){
                if(response.data.success){
                    deferred.resolve(true);
                } 
                else{
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        },

        resetPassword: function(token){
            var deferred = $q.defer();
            $http.get('/api/reset_pwd/' + token).then(function(response){
                if(response.data.success){
                    deferred.resolve(true);
                }
                else{
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        },

        authorizeCurrentUserForRoute: function(role) {
            if(crIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticatedUserForRoute: function(){
            if(crIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }

    }
});
