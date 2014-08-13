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
            street: $scope.company.street,
            city: $scope.company.city,
            zip: $scope.company.zip,
            phone: $scope.company.phone,
            alt_phone: $scope.company.altphone,
            fax: $scope.company.fax,
            web_url: $scope.company.web,
            email: $scope.company.email,
            contact: $scope.company.contact,
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
