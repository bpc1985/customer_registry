angular.module('app').controller('crOfficeEditCtrl',
        function($scope, $location, $routeParams, $translate, Restangular, crNotifier, crIdentity, crOfficeFactory, crCompanyFactory, crRootFactory, crPersonFactory){

    crRootFactory.setLanguageDir('office');

    $scope.init = function(){
        crOfficeFactory.getOffice($routeParams.id).then(function(office){
            $scope.office = Restangular.copy(office);
            $scope.office.contact_persons = _.pluck($scope.office.contact_persons, 'id');
            $scope.persons = crPersonFactory.getPeople();
        });

        if(crIdentity.currentUser.company){
            crCompanyFactory.getCompany(crIdentity.currentUser.company).then(function(company){
                $scope.company = company;
            });
        }
    };

    $scope.checkHeadOffice = function(){
        if($scope.company.id){
            if($scope.office.is_headoffice){
                $scope.office.contact_info = {
                    street_address: $scope.company.street,
                    city: $scope.company.city,
                    zipcode: $scope.company.zip
                };
            }
            else{
                $scope.office.contact_info = {
                    street_address: '',
                    city: '',
                    zipcode: ''
                };
            }
        }
    }

    $scope.update = function(){
        $scope.office.company = $scope.office.company.id;

        crOfficeFactory.updateOffice($scope.office).then(function(){
            crNotifier.notify($translate.instant('Office has been updated'));
            $location.path('/offices');
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.init();
});
