// // Get the adodb module
// var ADODB = require('node-adodb');
// ADODB.debug = true;
//
// // Connect to the MS Access DB
// var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\dbs\\my-access-db.accdb;Persist Security Info=False;');


function libOperations(){

    function getAllContacts() {
        // connection
        //     .query( 'SELECT *' +
        //         'FROM [customerList]')
        //     .on('done', function (data) {
        //         response.send(data);
        //     });

        return {
            lib: "LIB file"
        };
    }

    return {
        getAllContacts
    }
}

module.exports = libOperations;