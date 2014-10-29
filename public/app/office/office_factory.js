angular.module('app').factory('crOfficeFactory', function($http, $cookies, $q, Restangular, crIdentity){

    var csrftoken = {"X-CSRFToken": $cookies.csrftoken};

    var officeFactory = {
        getOffices: function(){
            var user = crIdentity.currentUser;
            if(user.roles && _.first(user.roles) === 'admin'){
                return Restangular.all('offices').getList().$object;
            }
            if(!_.isNull(user.company)){
                return Restangular.all('offices').getList({company: user.company}).$object;
            }
            return [];
        },

        getOffice: function(officeId){
            return Restangular.one('offices', officeId).get();
        },

        createOffice: function(officeData){
            return Restangular.all('offices').post(officeData, null, csrftoken);
        },

        updateOffice: function(office){
            return office.put(null, csrftoken);
        },

        deleteOffice: function(office){
            return office.remove(null, csrftoken);
        }
    }

    return officeFactory;
});
