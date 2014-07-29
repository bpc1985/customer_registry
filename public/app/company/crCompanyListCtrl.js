angular.module('app').controller('crCompanyListCtrl', function($scope, $http, $location, crNotifier, crCompanyFactory, crRootFactory){
    crRootFactory.setLanguageDir('company');

    $scope.list = function(){
        crCompanyFactory.getCompanies().then(function(companies){
            $scope.companies = companies;
        });
    };

    $scope.delete = function(company){
        _.remove($scope.companies, {'id': company.id});
        crCompanyFactory.deleteCompany(company).then(function(){
            crNotifier.notify($translate.instant('Company has been deleted'));
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.list();
});
