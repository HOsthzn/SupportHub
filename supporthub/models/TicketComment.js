const mongoose = require('mongoose');

const TicketCommentSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: "Ticket"
        , required: true
    }
    , createdBy: {
        type: mongoose.Schema.Types.ObjectId
        , ref: "User"
        , required: true
    }
    , text: String
    , date: {
        type: Date,
        default: Date.now
    }
});

const TicketComment = mongoose.model("TicketComment", TicketCommentSchema);

module.exports = TicketComment;