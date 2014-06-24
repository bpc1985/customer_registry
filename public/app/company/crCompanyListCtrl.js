angular.module('app').controller('crCompanyListCtrl', function($scope, $http, $location, crNotifier, crCompanyFactory){
    $scope.list = function(){
        crCompanyFactory.getCompanies().then(function(companies){
            $scope.companies = companies;
        });
    };

    $scope.delete = function(company){
        _.remove($scope.companies, {'id': company.id});
        crCompanyFactory.deleteCompany(company).then(function(){
            crNotifier.notify('Company has been deleted!');
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.list();
});
