"use strict";

describe("crCompanyCreateCtrl - Create Company Controller", function(){
    var $scope, $q, $location, $httpBackend, $route, $routeParams;
    var CompanyFactory, CompanyCreateCtrl;
    var MockCompanyFactory, MockPeopleFactory;
    var deferred, fakeCompanies, fakePeople;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(angular.mock.module('app'));

    beforeEach(function(){
        fakeCompanies = getJSONFixture('companies.json');
        fakePeople = getJSONFixture('persons.json');
    });

    beforeEach(inject(function($controller, $rootScope, _$location_, _$q_, _$httpBackend_, crCompanyFactory, crPersonFactory){
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $q = _$q_ ;

        MockCompanyFactory = {
            createCompany: function(companyData){
                deferred = $q.defer();
                deferred.resolve(fakeCompanies[0]);
                return deferred.promise;
            }
        };

        MockPeopleFactory = {
            getPeople: function(){
                deferred = $q.defer();
                deferred.resolve(fakePeople);
                return deferred.promise;
            }
        };

        CompanyCreateCtrl = $controller('crCompanyCreateCtrl', {
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

    describe('Individual Checkout', function(){
        beforeEach(function(){
            spyOn(MockCompanyFactory, 'createCompany').andCallThrough();
            spyOn(MockPeopleFactory, 'getPeople').andCallThrough();
            $scope.init();
            deferred.resolve(fakePeople);
            $scope.$root.$digest();
        });

        it('should intialize persons first loading', function(){
            $scope.persons.then(function(people){
                expect(people.length).toEqual(3);
                expect(people[0].id).toEqual("533a75d60f35312ea1689d03");
                expect(people[1].id).toEqual("535e0e596f1cff935a12aaaf");
                expect(people[2].id).toEqual("534557c13f5549e86a33b472");
            });
        });

        it('should be able to create new company', function(){
            var companyData = {
                "company_code": "2485800-1",
                "company_name": "Test Company Oy",
                "company_type": "OK",
                "email": "info@ekukka.fi",
                "phone": "12345466"
            };

            MockCompanyFactory.createCompany(companyData).then(function(company){
                expect(company.company_code).toEqual("2485800-1");
                expect(company.email).toEqual("info@ekukka.fi");
            });
        });
    });
});
