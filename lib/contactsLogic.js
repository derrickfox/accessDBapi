const Q = require('q');
const ADODB = require('node-adodb');
const nodeify = require('nodeify');
ADODB.debug = true;

// Connect to the MS Access DB
let connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Users\\foxdm2\\Desktop\\ContactsDB.accdb;Persist Security Info=False;');

// Standard Response to handle all response and request calls
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

// Lib Business Logic
function libOperations() {

    // Retrieves all contacts from the Access DB
    function showAll(callback) {
        return Q.promise((resolve, reject) => {
            connection
                .query( 'SELECT * FROM [ContactsTable]')
                .on('done', function (data) {
                    standardResp(resolve(data), reject(data));
                });
        }).nodeify(callback);
    }

    // Retrieves one specific contact from the Access DB. It uses the contact's 'id' to identify the correct contact
    function getOne(id, callback) {
        return Q.promise((resolve, reject) => {
            connection
                .query( 'SELECT * FROM [ContactsTable] WHERE ID = ' + id._id + ';')
                .on('done', function (data) {
                    standardResp(resolve(data), reject(data));
                })
                .on('fail', function (error) {
                    console.log(error);
                })
        }).nodeify(callback);
    }

    // Deletes one specific contact from the Access DB. It uses the contact's 'id' to identify the correct contact
    function deleteContact(id, callback) {
        return Q.promise((resolve, reject) => {
            connection
                .execute('DELETE FROM ContactsTable WHERE ID = ' + id._id +';')
                .on('done', function(data) {
                    console.log('result:', JSON.stringify(data, null, '  '));
                    standardResp(resolve(data), reject(data));
                })
                .on('fail', function(error) {
                    console.log("Connection failed.");
                    console.log(error);
                });
        }).nodeify(callback);
    }

    // Creates a new contact in the Access DB
    function createNew(newContact, callback) {
        return Q.promise((resolve, reject) => {
            connection
                .execute('INSERT INTO ContactsTable(LastName, FirstName, Telephone, Email, State) VALUES ("'+ newContact.LastName +'", "'+ newContact.FirstName +'", "'+ newContact.Telephone +'", "'+ newContact.Email +'", "'+ newContact.State +'")')
                .on('done', function(data) {
                    standardResp(resolve(data), reject(data));
                })
                .on('fail', function(error) {
                    console.log(error);
                });
        }).nodeify(callback);
    }

    // Updates one specific contact from the Access DB. It uses the contact's 'id' to identify the correct contact
    function updateContact(id, updatedContact, callback) {
        return Q.promise((resolve, reject) => {
            connection
                .execute('UPDATE ContactsTable SET LastName = "'+ updatedContact.LastName +'", FirstName = "'+ updatedContact.FirstName +'", Telephone = "'+ updatedContact.Telephone +'", Email = "'+ updatedContact.Email +'", State = "'+ updatedContact.State +'" WHERE id = ' + id._id + ';')
                .on('done', function(data) {
                    standardResp(resolve(data), reject(data));
                })
                .on('fail', function(error) {
                    console.log(error);
                });
        }).nodeify(callback);
    }

    // Returns all of the CRUDF functions
    return {
        showAll,
        getOne,
        createNew,
        deleteContact,
        updateContact
    };
}
// Export module to be used by other modules
module.exports = libOperations;