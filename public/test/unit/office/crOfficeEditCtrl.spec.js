"use strict";

describe("crOfficeEditCtrl - Edit Office Controller", function(){
    var $scope, $q, $location, $httpBackend, $route, $routeParams;
    var Restangular, OfficeEditCtrl;
    var OfficeFactory, MockCompanyFactory, MockPeopleFactory;
    var deferred, fakeCompanies, fakePeople, fakeOffices;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(angular.mock.module('app'));

    beforeEach(function(){
        fakeCompanies = getJSONFixture('companies.json');
        fakePeople = getJSONFixture('persons.json');
        fakeOffices = getJSONFixture('offices.json');
    });

    beforeEach(inject(function($controller, $rootScope, _$routeParams_, _$location_, _$q_, _$httpBackend_, _Restangular_, crOfficeFactory, crCompanyFactory, crPersonFactory){
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $q = _$q_ ;
        $routeParams = _$routeParams_;
        Restangular = _Restangular_;
        OfficeFactory = crOfficeFactory;

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

        OfficeEditCtrl = $controller('crOfficeEditCtrl', {
            $scope: $scope,
            $location: $location,
            $routeParams: $routeParams,
            crCompanyFactory: MockCompanyFactory,
            crPersonFactory: MockPeopleFactory,
            crOfficeFactory: OfficeFactory
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Edit Office Function', function(){
        beforeEach(function(){
            $routeParams.id = "53456908eeb07d3b7fa7a2ba";
            $httpBackend.expectGET('/api/offices').respond(fakeOffices);
            $httpBackend.expectGET('/api/offices/53456908eeb07d3b7fa7a2ba').respond(fakeOffices[0]);

            spyOn(MockCompanyFactory, 'getCompanies').andCallThrough();
            spyOn(MockPeopleFactory, 'getPeople').andCallThrough();

            $scope.init();
            $httpBackend.flush();
        });

        it('should be able to initialize data', function(){
            expect($scope.office.id).toEqual("53456908eeb07d3b7fa7a2ba");
            expect($scope.office.office_name).toEqual("Floral Secret");
        });

        it('should be able to call update() function', function(){
            $scope.office.office_name = "Floral Secret 2";

            $httpBackend.expectPUT('/api/offices/53456908eeb07d3b7fa7a2ba').respond(200);
            $scope.update();
            $httpBackend.flush();

            expect($scope.office.office_name).toEqual("Floral Secret 2");
        });

    });
});
