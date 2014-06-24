"use strict";

describe("crOfficeListCtrl - List Office Controller", function(){
    var $scope, $q, $location, $httpBackend, $route, $routeParams;
    var OfficeListCtrl, MockOfficeFactory;
    var deferred, fakeOffices;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(angular.mock.module('app'));

    beforeEach(function(){
        fakeOffices = getJSONFixture('offices.json');
    });

    beforeEach(inject(function($controller, $rootScope, _$q_, _$httpBackend_, crOfficeFactory){
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $q = _$q_ ;

        MockOfficeFactory = {
            getOffices: function(){
                return fakeOffices;
            },
            deleteOffice: function(office){
                deferred = $q.defer();
                deferred.resolve("Office has been deleted!");
                return deferred.promise;
            }
        };

        OfficeListCtrl = $controller('crOfficeListCtrl', {
            $scope: $scope,
            crOfficeFactory: MockOfficeFactory
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('List Offices Function', function(){
        beforeEach(function(){
            spyOn(MockOfficeFactory, 'getOffices').andCallThrough();
            spyOn(MockOfficeFactory, 'deleteOffice').andCallThrough();
            $scope.list();
            $scope.$root.$digest();
        });

        it('should intialize offices first loading', function(){
            expect($scope.offices.length).toEqual(3);
        });

        it('should be able to call delete() to delete office', function(){
            var test_office = $scope.offices[1];
            $scope.delete(test_office);
            expect($scope.offices.length).toEqual(2);
        });
    });
});
