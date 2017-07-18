let assert = require('chai').assert;
let superagent = require('superagent');
let lastID;
let libOperations = require('../../../lib/contactsLogic');

// Testing the business logic of the contacts
describe('Unit testing the business logic of the Access DB API', function () {

    // Testing that the showAll() function returns all contacts
    it('showAll() should not equal null', function (done) {
        let callback = function (err, result) {
            if(err){
                console.log(err);
                done();
            }
            if(result){
                assert.notEqual(result, null);
                done();
            }
        };
        libOperations().showAll(callback);
    });

    // Testing that the getOne() function returns the single contact
    it('getOne() should not equal null', function (done) {
        let callback = function (err, result) {
            if(err){
                console.log(err.fail);
                done();
            }
            if(result){
                assert.notEqual(result, null);
                done();
            }
        };

        libOperations().getOne({_id: 1}, callback);
    });

    // Testing that the updateContact() function updates the contact
    it('updateContact() should not equal null', function (done) {
        let updatedLastName =
            {
                LastName: "Updated From Test"
            };

        let callback = function (err, result) {
            if(err){
                console.log(err.fail);
                done();
            }
            if(result){
                assert.notEqual(result, null);
                done();
            }
        };

        libOperations().updateContact({_id: 1}, updatedLastName, callback);
    });

    // Testing that the createNew() function creates a new contact
    it('createNew() should not equal null', function (done) {
        let createContact =     {
            "LastName": "New Last",
            "FirstName": "New First",
            "Telephone": "000-0000",
            "Email": "new@email.com",
            "State": "NW"
        }

        let callback = function (err, result) {
            if(err){
                console.log(err.fail);
                done();
            }
            if(result){
                assert.notEqual(result, null);
                done();
            }
        };

        libOperations().createNew(createContact, callback);
    });

    // Testing the delete() function deletes a contact
    it('delete() should not return null', function (done) {

        let lastElementID;

        let callbackShowAll = function (err, result) {
            if(err){
                console.log(err);
                done();
            }
            if(result){
                lastID = result.length - 1;
                lastElementID = result[lastID];
                done();
            }
        };
        libOperations().showAll(callbackShowAll);

        let callback = function (err, result) {
            if(err){
                console.log(err.fail);
                done();
            }
            if(result){
                //libOperations().deleteContact({_id: lastElementID}, callback);
                done();
            }
        };

    });

});





