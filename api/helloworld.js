var helloService = module.exports;

function getRequest(request, response, next) {
    response.send('Hello Tim! Let me know what to do next! :)');
}

helloService.routes = [
    { path: '/hello', httpMethod: 'GET', middleware: getRequest },
    { path: '/test', httpMethod: 'GET', middleware: test },
    { path: '/new', httpMethod: 'POST', middleware: createNewUser },
    { path: '/getOne', httpMethod: 'GET', middleware: getSpecificUser },
    { path: '/update/:id', httpMethod: 'POST', middleware: updateUser },
    { path: '/delete/:id', httpMethod: 'POST', middleware: deleteUser },
    { path: '/getAll', httpMethod: 'GET', middleware: getAllUsers }
]


// Get the adodb module
var ADODB = require('node-adodb');
ADODB.debug = true;

// Connect to the MS Access DB
var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Users\\foxdm2\\Desktop\\ContactsDB.accdb;Persist Security Info=False;');

// Test
function test(request, response, next) {
    response.send("Working");
}

// Query the DB
connection
    .query('SELECT * FROM [ContactsTable];')
    .on('done', function (data){
        console.log('Result:'.green.bold, data);
    });
////////

function getAllUsers(request, response, next) {
    connection
        .query( 'SELECT *' +
                'FROM [ContactsTable]')
        .on('done', function (data) {
            response.send(data);
        });
}

function getSpecificUser(request, response, next) {
    connection
        .query("SELECT * FROM ContactsTable WHERE state = 'NJ';")
        .on('done', function (data){
            response.send(data);
        });
}

function createNewUser(request, response, next, LastName, FirstName, Telephone, Email, State) {
    connection
        .execute('INSERT INTO ContactsTable(LastName, FirstName, Telephone, Email, State) VALUES ("Baker", "Julie", "444-4444", "email@email.com", "MD")')
        .on('done', function (data){
            response.send(data);
        });
}

//FIX THIS
function updateUser(request, response, next, LastName, FirstName, Telephone, Email, State){
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
