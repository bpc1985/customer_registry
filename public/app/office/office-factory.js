angular.module('app').factory('crOfficeFactory', function($http, $cookies, $q, Restangular){

    var csrftoken = {"X-CSRFToken": $cookies.csrftoken};

    var officeFactory = {
        getOffices: function(){
            return Restangular.all('offices').getList().$object;
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
