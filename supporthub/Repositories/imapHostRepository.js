const baseRepository = require('./baseRepository');
const imapHostModel = require('../models/IMAPHost');
class imapHostRepository extends baseRepository {
    constructor() {
        super(imapHostModel);
    }
}

module.exports = imapHostRepository;