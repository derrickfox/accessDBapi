// const myService = new require('../lib/testLIB')();
//
//
//     function getAll(response){
//         let returnedJSON = myService.getAllContacts();
//         response.send(returnedJSON);
//     }
//
//     function getRequest(response, request, next) {
//         response.send('Hello from TestService');
//     }
//
//
//      let routes = [
//             { path: '/testHello', httpMethod: 'GET', middleware: getRequest },
//             { path: '/testGetAll', httpMethod: 'GET', middleware: getAll }
//     ];



const myService = new require('../lib/testLIB')();

let helloService = module.exports;

function getRequest(request, response, next) {
    response.send('Hello Tim! Let me know what to do next! :)');
}

function getAllUsers(request, response, next) {
    let returnedJSON = myService.getAllUsers();
    if(!request){
        response.send('Something went wrong. No request made')
    }else{
        response.send(returnedJSON);
    }
}

helloService.routes = [
    { path: '/hello', httpMethod: 'GET', middleware: getRequest },
    { path: '/getAll', httpMethod: 'GET', middleware: getAllUsers }
]















