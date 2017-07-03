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

    function createNew(callback) {
        return Q.promise((resolve, reject) => {
            connection
                .execute('INSERT INTO ContactsTable(LastName, FirstName, Telephone, Email, State) VALUES ("Newton", "Bill", "555-5555", "NJ")')
                .on('done', function(data) {
                    console.log('result:', JSON.stringify(data, null, '  '));
                })
                .on('fail', function(error) {
                    console.log(error);
                });
        })
    }

    return {
        showAll,
        createNew
    };
}

module.exports = libOperations;