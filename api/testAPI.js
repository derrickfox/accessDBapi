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

function success(resp) {
    return function (result) {
        let respObj = {};
        respObj = result;
        resp.send(respObj);
    }
}

function getRequest(request, response, next) {
    response.send('From testAPI');
}

function getAllUsers(request, response, next) {

    let returnedJSON = myService.testLibFunc();
    console.log("First getAllUsers console.log");
    console.log(returnedJSON);
    if(!request){
        response.send('Something went wrong. No request made')
    }else{
        //response.set('Content-Type', 'text/html');

        console.log("Inside getAllUsers() from testAPI file");
        response.send(returnedJSON);
        console.log("The response was just sent from the testAPI file")
    }
}

helloService.routes = [
    { path: '/test', httpMethod: 'GET', middleware: getRequest },
    { path: '/getAll2', httpMethod: 'GET', middleware: getAllUsers }
]














