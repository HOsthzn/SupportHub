const baseRepository = require('./baseRepository');
const clientModel = require('../models/Organization');

class clientRepository extends baseRepository {
    constructor() {
        super(clientModel);
    }
}

module.exports = clientRepository;