"use strict";

describe("crPersonListCtrl - Person List Controller", function(){
    var $scope, $q, $location, $httpBackend, $route, $routeParams;
    var PersonFactory, PersonListCtrl;
    var MockPersonFactory;
    var deferred, fakePersons;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(angular.mock.module('app'));

    beforeEach(function(){
        fakePersons = getJSONFixture('persons.json');
    });

    beforeEach(inject(function($controller, $rootScope, _$q_, _$httpBackend_, crCompanyFactory, crPersonFactory){
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $q = _$q_ ;

        MockPersonFactory = {
            getPeople: function(){
                return fakePersons;
            },
            deletePerson: function(person){
                deferred = $q.defer();
                deferred.resolve("Person has been deleted!");
                return deferred.promise;
            }
        };

        PersonListCtrl = $controller('crPersonListCtrl', {
            $scope: $scope,
            crPersonFactory: MockPersonFactory
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Individual Checkout', function(){
        beforeEach(function(){
            spyOn(MockPersonFactory, 'getPeople').andCallThrough();
            spyOn(MockPersonFactory, 'deletePerson').andCallThrough();
            $scope.$root.$digest();
        });

        it('should intialize persons first loading', function(){
            $scope.list();
            expect($scope.people.length).toEqual(3);
        });

        it('should be able to delete company', function(){
            var test_person = $scope.people[1];
            $scope.delete(test_person);
            expect($scope.people.length).toEqual(2);
        });
    });
});
