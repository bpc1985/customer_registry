"use strict";

describe("crPersonCreateCtrl - Create Person Controller", function(){
    var $scope, $q, $location, $httpBackend, $route, $routeParams;
    var PersonFactory, PersonCreateCtrl;
    var MockCompanyFactory, MockPeopleFactory;
    var deferred, fakeCompanies, fakePeople;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(angular.mock.module('app'));

    beforeEach(function(){
        fakeCompanies = getJSONFixture('companies.json');
        fakePeople = getJSONFixture('persons.json');
    });

    beforeEach(inject(function($controller, $rootScope, _$location_, _$q_, _$httpBackend_, crOfficeFactory, crCompanyFactory, crPersonFactory){
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $q = _$q_ ;

        MockCompanyFactory = {
            getCompanies: function(){
                deferred = $q.defer();
                deferred.resolve(fakeCompanies);
                return deferred.promise;
            }
        };

        MockPeopleFactory = {
            createPerson: function(personData){
                deferred = $q.defer();
                deferred.resolve(fakePeople[0]);
                return deferred.promise;
            }
        };

        PersonCreateCtrl = $controller('crPersonCreateCtrl', {
            $scope: $scope,
            crCompanyFactory: MockCompanyFactory,
            crPersonFactory: MockPeopleFactory,
            $location: $location
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Create Person Function', function(){
        beforeEach(function(){
            spyOn(MockCompanyFactory, 'getCompanies').andCallThrough();
            spyOn(MockPeopleFactory, 'createPerson').andCallThrough();
            $scope.$root.$digest();
        });

        it('should be able to create new person', function(){
            var personData = {
                "city": "Espoo",
                "country": "Finland",
                "email": "hongochung@juno.com",
                "mobile": "23423423432",
                "pname": "Micheal Lang"
            };

            MockPeopleFactory.createPerson(personData).then(function(person){
                expect(person.email).toEqual("hongochung@juno.com");
                expect(person.pname).toEqual("Micheal Lang");
            });
        });
    });
});
