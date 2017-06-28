'use strict';

var helloService = module.exports;

// Get the adodb module
var ADODB = require('node-adodb');
ADODB.debug = true;

// Connect to the MS Access DB
var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\dbs\\my-access-db.accdb;Persist Security Info=False;');


function standardResp(reject, resolve) {
    return function (err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    }
}

function libOperations(){

    function getAllContacts() {
        // return Q.promise((resolve, reject) => {
        //     collection.find({}).toArray(standardResp(reject, resolve));
        // }).nodeify(callback);

        connection
            .query( 'SELECT *' +
                'FROM [customerList]')
            .on('done', function (data) {
                return data;
            });
    }

    function createNewContact(createContact) {
        connection
            .execute('INSERT INTO customerList(firstName, lastName, email, state) VALUES ("John", "Smith", "email@email.com", "MD")')
            .on('done', function (data){
                response.send(data);
            });
    }

    function updateContact({_id}, updatedContact) {
        connection
            .execute('UPDATE customerList(firstName, lastName, email, state) VALUES ("John", "Smith", "email@email.com", "MD")')
            .on('done', function (data){
                response.send(data);
            });
    }

    return {
        getAllContacts,
        createNewContact,
        updateContact
    };
}

module.exports = libOperations;
