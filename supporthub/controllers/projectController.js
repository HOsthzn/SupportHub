const util = require("util");
const debug = util.debuglog("projectController");
const Project = require('../models/Project');
const Client = require('../models/Organization');

const ProjectController = {
    index(req, res) {
        Project.find().populate('clientId', "users")
            .then(async (projects) => {
                return res.render('project/index', {
                    title: "Project",
                    data: projects
                })
            })
            .catch((err) => {
                debug(`\x1b[33m%s\x1b[0m`, err);
                return res.redirect('/');
            });
    }
    , details(req, res) {
        const {id} = req.params;
        Project.findById(id).populate('clientId')
            .then((project) => {
                return res.render('project/details', {title: "Project", data: project});
            })
            .catch((err) => {
                debug(`\x1b[33m%s\x1b[0m`, err);
                return res.render('project/index', {title: "Project", error: "Could not find project"});
            });
    }
    , create: {
        async get(req, res) {
            return res.render('project/create', {title: "Create Project"
                , listClient: await Client.find().exec()}
            );
        }
        , post(req, res) {
            const {clientId, name} = req.body;
            const project = new Project({clientId, name});
            project.save()
                .then((project) => {
                    return res.redirect("/project/index");
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('project/create', {title: "Create Project", error: "Could not create project"})
                });
        }
    }
    , edit: {
        get(req, res) {
            const {id} = req.params;
            Project.findById(id)
                .then(async (project) => {
                    return res.render('project/edit', {
                        title: "Edit Project",
                        data: project,
                        listClient: await Client.find().exec()
                    });
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('project/index', {title: "Edit Project", error: "Could not find project"})
                });
        }
        , post(req, res) {
            //TODO check edit not update values in db
            const {id, clientId, name} = req.body;
            console.log(req.body)
            Project.findOneAndUpdate({id}, {clientId, name})
                .then((project) => {
                    return res.redirect("/project/index");
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('project/edit', {title: "Edit Project", error: "Could not edit project"})
                });
        }
    }
    , delete: {
        get(req, res) {
            const {id} = req.params;
            Project.findById(id).populate('clientId')
                .then((project) => {
                    return res.render('project/delete', {title: "Delete Project", data: project});
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('project/index', {title: "Delete Project", error: "Could not find project"})
                });
        }
        , post(req, res) {
            const {id} = req.body;
            Project.findOneAndDelete({id})
                .then((project) => {
                    return res.redirect("/project/index");
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('project/delete', {title: "Delete Project", error: "Could not delete project"})
                });
        }
    }
};

module.exports = ProjectController;
