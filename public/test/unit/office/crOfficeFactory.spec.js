"use strict";

describe("Office Factory", function(){
    var officeFactory, httpBackend, restangular;
    var fakeOffices;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(function() {
        fakeOffices = getJSONFixture('offices.json');
    });

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function($httpBackend, crOfficeFactory, Restangular) {
        httpBackend = $httpBackend;
        officeFactory = crOfficeFactory;
        restangular = Restangular;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //check to see if it has the expected function
    it('should have a function getOffices()', function(){
        expect(angular.isFunction(officeFactory.getOffices)).toBe(true);
    });

    it('should have a function getOffice()', function(){
        expect(angular.isFunction(officeFactory.getOffice)).toBe(true);
    });

    it('should have a function createOffice()', function(){
        expect(angular.isFunction(officeFactory.createOffice)).toBe(true);
    });

    it('should have a function updateOffice()', function(){
        expect(angular.isFunction(officeFactory.updateOffice)).toBe(true);
    });

    it('should have a function deleteOffice()', function(){
        expect(angular.isFunction(officeFactory.deleteOffice)).toBe(true);
    });

    describe('Check to see if functions in factory return values', function(){
        it('should have function getOffices() return value', function (){
            var offices = null;
            httpBackend.expectGET('/api/offices').respond(fakeOffices);

            offices = officeFactory.getOffices();
            httpBackend.flush();

            expect(offices.length).toEqual(3);
        });

        it('should have function getOffice() return value', function (){
            var office = null, office_id = '53456908eeb07d3b7fa7a2ba';
            httpBackend.expectGET('/api/offices/53456908eeb07d3b7fa7a2ba').respond(fakeOffices[0]);

            officeFactory.getOffice(office_id).then(function(o){
                office = o;
            });
            httpBackend.flush();

            expect(office.office_name).toEqual("Floral Secret");
            expect(office.id).toEqual("53456908eeb07d3b7fa7a2ba");
        });

        it('should have function createOffice() return value', function (){
            var office = null;

            httpBackend.expectPOST('/api/offices').respond(fakeOffices[0]);

            officeFactory.createOffice().then(function(o){
                office = o;
            });
            httpBackend.flush();

            expect(office.office_name).toEqual("Floral Secret");
            expect(office.id).toEqual("53456908eeb07d3b7fa7a2ba");
            expect(office.street_address).toEqual("Kirstintie 4");
        });

        it('should have function updateOffice() return value', function (){
            var office = null, office_id = '53456908eeb07d3b7fa7a2ba';
            httpBackend.expectGET('/api/offices/53456908eeb07d3b7fa7a2ba').respond(fakeOffices[0]);

            officeFactory.getOffice(office_id).then(function(o){
                office = o;
            });
            httpBackend.flush();

            expect(office.office_name).toEqual("Floral Secret");
            expect(office.id).toEqual("53456908eeb07d3b7fa7a2ba");

            // Set data and update
            office.office_name = "Floral Secret Oy";

            httpBackend.expectPUT('/api/offices/53456908eeb07d3b7fa7a2ba').respond(office);

            officeFactory.updateOffice(office).then(function(o){
                office = o;
            });

            httpBackend.flush();

            expect(office.office_name).toEqual("Floral Secret Oy");
        });

        it('should have function deleteOffice() return value', function (){
            var office = null, office_id = '53456908eeb07d3b7fa7a2ba';
            httpBackend.expectGET('/api/offices/53456908eeb07d3b7fa7a2ba').respond(fakeOffices[0]);

            officeFactory.getOffice(office_id).then(function(o){
                office = o;
            });
            httpBackend.flush();

            expect(office.office_name).toEqual("Floral Secret");
            expect(office.id).toEqual("53456908eeb07d3b7fa7a2ba");


            // Delete office
            httpBackend.expectDELETE('/api/offices/53456908eeb07d3b7fa7a2ba').respond("Office is deleted successfully");

            officeFactory.deleteOffice(office).then(function(msg){
                expect(msg).toEqual("Office is deleted successfully");
            });

            httpBackend.flush();
        });
    });
});
