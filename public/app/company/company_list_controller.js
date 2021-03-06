angular.module('app').controller('crCompanyListCtrl',
    function($scope, $http, $location, $translate, Restangular, crNotifier, crCompanyFactory, crPersonFactory, crRootFactory, crIdentity, crAuth, crModalService){

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
        var modalOptions = {
            headerText: 'Poistaa ' + company.company_name + '?',
            bodyText: 'Haluatko poistaa tiedot lopullisesti?'
        };

        crModalService.showModal({}, modalOptions).then(function (result) {
            if (result === 'ok') {
                _.remove($scope.companies, {'id': company.id});
                crCompanyFactory.deleteCompany(company).then(function(){
                    var newUserData = {
                        email: crIdentity.currentUser.email,
                        firstName: crIdentity.currentUser.firstName,
                        lastName: crIdentity.currentUser.lastName,
                        company: null
                    };
                    crAuth.updateCurrentUser(newUserData).then(function() {
                        crNotifier.notify($translate.instant('_company_has_been_deleted_'));
                    });
                }, function(reason){
                    crNotifier.error(reason);
                });
            }
        });
    };

    $scope.list();
});
