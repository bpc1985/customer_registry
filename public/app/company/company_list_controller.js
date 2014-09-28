angular.module('app').controller('crCompanyListCtrl',
    function($scope, $http, $location, $translate, Restangular, crNotifier, crCompanyFactory, crPersonFactory, crRootFactory, crIdentity, crAuth){

    crRootFactory.setLanguageDir('company');

    $scope.list = function(){
        $scope.user = crIdentity.currentUser;
        if(_.isEmpty($scope.user.roles)){
            if($scope.user.company){
                crCompanyFactory.getCompany($scope.user.company).then(function(company){
                    if(company.contact){
                        crPersonFactory.getPerson(company.contact).then(function(person){
                            company.contact = person.pname + " (" + person.email + ")";
                            $scope.companies = [Restangular.copy(company)];
                        });
                    }
                    else {
                        $scope.companies = [Restangular.copy(company)];
                    }
                });
            }
        } else {
            crCompanyFactory.getCompanies().then(function(companies){
                $scope.companies = companies;
            });
        }
    };

    $scope.delete = function(company){
        _.remove($scope.companies, {'id': company.id});
        crCompanyFactory.deleteCompany(company).then(function(){
            var newUserData = {
                email: crIdentity.currentUser.email,
                firstName: crIdentity.currentUser.firstName,
                lastName: crIdentity.currentUser.lastName,
                company: null
            };
            crAuth.updateCurrentUser(newUserData).then(function() {
                crNotifier.notify($translate.instant('Company has been deleted'));
            });
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.list();
});
