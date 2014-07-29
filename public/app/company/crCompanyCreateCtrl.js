angular.module('app').controller('crCompanyCreateCtrl',
            function($scope, $translate, $location, crNotifier, crCompanyFactory, crPersonFactory, crRootFactory){

    crRootFactory.setLanguageDir('company');
    //$scope.showModal = crAddPersonModalService.showModal();

    $scope.init = function(){
        $scope.persons = crPersonFactory.getPeople();
    };

    $scope.create = function(){
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

        crCompanyFactory.createCompany(newCompanyData).then(function(){
            crNotifier.notify($translate.instant('New company has been created'));
            $location.path('/companies');
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.init();
});
