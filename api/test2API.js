const dbopermon = new require('../lib/test2LIB')();

var apiService = module.exports;

function success(resp){
    console.log("Success function entered API file");
    return function(result){
        console.log("Inside Return of Success function. Printing 'result'...");
        console.log(result);
        result.then(function (data) {
            console.log("Inside success() then() -> 1")
            console.log(data);
            console.log("Inside success() then() -> 2")
        })
        let respObj = {};
        respObj = result;
        resp.send(respObj);
    }
}

function failure (resp) {
    return function (error) {
        resp.status(500).send({error: 'ERROR from failure() function: ' + error});
    }
}

function getAllContacts(response) {
    dbopermon.showAll().then(function (data) {
        response.send(data);
    })
}

function getRequest(request, response, next) {
    response.send('From test2API');
}

function testAPI2(request, response, next) {
    console.log("From testAPI2 function")
    dbopermon.testLib2.then(function (data) {
        console.log("From inside the 'then' function BEFORE data")
        console.log(data);
        console.log("From inside the 'then' function AFTER data")
    })
};

function testAPI3(request, response, next) {
    console.log("API 2 File -> API 3 Function -> 1");
    console.log(dbopermon.testLib3());
    console.log("API 2 File -> API 3 Function -> 2");
};

function testAPI4(request, response, next) {
    console.log("API 2 File -> API 4 Function -> 1");
    console.log(dbopermon.testLib2());
    response.send(dbopermon.testLib2());
    console.log("API 2 File -> API 4 Function -> 2");
};

function testAPI5(request, response, next) {
    console.log("API -> 1");
    console.log(dbopermon.showAll());

    dbopermon.showAll()
        .then(function (data) {
            console.log("API -> showAll() -> then() -> 1");
            console.log(data);
            response.send(data);
            console.log("API -> showAll() -> then() -> 2");
        })
        .catch(function (err) {
            console.log("An error occurred in API");
            console.log(err);
        });

    console.log("API -> 2");
    console.log("COMPLETE");
};

apiService.routes = [
    { path: '/hello5', httpMethod: 'GET', middleware: getRequest },
    { path: '/hello6', httpMethod: 'GET', middleware: testAPI2 },
    { path: '/hello7', httpMethod: 'GET', middleware: testAPI3 },
    { path: '/hello8', httpMethod: 'GET', middleware: testAPI4 },
    { path: '/hello9', httpMethod: 'GET', middleware: testAPI5 },
    { path: '/getAll5', httpMethod: 'GET', middleware: getAllContacts }
]


// const dbopermon = new require('../lib/test2LIB')();
//
// function success(resp){
//     return function(result){
//         let respObj = {};
//         respObj = result;
//         resp.send(respObj);
//     }
// }
//
// function failure (resp) {
//     return function (error) {
//         resp.status(500).send({error: 'ERROR from failure() function: ' + error});
//     }
// }
//
// function Images(){
//     const middleware = {
//         create(req, resp){
//             dbopermon.insertDoc(req.body)
//                 .then(success(resp, 'image'))
//                 .catch(failure(resp));
//         },
//         read(req, resp){
//             dbopermon.showAll()
//                 .then(success(resp))
//                 .catch(failure(resp));
//         },
//         update(req, resp){
//             dbopermon.updateDoc({_id: req.params.id}, req.body)
//                 .then(success(resp, 'image'))
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
//         },
//         getPlates(req, resp){
//             dbopermon.findDoc({
//                 type: "plate"
//             })
//                 .then(result => {
//                     resp.send({plates: result.map(plate => '/images/plates/' + plate.barcode)});
//                 })
//                 .catch(failure(resp));
//         },
//         getPlate(req, resp){
//             var barcode = req.params.barcode;
//             dbopermon.findDoc({type: "plate", barcode})
//                 .then(plates => {
//                     let plate = plates[0],
//                         returnData = {barcode},
//                         wells = returnData.wells = [];
//
//                     if (!plate){
//                         resp.status(500).send({error: 'Plate not found'});
//                         return;
//                     }
//
//                     dbopermon.findDoc({type: "image", plate: barcode})
//                         .then(images => {
//                             for (let i = 0; i < images.length; i++){
//                                 let wellUrl = '/images/plates/' + barcode + '/' + images[i].well;
//                                 if (wells.indexOf(wellUrl) === -1){
//                                     wells.push(wellUrl)
//                                 }
//                             }
//                             wells.sort();
//                             resp.send(returnData);
//                         })
//                         .catch(failure(resp));
//                 })
//                 .catch(failure(resp));
//         },
//         getImages(req, resp){
//             let {barcode, wellId, wavelength} = req.params,
//                 searchTerm = {type: "image", plate: barcode, well: wellId};
//
//             if (wavelength){
//                 searchTerm.wavelength = wavelength;
//             }
//             dbopermon.findDoc(searchTerm)
//                 .then(images => {
//                     resp.send({barcode, wellId, images});
//                 })
//                 .catch(failure(resp));
//         },
//         getImage(req, resp){
//             let size = req.query.size || 'thumbnail',
//                 format = req.query.format || 'png';
//
//             //TODO
//         }
//     };
//
//     function Crudf(path, method, acceptsId){
//         this.path = '/' + path + (acceptsId ? '/:id' : '');
//         this.httpMethod = method;
//         this.middleware = middleware[path];
//     }
//
//     function Retrieve(path, fn){
//         this.path = '/plates' + path;
//         this.httpMethod = 'GET';
//         this.middleware = middleware[fn];
//     }
//
//     return {
//         routes: [
//             new Crudf('create', 'POST'),
//             new Crudf('read', 'GET'),
//             new Crudf('update', 'PUT', true),
//             new Crudf('remove', 'DELETE', true),
//             new Crudf('find', 'POST'),
//             new Retrieve('', 'getPlates'),
//             new Retrieve('/:barcode', 'getPlate'),
//             new Retrieve('/:barcode/:wellId', 'getImages'),
//             new Retrieve('/:barcode/:wellId/:wavelength', 'getImages'),
//             {path: '/images/image/:imageid', httpMethod: 'GET', middleware: middleware.getImage}
//         ]
//     };
// }
//
// module.exports = Images;