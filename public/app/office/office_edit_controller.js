angular.module('app').controller('crOfficeEditCtrl',
        function($scope, $location, $routeParams, $translate, Restangular, crNotifier, crIdentity, crOfficeFactory, crCompanyFactory, crRootFactory, crPersonFactory, crModalService){

    crRootFactory.setLanguageDir('office');
    var onRouteChangeOff;

    function routeChange(event, newUrl) {
        crModalService.displayModal(event, newUrl, $scope.officeForm, onRouteChangeOff);
    }

    $scope.init = function(){
        crOfficeFactory.getOffice($routeParams.id).then(function(office){
            $scope.edit = true;
            $scope.office = Restangular.copy(office);
            $scope.office.contact_persons = _.pluck($scope.office.contact_persons, 'id');
            $scope.persons = crPersonFactory.getPeople();
            if(crIdentity.currentUser.isAdmin()){
                $scope.company = office.company;
            }
        });

        if(crIdentity.currentUser.company && !crIdentity.currentUser.isAdmin()){
            crCompanyFactory.getCompany(crIdentity.currentUser.company).then(function(company){
                $scope.company = company;
            });
        }
        onRouteChangeOff = $scope.$on('$locationChangeStart', routeChange);
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
        onRouteChangeOff();
        if($scope.officeForm.$valid){
            $scope.office.company = $scope.office.company.id;

            crOfficeFactory.updateOffice($scope.office).then(function(){
                crNotifier.notify($translate.instant('_office_has_been_updated_'));
                $location.path('/offices');
            }, function(reason){
                crNotifier.error(reason);
            });
        }
    };

    $scope.isEditOffice = true;
    $scope.init();
});
