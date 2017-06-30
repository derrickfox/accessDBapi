const contact = new require('../lib/objectLIB.js');

class Contacts{
    constructor(){

    }

    getAll(req, res){
        return {
            test: "I am from the Object LIB file!"
        }
    }

}

module.exports = new Contacts();
