let assert = require('chai').assert;
let Q = require('q');
let superagent = require('superagent');
let testID, lastID;
let libOperations = require('../../lib/contactsLogic');
let id = 12;

describe('Testing of the Access DB API', function () {
    //
    // it('should test receiving all contacts from Access', function (done) {
    //     superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
    //         assert.equal(res.status, 200);
    //         assert.notEqual(res.body, null);
    //         testID = res.body[0].ID;
    //         return done();
    //     })
    // });
    //
    // it('should test receiving one contact from Access', function (done) {
    //     superagent.get("http://localhost:8601/accessDBapi/contacts/" + testID +"").end(function (err, res) {
    //         assert.equal(res.status, 200);
    //         assert.notEqual(res.body, null);
    //         return done();
    //     })
    // });
    //
    // it('does any test work?', function () {
    //     let testVar = 'Working';
    //     assert.equal(testVar, 'Working');
    // });
    //
    // it('should create a new contact into the Access db', function (done) {
    //     superagent.post("http://localhost:8601/accessDBapi/contacts")
    //         .send(
    //             {
    //                 FirstName: 'Tester',
    //                 LastName: 'Testerson',
    //                 Telephone: '999-9999',
    //                 Email: 'test@email.com',
    //                 State: 'HI'
    //             }
    //         )
    //         .end(function (err, res) {
    //             assert.equal(res.status, 200);
    //             assert.notEqual(res.body, null);
    //             return done();
    //         })
    // });
    //
    // it('should update the new item that was just created in the Access DB by this test', function (done) {
    //     superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
    //         let lastArrayIndex = res.body.length - 1;
    //         lastID = res.body[lastArrayIndex].ID;
    //         superagent.put("http://localhost:8601/accessDBapi/contacts/" + lastID +"")
    //             .send(
    //                 {
    //                     FirstName: 'Update',
    //                     LastName: 'UpdateLast',
    //                     Telephone: '000-0000',
    //                     Email: 'update@email.com',
    //                     State: 'UP'
    //                 }
    //             )
    //             .end(function (err, res) {
    //                 assert.equal(res.status, 200);
    //                 assert.notEqual(res.body, null);
    //                 return done();
    //             });
    //         return done();
    //     })
    // });
    //
    // it('should delete the last item that was created by this test', function (done) {
    //     superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
    //         let lastArrayIndex = res.body.length - 1;
    //         lastID = res.body[lastArrayIndex].ID;
    //         superagent.delete("http://localhost:8601/accessDBapi/contacts/" + lastID +"").then(function (err, res) {
    //             assert.equal(res.status, 200);
    //         });
    //         return done();
    //     })
    // });

    // it('showAll() should not equal null', function (done) {
    //     let callback = function (err, result) {
    //         if(err){
    //             console.log(err);
    //             done();
    //         }
    //         if(result){
    //             console.log(result);
    //             assert.notEqual(result, null);
    //             done();
    //         }
    //     };
    //     libOperations().showAll(callback);
    // });
    //
    // it('getOne() should not equal null', function (done) {
    //     let callback = function (err, result) {
    //         if(err){
    //             console.log("ERROR::::::");
    //             console.log(err.fail);
    //             done();
    //         }
    //         if(result){
    //             console.log("RESULT::::::");
    //             console.log(result);
    //             assert.notEqual(result, null);
    //             done();
    //         }
    //     };
    //
    //
    //     libOperations().getOne(id, callback);
    // });

    it('getOne() should not equal null', function (done) {
        let callback = function (err, result) {
            if(err){
                console.log("ERROR::::::");
                console.log(err.fail);
                done();
            }
            if(result){
                console.log("RESULT::::::");
                console.log(result);
                assert.notEqual(result, null);
                done();
            }
        };

        libOperations().getOne({_id: 12}, callback);
    });

});






