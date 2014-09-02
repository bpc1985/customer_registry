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
            show_office: true,
            services: [],
            delivery_areas: [],
            contact_persons: []
        };

        for (var i = 0; i < 7; i++) {
            $scope.weekdays[i] = {
                from: '8:00',
                to: '17:00',
                is_closed: false
            };
        }
    };

    $scope.toggleSelectedPersons = function(personId){
        var idx = $scope.office.contact_persons.indexOf(personId);
        if (idx > -1) {
            $scope.office.contact_persons.splice(idx, 1);
        } else {
            $scope.office.contact_persons.push(personId);
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

    $scope.removeService = function(value){
        $scope.office.services = _.without($scope.office.services, value);
    };

    $scope.$watchCollection('persons', function () {
        if($scope.persons.length > 0){
            $scope.office.contact_persons.push(_.first($scope.persons).id);
        }
    }, true);

    $scope.init();
});
