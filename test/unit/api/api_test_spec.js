let assert = require('chai').assert;
let superagent = require('superagent');
const contactsAPI = new require('../../../api/contactsAPI');

// Testing the Access DB API logic
describe('Unit testing the middleware functions of the Access DB API', function () {

    // Testing middleware that retrieves all contacts from DB
    it('should test the middleware function getAll() is not null', function () {
        let middlewareFunction = contactsAPI.routes[0].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

    // Testing middleware that creates a new contact in DB
    it('should test the middleware function createNew() is not null', function () {
        let middlewareFunction = contactsAPI.routes[1].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

    // Testing middleware that deletes a contact from the DB
    it('should test the middleware function deleteContact() is not null', function () {
        let middlewareFunction = contactsAPI.routes[2].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

    // Testing middleware that updates a specific contact in the DB
    it('should test the middleware function updateContact() is not null', function () {
        let middlewareFunction = contactsAPI.routes[3].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

    // Testing middleware that retrieves one specific contact from the DB
    it('should test the middleware function getOneContact() is not null', function () {
        let middlewareFunction = contactsAPI.routes[4].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

});





