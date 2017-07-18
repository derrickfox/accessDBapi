let assert = require('chai').assert;
let superagent = require('superagent');
const contactsAPI = new require('../../../api/contactsAPI');

describe('Unit testing the middleware functions of the Access DB API', function () {

    it('should test the middleware function getAll() is not null', function () {
        let middlewareFunction = contactsAPI.routes[0].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

    it('should test the middleware function createNew() is not null', function () {
        let middlewareFunction = contactsAPI.routes[1].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

    it('should test the middleware function deleteContact() is not null', function () {
        let middlewareFunction = contactsAPI.routes[2].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

    it('should test the middleware function updateContact() is not null', function () {
        let middlewareFunction = contactsAPI.routes[3].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

    it('should test the middleware function getOneContact() is not null', function () {
        let middlewareFunction = contactsAPI.routes[4].middleware;
        assert.isFunction(middlewareFunction);
        assert.notEqual(middlewareFunction, null);
    });

});





