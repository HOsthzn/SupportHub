const baseRepository = require('./baseRepository');
const clientModel = require('../models/Client');

class clientRepository extends baseRepository {
    constructor() {
        super(clientModel);
    }
}

module.exports = clientRepository;