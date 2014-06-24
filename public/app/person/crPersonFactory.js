angular.module('app').factory('crPersonFactory', function($http, $cookies, $q, Restangular){

    var csrftoken = {"X-CSRFToken": $cookies.csrftoken};

    var personFactory = {
        getPeople: function(){
            return Restangular.all('people').getList().$object;
        },

        getPerson: function(personId){
            return Restangular.one('people', personId).get();
        },

        createPerson: function(personData){
            return Restangular.all('people').post(personData, null, csrftoken);
        },

        updatePerson: function(person){
            return person.put(null, csrftoken);
        },

        deletePerson: function(person){
            return person.remove(null, csrftoken);
        }
    }

    return personFactory;
});
