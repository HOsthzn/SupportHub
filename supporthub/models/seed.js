const mongoose = require('mongoose');

const r = [
    {
        settings: {
            name: "Contributor",
            code: "CONTR",
            description: "The Contributor role is intended for users who create and work with issues. Contributors can create new issues, add comments, view existing issues and comments, update most issue attributes, and manage their own profiles.",
        },
        permissions: {
            article: {
                createArticle: true
                , readArticle: true
            }
            , attachment: {
                addAttachment: true
                , deleteAttachment: true
                , updateAttachment: true
            }
            , comment: {
                createArticleComment: true
                , createIssueComment: true
                , deleteIssueComment: true
                , readArticleComment: true
                , readIssueComment: true
                , updateIssueComment: true
            }
            , issue: {
                createIssue: true
                , deleteIssue: true
                , linkIssues: true
                , readIssue: true
                , readIssuePrivateFields: true
                , updateIssue: true
                , updateIssuePrivateFields: true
                , updateWatchers: true
                , ViewWatchers: true
            }
            , organization: {
                readOrganization: true
            }
            , project: {
                readProjectBasic: true
            }
            , report: {
                createReport: true
                , readReport: true
                , shareReport: true
            }
            , user: {
                readUserBasic: true
                , readUserFull: true
                , updateSelf: true
            }
        }
    },
    {
        settings: {
            name: "Issue Reader",
            code: "ISSREAD",
            description: "Issue Reader may only view issues and comments."
        }
        , permissions: {
            comment: {
                readIssueComment: true
            }
            , issue: {
                readIssue: true
            }
            , project: {
                readProjectBasic: true
            }
            , report: {
                readReport: true
            }
        }
    },
    {
        settings: {
            name: "Project Admin",
            code: "PROJADM",
            description: "Project Admin has the same access rights as a Developer and can also manage projects settings like assignees, fields and workflows."
        },
        permissions: {
            article: {
                createArticle: true
                , deleteArticle: true
                , readArticle: true
                , updateArticle: true
            }
            , attachment: {
                addAttachment: true
                , deleteAttachment: true
                , updateAttachment: true
            }
            , comment: {
                createArticleComment: true
                , createIssueComment: true
                , deleteArticleComment: true
                , deleteIssueComment: true
                , deleteNotOwnCommentAndPermanentCommentDelete: true
                , readArticleComment: true
                , readIssueComment: true
                , updateArticleComment: true
                , updateIssueComment: true
                , updateNotOwnComment: true
            }
            , group: {
                createGroup: true
                , deleteGroup: true
                , readGroup: true
                , updateGroup: true
            }
            , issue: {
                createIssue: true
                , deleteIssue: true
                , linkIssues: true
                , readIssue: true
                , readIssuePrivateFields: true
                , updateIssue: true
                , updateIssuePrivateFields: true
                , updateWatchers: true
                , ViewWatchers: true
            }
            , organization: {
                readOrganization: true
            }
            , project: {
                createProject: true
                , deleteProject: false
                , readProjectBasic: true
                , readProjectFull: true
                , updateProject: true
            }
            , report: {
                createReport: true
                , readReport: true
                , shareReport: true
            }
            , role: {
                readRole: true
            }
            , user: {
                createUser: true
                , readUserBasic: true
                , readUserFull: true
                , updateSelf: true
            }
        }
    },
    {
        settings: {
            name: "Reporter",
            code: "REPORTER",
            description: "Reporter may create new issues and comments, view existing issues and comments, and manage own profile."
        },
        permissions: {
            attachment: {
                addAttachment: true
            }
            , comment: {
                CreateIssueComment: true
                , DeleteIssueComment: true
                , ReadIssueComment: true
                , UpdateIssueComment: true
            }
            , issue: {
                createIssue: true
                , linkIssues: true
                , readIssue: true
            }
            , project: {
                readProjectBasic: true
            }
            , report: {
                readReport: true
            }
            , user: {
                updateSelf: true
            }
        }
    },
    {
        settings: {
            name: "System Admin",
            code: "SYSADM",
            description: "Admin has permissions to perform any operation."
        },
        permissions: {
            article: {
                createArticle: true
                , deleteArticle: true
                , readArticle: true
                , updateArticle: true
            }
            , attachment: {
                addAttachment: true
                , deleteAttachment: true
                , updateAttachment: true
            }
            , comment: {
                createArticleComment: true
                , createIssueComment: true
                , deleteArticleComment: true
                , deleteIssueComment: true
                , deleteNotOwnCommentAndPermanentCommentDelete: true
                , readArticleComment: true
                , readIssueComment: true
                , updateArticleComment: true
                , updateIssueComment: true
                , updateNotOwnComment: true
            }
            , group: {
                createGroup: true
                , deleteGroup: true
                , readGroup: true
                , updateGroup: true
            }
            , issue: {
                createIssue: true
                , deleteIssue: true
                , linkIssues: true
                , readIssue: true
                , readIssuePrivateFields: true
                , updateIssue: true
                , updateIssuePrivateFields: true
                , updateWatchers: true
                , ViewWatchers: true
            }
            , organization: {
                createOrganization: true
                , deleteOrganization: true
                , readOrganization: true
                , updateOrganization: true
            }
            , project: {
                createProject: true
                , deleteProject: false
                , readProjectBasic: true
                , readProjectFull: true
                , updateProject: true
            }
            , report: {
                createReport: true
                , readReport: true
                , shareReport: true
            }
            , role: {
                manageRole: true
                , readRole: true
            }
            , user: {
                createUser: true
                , deleteUser: true
                , readUserBasic: true
                , readUserFull: true
                , updateSelf: true
                , updateUser: true
            }
        }
    }
]

const g = [
    {
        _id: new mongoose.Types.ObjectId("6465d1d78b436267446ecd1c"),
        settings: {
            name: "All Users",
            description: "All Users is a special group that contains every user account in the system, including the guest account.\n" +
                "Any user who is added to the system is automatically added as a member of this group.\n" +
                "Each role granted to this group gives universal access to its permissions for every user in the system."
        }
    },
    {
        settings: {
            name: "Registered Users",
            description: "Registered Users is a special group that contains all user accounts in the system except for the guest account.\n" +
                "Any user who is added to the system is automatically added as a member of this group.\n" +
                "Each role granted to this group effectively grants its permissions to every user in the system except the guest account."

        }
        , parent: new mongoose.Types.ObjectId("6465d1d78b436267446ecd1c")
    }
]

const u = [
    {
        general: {
            name: "guest"
            , email: "guest@localhost"
            , password: "$2a$10$s5EIiH8vqa57AzsoD6KWZeRyoL4kM./hn.XFz02ZyOMkvoWEGohui" //guest@123
            , data: new Date()
        }
        , groups: ["6465d1d78b436267446ecd1c"]
        , roles: []
    }
]
const Role = require('./Role');
const Group = require('./Group');
const User = require('./User');

async function seed() {

    try {

        for (let role of r) {
            Role.find({"settings.name": role.settings.name})
                .then(async (res) => {
                    if (res.length <= 0) {
                        await Role.create(role);
                    }
                });
        }

        for (let group of g) {
            Group.find({"settings.name": group.settings.name})
                .then(async (res) => {
                    if (res.length <= 0) {
                        await Group.create(group);
                    }
                });
        }

        for (let user of u) {
            User.find({"general.name": user.general.name})
                .then(async (res) => {
                    if (res.length <= 0) {
                        await User.create(user);
                    }
                });
        }

        console.log("Seed done");
    } catch (err) {
        console.log("Error in seed.js: ", err);
    }
}


module.exports = seed;