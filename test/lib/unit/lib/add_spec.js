let assert = require('chai').assert;
let superagent = require('superagent');

let libService = require('../../../../lib/addTwo');

describe('testing', function () {

    it('should work', function (done) {
        superagent.get("http://localhost:8601/accessDBapi/contacts").end(function (err, res) {
            assert.equal(res.status, 200);
            return done();
        })
    })

    it('should see if it is connected to lib directory', function () {
        expect(libService(1, 2)).toBe(3);
    })
});