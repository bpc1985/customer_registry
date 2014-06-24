"use strict";

describe("crPersonEditCtrl - Edit Person Controller", function(){
    var $scope, $q, $location, $httpBackend, $route, $routeParams;
    var Restangular, PersonEditCtrl;
    var OfficeFactory, MockCompanyFactory, MockPeopleFactory;
    var deferred, fakeCompanies, fakePeople, fakeOffices;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(angular.mock.module('app'));

    beforeEach(function(){
        fakeCompanies = getJSONFixture('companies.json');
        fakePeople = getJSONFixture('persons.json');
        fakeOffices = getJSONFixture('offices.json');
    });

    beforeEach(inject(function($controller, $rootScope, _$routeParams_, _$location_, _$q_, _$httpBackend_, _Restangular_, crCompanyFactory, crPersonFactory){
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $q = _$q_ ;
        $routeParams = _$routeParams_;
        Restangular = _Restangular_;

        MockCompanyFactory = {
            getCompanies: function(){
                deferred = $q.defer();
                deferred.resolve(fakeCompanies);
                return deferred.promise;
            }
        };

        PersonEditCtrl = $controller('crPersonEditCtrl', {
            $scope: $scope,
            $location: $location,
            $routeParams: $routeParams,
            crCompanyFactory: MockCompanyFactory,
            crPersonFactory: crPersonFactory
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Edit Person Function', function(){
        beforeEach(function(){
            $routeParams.id = "533a75d60f35312ea1689d03";
            $httpBackend.expectGET('/api/people').respond(fakePeople);
            $httpBackend.expectGET('/api/people/533a75d60f35312ea1689d03').respond(fakePeople[0]);

            spyOn(MockCompanyFactory, 'getCompanies').andCallThrough();

            $scope.init();
            $httpBackend.flush();
        });

        it('should be able to initialize data', function(){
            expect($scope.person.id).toEqual("533a75d60f35312ea1689d03");
            expect($scope.person.email).toEqual("hongochung@juno.com");
        });

        it('should be able to call update() function', function(){
            $scope.person.email = "hongochung@gmail.com";

            $httpBackend.expectPUT('/api/people/533a75d60f35312ea1689d03').respond(200);
            $scope.update();
            $httpBackend.flush();

            expect($scope.person.email).toEqual("hongochung@gmail.com");
        });

    });
});
