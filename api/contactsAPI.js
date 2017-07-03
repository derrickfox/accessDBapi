const contactsLogic = new require('../lib/contactsLogic')();

let apiService = module.exports;

function getAll(request, response, next) {

    contactsLogic.showAll()
        .then(function (data) {
            response.send(data);
        })
        .catch(function (err) {
            response.status(500).send({error: 'ERROR from failure() function: ' + err});
        });

};

apiService.routes = [
    { path: '/getAll', httpMethod: 'GET', middleware: getAll }
]
