angular.module('app').factory('crCompanyFactory', function($http, $cookies, $q, Restangular, crPersonFactory){

    var csrftoken = {"X-CSRFToken": $cookies.csrftoken};

    var companyFactory = {
        getCompanies: function(){
            var deferred = $q.defer();

            Restangular.all('companies').getList().then(function(companies){
                _.forEach(companies, function(company){
                    if(!_.isNull(company.contact)){
                        crPersonFactory.getPerson(company.contact).then(function(person){
                            if(person){
                                company.contact = person.pname + " (" + person.email + ")";
                            }
                        });
                    }
                });
                deferred.resolve(companies);
            });

            return deferred.promise;
        },

        getCompany: function(companyId){
            return Restangular.one('companies', companyId).get();
        },

        createCompany: function(companyData){
            return Restangular.all('companies').post(companyData, null, csrftoken);
        },

        updateCompany: function(company){
            return company.put(null, csrftoken);
        },

        deleteCompany: function(company){
            return company.remove(null, csrftoken);
        }
    }

    return companyFactory;
});
