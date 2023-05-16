const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    settings: {
        name: {
            type: String,
            required: true,
        }
        , description: {
            type: String,
        }
        , logo: {
            type: String,
        }
    }
    , roles: {
        type: Array,
        ref: 'role'
    }
});

const Group = mongoose.model('group', groupSchema);

module.exports = Group;