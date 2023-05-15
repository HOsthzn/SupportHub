const baseRepository = require('./baseRepository');
const ticketCommentModel = require('../models/TicketComment');

class ticketCommentRepository extends baseRepository {
    constructor() {
        super(ticketCommentModel);
    }
}

module.exports = ticketCommentRepository;