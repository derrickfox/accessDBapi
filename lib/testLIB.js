// Get the adodb module
const ADODB = require('node-adodb');
const nodeify = require('nodeify');
const Q = require('q');
ADODB.debug = true;

// Connect to the MS Access DB
let connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Users\\foxdm2\\Desktop\\ContactsDB.accdb;Persist Security Info=False;');

function standardResp(reject, resolve) {
    return function (err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    }
}

function testOperations(){

    function testLibFunc() {
        // connection
        //     .query( 'SELECT *' +
        //         'FROM [customerList]')
        //     .on('done', function (data) {
        //         response.send(data);
        //     });

            connection
                .query( 'SELECT *' +
                    'FROM [customerList]')
                .on('done', function (data) {
                    console.log("Printed from testLibFunc");
                    console.log(data);
                    return data;
            });


        // return Q.promise((resolve, reject) => {
        //     connection
        //         .query( 'SELECT * FROM [ContactsTable]')
        //         .on('done', function (data) {
        //             data.then(function (data) {
        //                 return data;
        //             })
        //         })
        //         .on('fail', function (error) {
        //             console.log(error);
        //             standardResp(reject, resolve);
        //         })
        // }).nodeify(callback);
    }

    return {
        testLibFunc
    }
}

module.exports = testOperations;