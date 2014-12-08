angular.module('app').controller('crOfficeCreateCtrl',
    function($scope, $translate, $location, $routeParams, crModalService, crNotifier, crOfficeFactory, crPersonFactory, crCompanyFactory, crRootFactory, crIdentity, crModalService){
    crRootFactory.setLanguageDir('office');
    var onRouteChangeOff;

    function routeChange(event, newUrl) {
        crModalService.displayModal(event, newUrl, $scope.officeForm, onRouteChangeOff);
    }

    $scope.init = function(){
        $scope.company = {};
        $scope.persons = crPersonFactory.getPeople();
        $scope.weekdays = [];
        $scope.office = {
            show_office: false,
            services: [],
            delivery_areas: [],
            contact_persons: []
        };

        if(crIdentity.currentUser.company){
            crCompanyFactory.getCompany(crIdentity.currentUser.company).then(function(company){
                $scope.company = company;
            });
        }

        if($routeParams.company && !crIdentity.currentUser.company){
            $scope.isCompanyPopup = true;
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

    $scope.create = function(){
        $scope.$broadcast('showErrorsCheckValidity');

        if($scope.officeForm.$valid){
            onRouteChangeOff();
            $scope.office.company = $scope.company.id;
            $scope.office.open_times = {
                'weekdays': $scope.weekdays,
                'holiday': $scope.holiday
            };

            crOfficeFactory.createOffice($scope.office).then(function(){
                crNotifier.notify($translate.instant('_new_office_has_been_created_'));
                $location.path('/offices');
            }, function(reason){
                crNotifier.error(reason);
            });
        }
    };

    $scope.$watchCollection('persons', function () {
        if($scope.persons.length > 0){
            $scope.office.contact_persons.push(_.first($scope.persons).id);
        }
    }, true);

    $scope.init();
});
