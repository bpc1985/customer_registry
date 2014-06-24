"use strict";

describe("Company Factory", function(){
    var companyFactory, httpBackend, restangular;
    var fakeCompanies, fakePeople;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(function() {
        fakeCompanies = getJSONFixture('companies.json');
        fakePeople = getJSONFixture('persons.json');
    });

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function($httpBackend, crCompanyFactory, Restangular) {
        httpBackend = $httpBackend;
        companyFactory = crCompanyFactory;
        restangular = Restangular;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //check to see if it has the expected function
    it('should have a function getCompanies()', function(){
        expect(angular.isFunction(companyFactory.getCompanies)).toBe(true);
    });

    it('should have a function getCompany()', function(){
        expect(angular.isFunction(companyFactory.getCompany)).toBe(true);
    });

    it('should have a function createCompany()', function(){
        expect(angular.isFunction(companyFactory.createCompany)).toBe(true);
    });

    it('should have a function updateCompany()', function(){
        expect(angular.isFunction(companyFactory.updateCompany)).toBe(true);
    });

    it('should have a function deleteCompany()', function(){
        expect(angular.isFunction(companyFactory.deleteCompany)).toBe(true);
    });

    describe('Check to see if functions in factory return values', function(){
        /*
        it('should have function getCompanies() return value', function (){
            var companies = null;
            httpBackend.expectGET('/api/companies').respond(fakeCompanies);

            //httpBackend.expectGET('/api/people/535e0e596f1cff935a12aaaf').respond(fakePeople[2]);
            //httpBackend.expectGET('/api/people/534557c13f5549e86a33b472').respond(fakePeople[1]);

            companyFactory.getCompanies().then(function(company_list){
                companies = company_list;
            });
            httpBackend.flush();

            expect(companies.length).toEqual(3);
        });
        */
        it('should have function getCompany() return value', function (){
            var company = null, company_id = '5333e0c52e4156000064f724';
            httpBackend.expectGET('/api/companies/5333e0c52e4156000064f724').respond(fakeCompanies[0]);

            companyFactory.getCompany(company_id).then(function(cmp){
                company = cmp;
            });
            httpBackend.flush();

            expect(company.company_name).toEqual("My Floweb Oy");
            expect(company.email).toEqual("info@ekukka.fi");
        });

        it('should have function createCompany() return value', function (){
            var company = null;
            var companyData = {
                "company_code": "123456-7",
                "company_name": "Test Company Oy",
                "company_type": "OK",
                "email": "mail@test.com",
                "phone": "12345466"
            };

            httpBackend.expectPOST('/api/companies').respond(companyData);

            companyFactory.createCompany().then(function(cmp){
                company = cmp;
            });
            httpBackend.flush();

            expect(company.company_code).toEqual("123456-7");
            expect(company.company_name).toEqual("Test Company Oy");
            expect(company.email).toEqual("mail@test.com");
        });

        it('should have function updateCompany() return value', function (){
            var company = null, company_id = '5333e0c52e4156000064f724';
            httpBackend.expectGET('/api/companies/5333e0c52e4156000064f724').respond(fakeCompanies[0]);

            companyFactory.getCompany(company_id).then(function(cmp){
                company = cmp;
            });
            httpBackend.flush();

            expect(company.company_name).toEqual("My Floweb Oy");
            expect(company.email).toEqual("info@ekukka.fi");

            // Set data and update
            company.company_name = "Test Company Oy";
            company.email = "mail@test.com";

            httpBackend.expectPUT('/api/companies/5333e0c52e4156000064f724').respond(company);

            companyFactory.updateCompany(company).then(function(cmp){
                company = cmp;
            });

            httpBackend.flush();

            expect(company.company_name).toEqual("Test Company Oy");
            expect(company.email).toEqual("mail@test.com");
        });

        it('should have function deleteCompany() return value', function (){
            var company = null, company_id = '5333e0c52e4156000064f724';
            var message = "Company is deleted successfully";
            httpBackend.expectGET('/api/companies/5333e0c52e4156000064f724').respond(fakeCompanies[0]);

            companyFactory.getCompany(company_id).then(function(cmp){
                company = cmp;
            });
            httpBackend.flush();

            // Delete company
            httpBackend.expectDELETE('/api/companies/5333e0c52e4156000064f724').respond(message);

            companyFactory.deleteCompany(company).then(function(msg){
                expect(msg).toEqual("Company is deleted successfully");
            });

            httpBackend.flush();
        });

    });
});
