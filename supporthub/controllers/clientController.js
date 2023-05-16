const util = require("util");
const debug = util.debuglog("clientController");
const Client = require('../models/Organization');

const ClientController = {
    index(req, res) {
        Client.find()
            .then((clients) => {
                return res.render('client/index', {title: "Client", data: clients})
            })
            .catch((err) => {
                debug(`\x1b[33m%s\x1b[0m`, err);
                return res.redirect('/');
            });
    }
    , details(req, res) {
        const {id} = req.params;
        Client.findById(id)
            .then((client) => {
                return res.render('client/details', {title: "Client", data: client});
            })
            .catch((err) => {
                debug(`\x1b[33m%s\x1b[0m`, err);
                return res.render('client/index', {title: "Client", error: "Could not find client"});
            });
    }
    , create: {
        get(req, res) {
            return res.render('client/create', {title: "Create Client"});
        }
        , post(req, res) {
            const {name} = req.body;

            const client = new Client({name});
            client.save()
                .then((client) => {
                    return res.redirect("/client/index");
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('client/create', {title: "Create Client", error: "Could not create client"})
                });
        }
    }
    , edit: {
        get(req, res) {
            const {id} = req.params;
            Client.findById(id)
                .then((client) => {
                    return res.render('client/edit', {title: "Edit Client", data: client});
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('client/index', {title: "Edit Client", error: "Could not find client"})
                });
        }
        , post(req, res) {
            const {id, name} = req.body;
            Client.findOneAndUpdate({id}, {name})
                .then((client) => {
                    return res.redirect("/client/index");
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('client/edit', {title: "Edit Client", error: "Could not find client"})
                });
        }
    }
    , delete: {
        get(req, res) {
            const {id} = req.params;
            Client.findById(id)
                .then((client) => {
                    return res.render('client/delete', {title: "Delete Client", data: client});
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('client/index', {title: "Delete Client", error: "Could not find client"})
                })
        }
        , post(req, res) {
            const {id} = req.body;
            Client.findByIdAndDelete(id)
                .then((client) => {
                    return res.redirect('/client/index');
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('client/delete', {title: "Delete Client", error: "Could not delete client"})
                });
        }
    }
    , get(req, res) {
        return res.json(Client.find());
    }
}

module.exports = ClientController;
