"use strict";

describe("Person Factory", function(){
    var personFactory, httpBackend, restangular;
    var fakePeople;

    jasmine.getJSONFixtures().fixturesPath = 'base/public/test/fixtures';

    beforeEach(function() {
        fakePeople = getJSONFixture('persons.json');
    });

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function($httpBackend, crPersonFactory, Restangular) {
        httpBackend = $httpBackend;
        personFactory = crPersonFactory;
        restangular = Restangular;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //check to see if it has the expected function
    it('should have a function getPeople()', function(){
        expect(angular.isFunction(personFactory.getPeople)).toBe(true);
    });

    it('should have a function getPerson()', function(){
        expect(angular.isFunction(personFactory.getPerson)).toBe(true);
    });

    it('should have a function createPerson()', function(){
        expect(angular.isFunction(personFactory.createPerson)).toBe(true);
    });

    it('should have a function updatePerson()', function(){
        expect(angular.isFunction(personFactory.updatePerson)).toBe(true);
    });

    it('should have a function deletePerson()', function(){
        expect(angular.isFunction(personFactory.deletePerson)).toBe(true);
    });

    describe('Check to see if functions in factory return values', function(){
        it('should have function getPeople() return value', function (){
            var persons = null;
            httpBackend.expectGET('/api/people').respond(fakePeople);

            persons = personFactory.getPeople();
            httpBackend.flush();

            expect(persons.length).toEqual(3);
        });

        it('should have function getPerson() return value', function (){
            var person = null, person_id = '533a75d60f35312ea1689d03';
            httpBackend.expectGET('/api/people/533a75d60f35312ea1689d03').respond(fakePeople[0]);

            personFactory.getPerson(person_id).then(function(p){
                person = p;
            });
            httpBackend.flush();

            expect(person.email).toEqual("hongochung@juno.com");
            expect(person.id).toEqual("533a75d60f35312ea1689d03");
        });

        it('should have function createOffice() return value', function (){
            var person = null;

            httpBackend.expectPOST('/api/people').respond(fakePeople[0]);

            personFactory.createPerson().then(function(p){
                person = p;
            });
            httpBackend.flush();

            expect(person.email).toEqual("hongochung@juno.com");
            expect(person.id).toEqual("533a75d60f35312ea1689d03");
        });

        it('should have function updateOffice() return value', function (){
            var person = null, newperson = null, person_id = '533a75d60f35312ea1689d03';
            httpBackend.expectGET('/api/people/533a75d60f35312ea1689d03').respond(fakePeople[0]);

            personFactory.getPerson(person_id).then(function(p){
                person = p;
            });
            httpBackend.flush();

            expect(person.email).toEqual("hongochung@juno.com");
            expect(person.id).toEqual("533a75d60f35312ea1689d03");

            // Set data and update
            person.email = "hongochung@gmail.com";

            httpBackend.expectPUT('/api/people/533a75d60f35312ea1689d03').respond(person);

            personFactory.updatePerson(person).then(function(p){
                newperson = p;
            });

            httpBackend.flush();

            expect(newperson.email).toEqual("hongochung@gmail.com");
        });

        it('should have function deleteOffice() return value', function (){
            var person = null, newperson = null, person_id = '533a75d60f35312ea1689d03';
            httpBackend.expectGET('/api/people/533a75d60f35312ea1689d03').respond(fakePeople[0]);

            personFactory.getPerson(person_id).then(function(p){
                person = p;
            });
            httpBackend.flush();

            expect(person.email).toEqual("hongochung@juno.com");
            expect(person.id).toEqual("533a75d60f35312ea1689d03");

            // Delete person
            httpBackend.expectDELETE('/api/people/533a75d60f35312ea1689d03').respond("Person is deleted successfully");

            personFactory.deletePerson(person).then(function(msg){
                expect(msg).toEqual("Person is deleted successfully");
            });

            httpBackend.flush();
        });
    });
});
