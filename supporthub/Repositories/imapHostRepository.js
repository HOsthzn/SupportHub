const baseRepository = require('./baseRepository');
const imapHostModel = require('../models/MailboxIntegration');
class imapHostRepository extends baseRepository {
    constructor() {
        super(imapHostModel);
    }
}

module.exports = imapHostRepository;