const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },
    summary: {
        type: String,
        required: true,
    }
    , description: {
        type: String,
        required: true,
    }
    , priority: {
        type: String,
        required: true,
        enum: ['Minor', 'Normal', 'Major', "Critical"],
        default: 'Normal'
    }
    , type: {
        type: String,
        required: true,
        enum: ['Bug', 'Cosmetics', 'Exception', "Feature", "Task", "Improvement"],
    }
    , state: {
        type: String,
        enum: ["Submitted", "Open", "In Progress", "To be discussed", "Reopened", "Can't Reproduce", "Duplicate", "Fixed", "Won't fix", "Incomplete", "Obsolete", "Verified"],
        default: "Submitted"
    }
    , assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
    , estimate: {
        type: String
        , validate: {
            validator: function (v) {
                const pattern = /^(\d+w )?(\d+d )?(\d+h )?(\d+m)$/;
                return pattern.test(v);
            }
            , message: props => `${props.value} is not a valid estimate!`
        }
    }
    , watchers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
    }
    , tags: {
        type: [String],
    }
    , comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment',
    }
    , attachments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'attachment',
    }
    , linkedIssues: {
        type: [{
            issueId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'issue',
            }
            , type: {
                type: String,
                enum: ["related to", "is required for", "depends on", "is duplicated by", "duplicates", "parent for", "subtask of"],
            }
        }]
    }
})

const Issue = mongoose.model('issue', issueSchema);

module.exports = Issue;