const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
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
    , projects: {
        type: Array,
        ref: 'project'
    }
    , access: {
        type: [{
            role: {
                type: mongoose.Schema.Types.ObjectId
                , ref: 'role'
            }
            , user: {
                type: Array
                , ref: 'user'
            }
        }]
    }
});

const Organization = mongoose.model('organization', organizationSchema);

module.exports = Organization;