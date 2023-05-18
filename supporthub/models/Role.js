const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    settings: {
        name: {
            type: String,
            required: true,
        }
        , code: {
            type: String,
            maxlength: 10,
        }
        , description: {
            type: String,
        }
    }
    , permissions: {
        article: {
            createArticle: {
                type: Boolean,
                default: false,
            }
            , deleteArticle: {
                type: Boolean,
                default: false,
            }
            , readArticle: {
                type: Boolean,
                default: false,
            }
            , updateArticle: {
                type: Boolean,
                default: false,
            }
        }
        , attachment: {
            addAttachment: {
                type: Boolean,
                default: false,
            }
            , deleteAttachment: {
                type: Boolean,
                default: false,
            }
            , updateAttachment: {
                type: Boolean,
                default: false,
            }
        }
        , comment: {
            createArticleComment: {
                type: Boolean,
                default: false,
            }
            , createIssueComment: {
                type: Boolean,
                default: false,
            }
            , deleteArticleComment: {
                type: Boolean,
                default: false,
            }
            , deleteIssueComment: {
                type: Boolean,
                default: false,
            }
            , deleteNotOwnCommentAndPermanentCommentDelete: {
                type: Boolean,
                default: false,
            }
            , readArticleComment: {
                type: Boolean,
                default: false,
            }
            , readIssueComment: {
                type: Boolean,
                default: false,
            }
            , updateArticleComment: {
                type: Boolean,
                default: false,
            }
            , updateIssueComment: {
                type: Boolean,
                default: false,
            }
            , updateNotOwnComment: {
                type: Boolean,
                default: false,
            }
        }
        , group: {
            createGroup: {
                type: Boolean,
                default: false,
            }
            , deleteGroup: {
                type: Boolean,
                default: false,
            }
            , readGroup: {
                type: Boolean,
                default: false,
            }
            , updateGroup: {
                type: Boolean,
                default: false,
            }
        }
        , issue: {
            createIssue: {
                type: Boolean,
                default: false,
            }
            , deleteIssue: {
                type: Boolean,
                default: false,
            }
            , linkIssues: {
                type: Boolean,
                default: false,
            }
            , readIssue: {
                type: Boolean,
                default: false,
            }
            , readIssuePrivateFields: {
                type: Boolean,
                default: false,
            }
            , updateIssue: {
                type: Boolean,
                default: false,
            }
            , updateIssuePrivateFields: {
                type: Boolean,
                default: false,
            }
            , updateWatchers: {
                type: Boolean,
                default: false,
            }
            , ViewWatchers: {
                type: Boolean,
                default: false,
            }
        }
        , organization: {
            createOrganization: {
                type: Boolean,
                default: false,
            }
            , deleteOrganization: {
                type: Boolean,
                default: false,
            }
            , readOrganization: {
                type: Boolean,
                default: false,
            }
            , updateOrganization: {
                type: Boolean,
                default: false,
            }
        }
        , project: {
            createProject: {
                type: Boolean,
                default: false,
            }
            , deleteProject: {
                type: Boolean,
                default: false,
            }
            , readProjectBasic: {
                type: Boolean,
                default: false,
            }
            , readProjectFull: {
                type: Boolean,
                default: false,
            }
            , updateProject: {
                type: Boolean,
                default: false,
            }
        }
        , report: {
            createReport: {
                type: Boolean,
                default: false,
            }
            , readReport: {
                type: Boolean,
                default: false,
            }
            , shareReport: {
                type: Boolean,
                default: false,
            }
        }
        , role: {
            manageRole: {
                type: Boolean,
                default: false,
            }
            , readRole: {
                type: Boolean,
                default: false,
            }
        }
        , user: {
            createUser: {
                type: Boolean,
                default: false,
            }
            , deleteUser: {
                type: Boolean,
                default: false,
            }
            , readUserBasic: {
                type: Boolean,
                default: false,
            }
            , readUserFull: {
                type: Boolean,
                default: false,
            }
            , updateSelf: {
                type: Boolean,
                default: false,
            }
            , updateUser: {
                type: Boolean,
                default: false,
            }
        }
    }
})

const Role = mongoose.model('role', roleSchema);

module.exports = Role;