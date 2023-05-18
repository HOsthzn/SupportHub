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
        , autoJoin: {
            val: {
                type: Boolean,
                default: false,
            }
            , autoJoinDomains: {
                type: Array,
            }
        }
    }
    , parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    }
    , roles: {
        type: Array,
        ref: 'role'
    }
    , members: {
        type: Array,
        ref: 'user'
    }
});

const Group = mongoose.model('group', groupSchema);

module.exports = Group;