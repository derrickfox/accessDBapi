const contactsLogic = new require('../lib/contactsLogic')();

let apiService = module.exports;

function getAll(request, response, next) {
    contactsLogic.showAll()
        .then(function (data) {
            response.send(data);
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from showAll() function: ' + err});
        });
}

function createNew(request, response, next) {
    contactsLogic.createNew(request.body)
        .then(function (data) {
            response.send(data);
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from createNew() function: ' + err})
        })
}

function deleteContact(request, response, next) {
    contactsLogic.deleteContact({_id: request.params.id})
        .then(function () {
            response.send({_id: request.params.id});
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from deleteContact() function: ' + err})
        })
}

function updateContact(request, response, next) {
    contactsLogic.updateContact({_id: request.params.id}, request.body)
        .then(function () {
            response.send({_id: request.params.id});
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from updateContact() function:' + err})
        })
}

function getOneContact(request, response, next) {
    contactsLogic.getOne({_id: request.params.id})
        .then(function (data) {
            response.send(data)
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from getOneContact() function: ' + err});
        });
}

apiService.routes = [
    { path: '/contacts', httpMethod: 'GET', middleware: getAll },
    { path: '/contacts', httpMethod: 'POST', middleware: createNew },
    { path: '/contacts/:id', httpMethod: 'DELETE', middleware: deleteContact },
    { path: '/contacts/:id', httpMethod: 'PUT', middleware: updateContact},
    { path: '/contacts/:id', httpMethod: 'GET', middleware: getOneContact}
]
