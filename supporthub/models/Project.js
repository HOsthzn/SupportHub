const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    }
    , name: {
        type: String,
        required: true,
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;