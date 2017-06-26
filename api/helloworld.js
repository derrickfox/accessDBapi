var helloService = module.exports;

function getRequest(request, response, next) {
    response.send('Hello Tim! Let me know what to do next! :)');
}

helloService.routes = [
    { path: '/hello', httpMethod: 'GET', middleware: getRequest },
    { path: '/new', httpMethod: 'POST', middleware: createNewUser },
    { path: '/read/:id', httpMethod: 'GET', middleware: getSpecificUser },
    { path: '/update/:id', httpMethod: 'POST', middleware: updateUser },
    { path: '/delete/:id', httpMethod: 'POST', middleware: deleteUser },
    { path: '/getAll', httpMethod: 'GET', middleware: getAllUsers }
]


// Get the adodb module
var ADODB = require('node-adodb');
ADODB.debug = true;

// Connect to the MS Access DB
var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\dbs\\my-access-db.accdb;Persist Security Info=False;');

// Query the DB
connection
    .query('SELECT * FROM [TestTable];')
    .on('done', function (data){
        console.log('Result:'.green.bold, data);
    });
////////

function getAllUsers(request, response, next) {
    connection
        .query( 'SELECT *' +
                'FROM [customerList]')
        .on('done', function (data) {
            response.send(data);
        });
}

function getSpecificUser(request, response, next, id) {
    connection
        .query( 'SELECT *' +
                'FROM [customerList]' +
                'WHERE id=' + id + ';')
        .on('done', function (data){
            response.send(data);
        });
}

function createNewUser(request, response, next, firstName, lastName, email, state) {
    connection
        .execute('INSERT INTO customerList(firstName, lastName, email, state) VALUES ("John", "Smith", "email@email.com", "MD")')
        .on('done', function (data){
            response.send(data);
        });
}

//FIX THIS
function updateUser(request, response, next, firstName, lastName, email, state){
    connection
        .execute('UPDATE customerList(firstName, lastName, email, state) VALUES ("John", "Smith", "email@email.com", "MD")')
        .on('done', function (data){
            response.send(data);
        });
}

//FIX THIS
function deleteUser(request, response, next, id) {
    connection
        .query( 'SELECT *' +
            'FROM [customerList]' +
            'WHERE id=' + id + ';')
        .on('done', function (data){
            response.send(data);
        });
}
