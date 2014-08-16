angular.module('app').controller('crPersonCreateCtrl', function($scope, $translate, $location, Restangular, crNotifier, crPersonFactory, crCompanyFactory, crRootFactory, crIdentity){
    crRootFactory.setLanguageDir('person');

    $scope.init = function(){
        var user = crIdentity.currentUser;
        if(_.isEmpty(user.roles) && user.company){
            crCompanyFactory.getCompany(crIdentity.currentUser.company).then(function(company){
                $scope.company = Restangular.copy(company);
            });
        }
    };

    $scope.create = function(from){
        var newPersonData = {
            pname: $scope.person.pname,
            title: $scope.person.title,
            telephone: $scope.person.telephone,
            mobile: $scope.person.mobile,
            street: $scope.person.street,
            zipcode: $scope.person.zipcode,
            city: $scope.person.city,
            country: $scope.person.country,
            email: $scope.person.email,
            company: crIdentity.currentUser.company
        };

        crPersonFactory.createPerson(newPersonData).then(function(newPerson){
            crNotifier.notify($translate.instant('New person has been created'));
            if(from === 'modal-company'){
                $scope.$parent.persons.push(newPerson);
            }
            else if(from === 'modal-office'){
                $scope.$parent.office.contact_persons.push(newPerson);
            }
            else {
                $location.path('/persons');
            }
        }, function(reason){
            crNotifier.error(reason);
        });;
    };

    $scope.init();
});
