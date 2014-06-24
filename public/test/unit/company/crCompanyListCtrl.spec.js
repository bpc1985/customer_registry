"use strict";

describe("crCompanyListCtrl - Create List Controller", function(){
    var $scope, $q, $location, $httpBackend, $route, $routeParams;
    var CompanyFactory, CompanyListCtrl;
    var MockCompanyFactory;
    var deferred, fakeCompanies;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(angular.mock.module('app'));

    beforeEach(function(){
        fakeCompanies = getJSONFixture('companies.json');
    });

    beforeEach(inject(function($controller, $rootScope, _$q_, _$httpBackend_, crCompanyFactory, crPersonFactory){
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $q = _$q_ ;

        MockCompanyFactory = {
            getCompanies: function(){
                deferred = $q.defer();
                deferred.resolve(fakeCompanies);
                return deferred.promise;
            },
            deleteCompany: function(company){
                deferred = $q.defer();
                deferred.resolve("Company has been deleted!");
                return deferred.promise;
            }
        };

        CompanyListCtrl = $controller('crCompanyListCtrl', {
            $scope: $scope,
            crCompanyFactory: MockCompanyFactory
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Individual Checkout', function(){
        beforeEach(function(){
            spyOn(MockCompanyFactory, 'getCompanies').andCallThrough();
            spyOn(MockCompanyFactory, 'deleteCompany').andCallThrough();
            $scope.$root.$digest();
        });

        it('should intialize persons first loading', function(){
            $scope.list();
            expect($scope.companies.length).toEqual(3);
        });

        it('should be able to create new company', function(){
            var test_company = $scope.companies[1];
            $scope.delete(test_company);
            expect($scope.companies.length).toEqual(2);
        });
    });
});
