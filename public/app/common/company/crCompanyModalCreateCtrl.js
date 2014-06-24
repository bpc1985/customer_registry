angular.module('app').controller('crCompanyModalCreateCtrl',
            function($scope, $http, $location, crNotifier, crCompanyFactory, crPersonFactory){

    $scope.createNewCompany = function(){
        var newCompanyData = {
            company_name: $scope.company.name,
            company_type: $scope.company.type,
            company_code: $scope.company.code,
            phone: $scope.company.phone,
            alt_phone: $scope.company.altphone,
            fax: $scope.company.fax,
            web_url: $scope.company.web,
            email: $scope.company.email,
            contact1: $scope.company.contact1,
            contact2: $scope.company.contact2,
            contact3: $scope.company.contact3,
            newsletter: $scope.company.newsletter,
            cnumber: $scope.company.cnumber,
            curl: $scope.company.curl,
            responsible1: $scope.company.responsible1,
            responsible2: $scope.company.responsible2
        };

        console.log("Company Data: ", newCompanyData);

        crCompanyFactory.createCompany(newCompanyData).then(function(newcompany){
            crNotifier.notify('New company has been created!');
            $scope.companies.push(newcompany);
        }, function(reason){
            crNotifier.error(reason);
        });
    };
});
