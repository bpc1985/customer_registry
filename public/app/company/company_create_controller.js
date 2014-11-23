angular.module('app').controller('crCompanyCreateCtrl',
        function($scope, $translate, $location, crNotifier, crCompanyFactory, crPersonFactory, crRootFactory, crIdentity, crAuth){

    crRootFactory.setLanguageDir('company');

    $scope.init = function(){
        $scope.persons = crPersonFactory.getPeople();
    };

    $scope.create = function(fromModal){
        var newCompanyData = {
            company_name: $scope.company.company_name,
            company_type: $scope.company.company_type,
            company_code: $scope.company.company_code,
            street: $scope.company.street,
            city: $scope.company.city,
            zip: $scope.company.zip,
            phone: $scope.company.phone,
            alt_phone: $scope.company.alt_phone,
            fax: $scope.company.fax,
            web_url: $scope.company.web_url,
            email: $scope.company.email,
            contact: $scope.company.contact,
            user: crIdentity.currentUser.id,
            userEmail: crIdentity.currentUser.email
        };

        crCompanyFactory.createCompany(newCompanyData).then(function(newCompany){
            var newUserData = {
                email: crIdentity.currentUser.email,
                firstName: crIdentity.currentUser.firstName,
                lastName: crIdentity.currentUser.lastName,
                company: newCompany.id
            };
            crAuth.updateCurrentUser(newUserData).then(function() {
                crNotifier.notify($translate.instant('_new_company_has_been_created_'));
                if(!fromModal){
                    $location.path('/companies');
                } else{
                    $scope.$parent.company = newCompany;
                }
            });
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.init();
});
