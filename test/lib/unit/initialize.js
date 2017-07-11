'use strict';

const supertest = require('supertest-as-promised'),
    _ = require('lodash'),
    socketIOClient = require('socket.io-client');

module.exports = function initialize(jasmine, callback) {
    jasmine.getEnv().defaultTimeoutInterval = '45000';  // 45 seconds
    let apiURL = 'http://127.0.0.1';

    let data = {
        request: supertest(apiURL),
        Socket: socketIOClient,
        apiURL
    };

    callback(null, data);
};