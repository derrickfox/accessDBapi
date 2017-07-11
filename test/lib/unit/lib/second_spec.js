let assert = require('chai').assert;
let superagent = require('superagent');

let libService = require('../../../../lib/addTwo');

describe('testing', function () {

    it('should see if it is connected to lib directory', function () {
        expect(libService(1, 2)).toBe(3);
    })

    it('should test stuff', function () {
        expect(libService(2, 2)).toBe(4);
    })
});
