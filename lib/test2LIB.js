const Q = require('q');
// Get the adodb module
const ADODB = require('node-adodb');
const nodeify = require('nodeify');
ADODB.debug = true;

// Connect to the MS Access DB
let connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Users\\foxdm2\\Desktop\\ContactsDB.accdb;Persist Security Info=False;');


function standardResp(reject, resolve) {
    console.log("StandardResponse -> 1");
    if (reject){
        console.log("StandardResponse -> accepted REJECT as parameter");
        console.log(reject);
    }

    if (resolve) {
        console.log("StandardResponse -> accepted RESOLVE as parameter");
        console.log(resolve);
    }
    return function (err, result) {
        console.log("StandardResponse -> RETURN");
        if (err) {
            console.log("standardResp = reject");
            reject(err);
        } else if (result){
            console.log("standardResp = resolve");
            resolve(result);
        } else {
            console.log("StandardResp = Something...else...was received")
        }
    }
}

function libOperations() {
    console.log("LIB -> libOperations() -> 1");
    function showAll(callback) {
        console.log("LIB -> showAll() -> 1");
        return Q.promise((resolve, reject) => {
            connection
                .query( 'SELECT * FROM [ContactsTable]')
                .on('done', function (data) {
                    standardResp(resolve(data), reject(data));
                });
        }).nodeify(callback);
        //console.log("LIB -> showAll() -> 2");
    }

    /*
     connection
     .query( 'SELECT * FROM [ContactsTable]')
     .on('done', function (data) {
     });
     */

    //
    // function showAll() {
    //     console.log("LIB 2 Files -> showAll Function -> 1")
    //     return Q.promise((resolve, reject) => {
    //         console.log("LIB 2 Files -> showAll Function -> RETURN -> 1");
    //         connection
    //             .query( 'SELECT * FROM [ContactsTable]')
    //             .on('done', function (data) {
    //                 console.log("LIB 2 Files -> showAll Function -> RETURN -> .on() -> 1");
    //                 console.log(data);
    //                 console.log("LIB 2 Files -> showAll Function -> RETURN -> .on() -> 2");
    //                 standardResp(reject, resolve);
    //                 console.log("LIB 2 Files -> showAll Function -> RETURN -> .on() -> 3");
    //             });
    //         console.log("LIB 2 Files -> showAll Function -> RETURN -> 2");
    //     });


        // return Q.promise((resolve, reject) => {
        //     collection.find({}).toArray(standardResp(reject, resolve));
        // }).nodeify(callback);


    function testLib2() {
        console.log("LIB 2 File -> LIB 2 Function");
        return {test: "test2LIB is connected to test2API!"}
    }

    function testLib3() {
        console.log("LIB 2 File -> LIB 3 Function");
    }

    console.log("LIB -> libOperations() -> 2");
    return {
        showAll,
        testLib2,
        testLib3
    };
}

module.exports = libOperations;