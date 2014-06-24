"use strict";

describe("crCompanyEditCtrl - Edit Company Controller", function(){
    var $scope, $q, $location, $httpBackend, $route, $routeParams;
    var Restangular, CompanyFactory, CompanyEditCtrl;
    var CompanyFactory, MockPeopleFactory;
    var deferred, fakeCompanies, fakePeople;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(angular.mock.module('app'));

    beforeEach(function(){
        fakeCompanies = getJSONFixture('companies.json');
        fakePeople = getJSONFixture('persons.json');
    });

    beforeEach(inject(function($controller, $rootScope, _$routeParams_, _$location_, _$q_, _$httpBackend_, _Restangular_, crCompanyFactory, crPersonFactory){
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $q = _$q_ ;
        $routeParams = _$routeParams_;
        Restangular = _Restangular_;
        CompanyFactory = crCompanyFactory;

        MockPeopleFactory = {
            getPeople: function(){
                deferred = $q.defer();
                deferred.resolve(fakePeople);
                return deferred.promise;
            }
        };

        CompanyEditCtrl = $controller('crCompanyEditCtrl', {
            $scope: $scope,
            crCompanyFactory: CompanyFactory,
            crPersonFactory: MockPeopleFactory,
            $location: $location,
            $routeParams: $routeParams,
            Restangular: Restangular
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Edit Company Function', function(){
        beforeEach(function(){
            $routeParams.id = "5333e0c52e4156000064f724";
            $httpBackend.expectGET('/api/companies').respond(fakeCompanies);
            $httpBackend.expectGET('/api/companies/5333e0c52e4156000064f724').respond(fakeCompanies[0]);

            $scope.init();
            $httpBackend.flush();
        });

        it('should be able to initialize data', function(){
            expect($scope.company.id).toEqual("5333e0c52e4156000064f724");
            expect($scope.company.company_code).toEqual("2485800-1");
            expect($scope.company.email).toEqual("info@ekukka.fi");

            $scope.persons.then(function(people){
                expect(people.length).toEqual(3);
                expect(people[0].id).toEqual("533a75d60f35312ea1689d03");
                expect(people[1].id).toEqual("535e0e596f1cff935a12aaaf");
                expect(people[2].id).toEqual("534557c13f5549e86a33b472");
            });
        });

        it('should be able to call update data', function(){
            $scope.company.company_code = "123456-7";
            $scope.company.email = "test@gmail.com";

            $httpBackend.expectPUT('/api/companies/5333e0c52e4156000064f724').respond(200);
            $scope.update();
            $httpBackend.flush();

            expect($scope.company.company_code).toEqual("123456-7");
            expect($scope.company.email).toEqual("test@gmail.com");
        });
    });
});
