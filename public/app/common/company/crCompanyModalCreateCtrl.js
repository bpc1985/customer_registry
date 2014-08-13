angular.module('app').controller('crCompanyModalCreateCtrl',
            function($scope, $http, $location, crNotifier, crCompanyFactory, crPersonFactory){

    $scope.createNewCompany = function(){
        var newCompanyData = {
            company_name: $scope.company.name,
            company_type: $scope.company.type,
            company_code: $scope.company.code,
            street: $scope.company.street,
            city: $scope.company.city,
            zip: $scope.company.zip,
            phone: $scope.company.phone,
            alt_phone: $scope.company.altphone,
            fax: $scope.company.fax,
            web_url: $scope.company.web,
            email: $scope.company.email
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
