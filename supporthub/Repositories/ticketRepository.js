const baseRepository = require('./baseRepository');
const ticketModel = require('../models/Ticket');

class TicketRepository extends baseRepository {
    constructor() {
        super(ticketModel);
    }

    async getTicketByTitle(title) {
        return await this.model.findOne({title}).populate(["projectId", "createdBy", "assignedTo"])
    }
}

module.exports = TicketRepository;