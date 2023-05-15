const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
    , createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    , assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    , status: {
        type: String,
        enum: ["open", "resolved", 'in progress'],
        default: "open"
        , required: true
    }
    , title: String
    , description: String
    , from: {
        name: String,
        address: String
    }
    , to: {
        type: [{name: String, address: String}]
    }
    , date: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;