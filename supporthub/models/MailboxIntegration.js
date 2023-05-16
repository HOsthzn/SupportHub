const mongoose = require('mongoose');
const crypt = require('../services/crypt');
const mailboxIntegrationSchema = new mongoose.Schema({
    serveType: {
        type: String,
        required: true,
        enum: ["IMAP", "IMAPS"]
    }
    , hostAddress: {
        type: String,
        required: true
    }
    , port: {
        type: Number,
        required: true
    }
    , username: {
        type: String,
        required: true
    }
    , password: {
        iv: String,
        salt: String,
        cipher: String
    }
    , rules: {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project',
        }
    }
    , administrator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    filters: {
        folder: {
            type: String,
            default: "INBOX"
        }
    }
    , integrationInterval: {
        type: Number,
        default: 30000
    }
});

mailboxIntegrationSchema.pre("save", function (next) {
    this.password = crypt.encrypt(this.password.cipher);
    next();
});

mailboxIntegrationSchema.pre("findOneAndUpdate", function (next) {
    this._update.password = crypt.encrypt(this._update.password.cipher);
    next();
});

const MailboxIntegration = mongoose.model('mailboxIntegration', mailboxIntegrationSchema);

module.exports = MailboxIntegration;