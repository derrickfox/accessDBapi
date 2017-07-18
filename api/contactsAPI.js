// Importing business logic for the contacts
const contactsLogic = new require('../lib/contactsLogic')();

// Exports module for use within other modules
let apiService = module.exports;

// Uses the contacts business logic to create an HTTP call that will retrieve all of the contacts from the Access DB
function getAll(request, response, next) {
    contactsLogic.showAll()
        .then(function (data) {
            response.send(data);
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from showAll() function: ' + err});
        });
}

// Uses the contacts business logic to create an HTTP call that will send a new contact to the Access DB to be saved
function createNew(request, response, next) {
    contactsLogic.createNew(request.body)
        .then(function (data) {
            response.send(data);
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from createNew() function: ' + err})
        })
}

// Uses the contacts business logic to create an HTTP call that will delete a contact from the Access DB
function deleteContact(request, response, next) {
    contactsLogic.deleteContact({_id: request.params.id})
        .then(function () {
            response.send({_id: request.params.id});
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from deleteContact() function: ' + err})
        })
}

// Uses the contacts business logic to create an HTTP call that will update one of the contacts from the Access DB
function updateContact(request, response, next) {
    contactsLogic.updateContact({_id: request.params.id}, request.body)
        .then(function () {
            response.send({_id: request.params.id});
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from updateContact() function:' + err})
        })
}

// Uses the contacts business logic to create an HTTP call that will retrieve one specific contact from the Access DB
function getOneContact(request, response, next) {
    contactsLogic.getOne({_id: request.params.id})
        .then(function (data) {
            response.send(data)
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from getOneContact() function: ' + err});
        });
}

// Setting the routes to the middleware
apiService.routes = [
    { path: '/contacts', httpMethod: 'GET', middleware: getAll },
    { path: '/contacts', httpMethod: 'POST', middleware: createNew },
    { path: '/contacts/:id', httpMethod: 'DELETE', middleware: deleteContact },
    { path: '/contacts/:id', httpMethod: 'PUT', middleware: updateContact},
    { path: '/contacts/:id', httpMethod: 'GET', middleware: getOneContact}
];
