const Q = require('q');
// Get the adodb module
const ADODB = require('node-adodb');
const nodeify = require('nodeify');
ADODB.debug = true;

// Connect to the MS Access DB
let connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Users\\foxdm2\\Desktop\\ContactsDB.accdb;Persist Security Info=False;');


function standardResp(reject, resolve) {
    return function (err, result) {
        if (err) {
            reject(err);
        } else if (result){
            resolve(result);
        } else {
            console.log("StandardResp = Something...else...was received")
        }
    }
}

function libOperations() {

    function showAll(callback) {
        return Q.promise((resolve, reject) => {
            connection
                .query( 'SELECT * FROM [ContactsTable]')
                .on('done', function (data) {
                    standardResp(resolve(data), reject(data));
                });
        }).nodeify(callback);
    }

    function getOne(id, callback) {
        return Q.promise((resolve, reject) => {
            connection
                .query( 'SELECT * FROM [ContactsTable] WHERE ID = ' + id._id + ';')
                .on('done', function (data) {
                    standardResp(resolve(data), reject(data));
                });
        }).nodeify(callback);
    }

    function deleteContact(id, callback) {
        console.log(id);
        return Q.promise((resolve, reject) => {
            connection
                .execute('DELETE FROM ContactsTable WHERE ID = ' + id._id +';')
                .on('done', function(data) {
                    console.log('result:', JSON.stringify(data, null, '  '));
                    standardResp(resolve(data), reject(data));
                })
                .on('fail', function(error) {
                    console.log(error);
                });
        }).nodeify(callback);
    }

    function createNew(callback) {
        return Q.promise((resolve, reject) => {
            connection
                .execute('INSERT INTO ContactsTable(LastName, FirstName, Telephone, Email, State) VALUES ("Haney", "Bill", "666-6666", "bill@email.com", "NJ")')
                .on('done', function(data) {
                    console.log('result:', JSON.stringify(data, null, '  '));
                    standardResp(resolve(data), reject(data));
                })
                .on('fail', function(error) {
                    console.log(error);
                });
        }).nodeify(callback);
    }

    function updateContact(id, callback) {
        console.log(id);
        return Q.promise((resolve, reject) => {
            connection
                .execute('UPDATE ContactsTable SET FirstName = "Ren", LastName = "Kylo" WHERE id = ' + id._id + ';')
                .on('done', function(data) {
                    console.log('result:', JSON.stringify(data, null, '  '));
                    standardResp(resolve(data), reject(data));
                })
                .on('fail', function(error) {
                    console.log(error);
                });
        }).nodeify(callback);
    }

    return {
        showAll,
        getOne,
        createNew,
        deleteContact,
        updateContact
    };
}

module.exports = libOperations;