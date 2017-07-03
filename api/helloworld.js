// 'use strict'
//
// const contactsController = new require('../lib/contactsLogic')();
//
// function success(resp){
//     return function(result){
//         let respObj = {};
//         respObj = result;
//         resp.send(respObj);
//     };
// }
//
// function failure (resp) {
//     return function (error) {
//         resp.status(500).send({error: 'Contacts: ' + error});
//     };
// }
//
// function Contacts() {
//     const middleware = {
//         create(req, resp){
//             contactsController.createNewContact(req.body)
//                 .then(success(resp))
//                 .catch(failure(resp));
//         },
//         read(req, resp){
//             contactsController.getAllContacts()
//                 .then(success(resp))
//                 .catch(failure(resp));
//         },
//         update(req, resp){
//             dbopermon.updateDoc({_id: req.params.id}, req.body)
//                 .then(success(resp))
//                 .catch(failure(resp));
//         },
//         remove(req, resp){
//             dbopermon.removeDoc({_id: req.params.id})
//                 .then(() => {
//                     resp.send({success: true});
//                 })
//                 .catch(failure(resp));
//         },
//         find(req, resp){
//             dbopermon.findDoc(req.body)
//                 .then(success(resp))
//                 .catch(failure(resp));
//         }
//
//     };
//
//     function Crudf(path, method, acceptsId){
//         this.path = '/' + path + (acceptsId ? '/:id' : '');
//         this.httpMethod = method;
//         this.middleware = middleware[path];
//     }
//
//     return {
//         routes: [
//             new Crudf('read', 'GET')
//         ]
//     };
// }
//
// module.exports = Contacts;








/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var helloService = module.exports;

function getRequest(request, response, next) {
    response.send('From helloworld');
}

helloService.routes = [
    { path: '/hello', httpMethod: 'GET', middleware: getRequest },
    { path: '/getAll', httpMethod: 'GET', middleware: getAllUsers }
    // ,
    // { path: '/new', httpMethod: 'POST', middleware: createNewUser },
    // { path: '/read/:id', httpMethod: 'GET', middleware: getSpecificUser },
    // { path: '/update/:id', httpMethod: 'POST', middleware: updateUser },
    // { path: '/delete/:id', httpMethod: 'POST', middleware: deleteUser },
    // { path: '/getAll', httpMethod: 'GET', middleware: getAllUsers }
]


// Get the adodb module
var ADODB = require('node-adodb');
ADODB.debug = true;

// Connect to the MS Access DB
var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Users\\foxdm2\\Desktop\\ContactsDB.accdb;Persist Security Info=False;');

// // Query the DB
connection
    .query('SELECT * FROM [ContactsTable];')
    .on('done', function (data){
        //console.log('Result:'.green.bold, data);
    });
// ////////

function getAllUsers(request, response, next) {

    connection
        .query('SELECT * FROM [ContactsTable]')
        .on('done', function (data) {
            response.send(data);
        });
}

function getSpecificUser(request, response, next, id) {
    connection
        .query( 'SELECT *' +
            'FROM [ContactsTable]' +
            'WHERE id=' + id + ';')
        .on('done', function (data){
            response.send(data);
        });
}

function createNewUser(request, response, next, firstName, lastName, email, state) {
    connection
        .execute('INSERT INTO ContactsTable(firstName, lastName, email, state) VALUES ("John", "Smith", "email@email.com", "MD")')
        .on('done', function (data){
            response.send(data);
        });
}

//FIX THIS
function updateUser(request, response, next, firstName, lastName, email, state){
    connection
        .execute('UPDATE ContactsTable(firstName, lastName, email, state) VALUES ("John", "Smith", "email@email.com", "MD")')
        .on('done', function (data){
            response.send(data);
        });
}

//FIX THIS
function deleteUser(request, response, next, id) {
    connection
        .query( 'SELECT *' +
            'FROM [ContactsTable]' +
            'WHERE id=' + id + ';')
        .on('done', function (data){
            response.send(data);
        });
}


