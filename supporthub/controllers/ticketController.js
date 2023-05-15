const util = require("util");
const debug = util.debuglog("ticketController");
const Ticket = require('../models/Ticket');
const Project = require('../models/Project');
const User = require('../models/User');

const TicketController = {
    index(req, res) {
        Ticket.find()
            .populate(['projectId', 'createdBy', 'assignedTo'])
            .select("-createdBy.password -assignedTo.password")
            .then(async (tickets) => {
                return res.render('ticket/index', {
                    title: "Ticket",
                    data: tickets
                })
            })
            .catch((err) => {
                console.log(err)
                debug(`\x1b[33m%s\x1b[0m`, err);
                return res.redirect('/');
            });
    }
    , details(req, res) {
        const {id} = req.params;
        Ticket.findById(id).populate(['projectId', 'createdBy', 'assignedTo'])
            .populate(['projectId', 'createdBy', 'assignedTo'])
            .select("-createdBy.password -assignedTo.password")
            .then((ticket) => {
                return res.render('ticket/details', {title: "Ticket", data: ticket});
            })
            .catch((err) => {
                debug(`\x1b[33m%s\x1b[0m`, err);
                return res.render('ticket/index', {title: "Ticket", error: "Could not find ticket"});
            });
    }
    , create: {
        async get(req, res) {
            return res.render('ticket/create', {
                title: "Create Ticket"
                , listProject: await Project.find().exec()
                , listUser: await User.find().select("-createdBy.password -assignedTo.password").exec()
            });
        }
        , post(req, res) {
            const {projectId, assignedTo, status, title, description} = req.body;
            const ticket = new Ticket({
                projectId,
                createdBy: res.locals.user.id,
                assignedTo,
                status,
                title,
                description
            });
            ticket.save()
                .then((ticket) => {
                    return res.redirect("/ticket/index");
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('ticket/create', {title: "Create Ticket", error: "Could not create ticket"})
                });
        }
    }
    , edit: {
        get(req, res) {
            const {id} = req.params;
            Ticket.findById(id)
                .then(async (ticket) => {
                    return res.render('ticket/edit', {
                        title: "Edit Ticket",
                        data: ticket,
                        listProject: await Project.find().exec()
                        , listUser: await User.find().select("-createdBy.password -assignedTo.password").exec()
                    });
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('ticket/edit', {title: "Edit Ticket", error: "Could not edit ticket"});
                });
        }
        , post(req, res) {
            const {id, projectId, createdBy, assignedTo, status, title, description} = req.body;
            Ticket.findOneAndUpdate({_id: id}, {projectId, createdBy, assignedTo, status, title, description})
                .then((ticket) => {
                    return res.redirect("/ticket/index");
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('ticket/edit', {title: "Edit Ticket", error: "Could not edit ticket"});
                });
        }
    }
    , delete: {
        get(req, res) {
            const {id} = req.params;
            Ticket.findById(id).populate(['projectId', 'createdBy', 'assignedTo'])
                .populate(['projectId', 'createdBy', 'assignedTo'])
                .select("-createdBy.password -assignedTo.password")
                .then((ticket) => {
                    return res.render('ticket/delete', {title: "Delete Ticket", data: ticket});
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('ticket/delete', {title: "Delete Ticket", error: "Could not delete ticket"});
                });
        }
        , post(req, res) {
            const {id} = req.body;
            Ticket.findByIdAndDelete(id)
                .then((ticket) => {
                    return res.redirect("/ticket/index");
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('ticket/delete', {title: "Delete Ticket", error: "Could not delete ticket"});
                });
        }
    }
}

module.exports = TicketController;