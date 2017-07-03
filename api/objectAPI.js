// const Q = require('q');
// const contact = new require('../lib/objectLIB.js');
//
// class Contacts{
//     constructor(){
//
//     }
//
//     getAll(req, res){
//         var deferred = Q.defer();
//
//         let contactObj = new contact({});
//
//         contactObj.getAll(req.query).
//         then(function (contacts) {
//             res.send(contacts);
//             deferred.resolve(res);
//         },
//         function (error) {
//             deferred.reject(error);
//         });
//
//         return deferred.promise;
//     }
//
//     get Routes() {
//         let routes = [
//             {path: '/getAll3', httpMethod: 'GET', middleware: this.getAll()}
//         ]
//         return routes;
//     }
//
// }
//
// module.exports = new Contacts();
