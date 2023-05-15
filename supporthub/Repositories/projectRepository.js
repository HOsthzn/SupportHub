const baseRepository = require('./baseRepository');
const projectModel = require('../models/Project');
const ClientRepository = require('./clientRepository');

class projectRepository extends baseRepository {
    constructor() {
        super(projectModel);
        this.clientRepository = new ClientRepository();
    }
}

module.exports = projectRepository;