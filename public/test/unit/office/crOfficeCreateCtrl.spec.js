"use strict";

describe("crOfficeCreateCtrl - Create Office Controller", function(){
    var $scope, $q, $location, $httpBackend, $route, $routeParams;
    var OfficeFactory, OfficeCreateCtrl;
    var MockOfficeFactory, MockCompanyFactory, MockPeopleFactory;
    var deferred, fakeCompanies, fakeOffices, fakePeople;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(angular.mock.module('app'));

    beforeEach(function(){
        fakeCompanies = getJSONFixture('companies.json');
        fakePeople = getJSONFixture('persons.json');
        fakeOffices = getJSONFixture('offices.json');
    });

    beforeEach(inject(function($controller, $rootScope, _$location_, _$q_, _$httpBackend_, crOfficeFactory, crCompanyFactory, crPersonFactory){
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $q = _$q_ ;

        MockOfficeFactory = {
            createOffice: function(officeData){
                deferred = $q.defer();
                deferred.resolve(fakeOffices[0]);
                return deferred.promise;
            }
        };

        MockCompanyFactory = {
            getCompanies: function(){
                deferred = $q.defer();
                deferred.resolve(fakeCompanies);
                return deferred.promise;
            }
        };

        MockPeopleFactory = {
            getPeople: function(){
                return fakePeople;
            }
        };

        OfficeCreateCtrl = $controller('crOfficeCreateCtrl', {
            $scope: $scope,
            crOfficeFactory: MockOfficeFactory,
            crCompanyFactory: MockCompanyFactory,
            crPersonFactory: MockPeopleFactory,
            $location: $location
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Create Office Function', function(){
        beforeEach(function(){
            spyOn(MockOfficeFactory, 'createOffice').andCallThrough();
            spyOn(MockCompanyFactory, 'getCompanies').andCallThrough();
            spyOn(MockPeopleFactory, 'getPeople').andCallThrough();
            $scope.$root.$digest();
        });

        it('should be able to create new office', function(){
            var officeData = {
                "office_name": "Floral Secret",
                "open_times": "6AM - 9PM",
                "street_address": "Kirstintie 4",
                "zipcode": "99999",
                "city": "Espoo"
            };

            MockOfficeFactory.createOffice(officeData).then(function(office){
                expect(office.office_name).toEqual("Floral Secret");
                expect(office.street_address).toEqual("Kirstintie 4");
            });
        });
    });
});
