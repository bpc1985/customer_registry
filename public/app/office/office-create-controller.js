angular.module('app').controller('crOfficeCreateCtrl',
    function($scope, $translate, $location, crNotifier, crOfficeFactory, crPersonFactory, crCompanyFactory, crRootFactory, crIdentity){
    crRootFactory.setLanguageDir('office');

    $scope.init = function(){
        $scope.company = {};

        if(crIdentity.currentUser.company){
            crCompanyFactory.getCompany(crIdentity.currentUser.company).then(function(company){
                $scope.company = company;
            });
        }

        $scope.persons = crPersonFactory.getPeople();
        $scope.weekdays = [];
        $scope.office = {
            delivery_areas: []
        };

        for (var i = 0; i < 7; i++) {
            $scope.weekdays[i] = {
                from: '',
                to: '',
                is_closed: false
            };
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

    $scope.create = function(){
        $scope.office.company = $scope.company.id;
        $scope.office.open_times = {
            'weekdays': $scope.weekdays,
            'holiday': $scope.holiday
        };
        $scope.office.services = $scope.office.services.split(",");

        crOfficeFactory.createOffice($scope.office).then(function(){
            crNotifier.notify($translate.instant('New office has been created'));
            $location.path('/offices');
        }, function(reason){
            crNotifier.error(reason);
        });
    };

    $scope.removeZipCode = function(value){
        $scope.office.delivery_areas = _.without($scope.office.delivery_areas, value);
    };

    $scope.init();
});
