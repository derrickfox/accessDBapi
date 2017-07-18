let assert = require('chai').assert;
let superagent = require('superagent');
let testID, lastID;

// Testing the integration of the contacts business logic with the contacts API
describe('Integration testing of the Access DB API components', function () {

    // Testing to receive all contacts from Access DB
    it('should test receiving all contacts from Access', function (done) {
        superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
            assert.equal(res.status, 200);
            assert.notEqual(res.body, null);
            testID = res.body[0].ID;
            return done();
        })
    });

    // Testing to receive one specific contact from Access DB
    it('should test receiving one contact from Access', function (done) {
        superagent.get("http://localhost:8601/accessDBapi/contacts/" + testID +"").end(function (err, res) {
            assert.equal(res.status, 200);
            assert.notEqual(res.body, null);
            return done();
        })
    });

    // Testing to create a new contact in the Access DB
    it('should create a new contact into the Access db', function (done) {
        superagent.post("http://localhost:8601/accessDBapi/contacts")
            .send(
                // Mock new contact to be sent to Access DB
                {
                    FirstName: 'Tester',
                    LastName: 'Testerson',
                    Telephone: '999-9999',
                    Email: 'test@email.com',
                    State: 'HI'
                }
            )
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.notEqual(res.body, null);
                return done();
            })
    });

    // Testing to update a specific contact in the Access DB
    it('should update the new item that was just created in the Access DB by this test', function (done) {
        superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
            let lastArrayIndex = res.body.length - 1;
            lastID = res.body[lastArrayIndex].ID;
            superagent.put("http://localhost:8601/accessDBapi/contacts/" + lastID +"")
                .send(
                    // Mock update contact to be sent to Access DB
                    {
                        FirstName: 'Update',
                        LastName: 'UpdateLast',
                        Telephone: '000-0000',
                        Email: 'update@email.com',
                        State: 'UP'
                    }
                )
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.notEqual(res.body, null);
                    return done();
                });
            return done();
        })
    });

    // Testing to delete a contact from the Access DB
    it('should delete the last item that was created by this test', function (done) {
        superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
            let lastArrayIndex = res.body.length - 1;
            lastID = res.body[lastArrayIndex].ID;
            superagent.delete("http://localhost:8601/accessDBapi/contacts/" + lastID +"")
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    return done();
                });
            return done();
        })
    });

});





