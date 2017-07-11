let assert = require('chai').assert;
let superagent = require('superagent');

let testID, lastID;

describe('Testing of the Access DB API', function () {

    it('should test receiving all contacts from Access', function (done) {
        superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
            assert.equal(res.status, 200);
            assert.notEqual(res.body, null);
            testID = res.body[0].ID;
            return done();
        })
    });

    it('should test receiving one contact from Access', function (done) {
        superagent.get("http://localhost:8601/accessDBapi/contacts/" + testID +"").end(function (err, res) {
            assert.equal(res.status, 200);
            assert.notEqual(res.body, null);
            return done();
        })
    });

    it('should create a new contact into the Access db', function (done) {
        superagent.post("http://localhost:8601/accessDBapi/contacts")
            .send(
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

    it('should update the new item that was just created in the Access DB by this test', function (done) {
        superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
            let lastArrayIndex = res.body.length - 1;
            lastID = res.body[lastArrayIndex].ID;
            superagent.put("http://localhost:8601/accessDBapi/contacts/" + lastID +"")
                .send(
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

    it('should delete the last item that was created by this test', function (done) {
        superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
            let lastArrayIndex = res.body.length - 1;
            lastID = res.body[lastArrayIndex].ID;
            superagent.delete("http://localhost:8601/accessDBapi/contacts/" + lastID +"").end(function (err, res) {
                assert.equal(res.status, 200);
            });
            return done();
        })
    });
});



