let assert = require('chai').assert;
let superagent = require('superagent');
let lastID;
let libOperations = require('../../../lib/contactsLogic');

describe('Unit testing the business logic of the Access DB API', function () {

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

        libOperations().getOne({_id: 12}, callback);
    });

    it('updateContact() should not equal null', function (done) {
        let updatedLastName =
            {
                LastName: "Updated From Test"
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

        libOperations().updateContact({_id: 12}, updatedLastName, callback);
    });

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

        //
        // let callbackGetOne = function (err, result) {
        //     if(err){
        //         console.log("ERROR::::::");
        //         console.log(err.fail);
        //         done();
        //     }
        //     if(result){
        //         console.log("RESULT::::::");
        //         console.log(result[lastID]);
        //         done();
        //     }
        // };
        //
        // libOperations().getOne({_id: 12}, callbackGetOne);

        let callback = function (err, result) {
            if(err){
                console.log(err.fail);
                done();
            }
            if(result){
                // assert.notEqual(result, null);
                libOperations().deleteContact({_id: lastElementID}, callback);
                done();
            }
        };

        // libOperations().deleteContact({_id: lastElementID}, callback);
    });

});





