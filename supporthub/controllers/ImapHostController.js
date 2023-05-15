const util = require("util");
const debug = util.debuglog("ImapHostController");
const ImapCronManager = require('../services/Imap/imapCron');
const ImapHost = require('../models/IMAPHost');

const ImapHostController = {
    index(req, res) {
        ImapHost.find()
            .then((imapHosts) => {
                return res.render('imapHost/index', {title: "IMAP Hosts", data: imapHosts})
            })
            .catch((err) => {
                debug(`\x1b[33m%s\x1b[0m`, err);
                return res.redirect('/');
            });
    }
    , details(req, res) {
        const {id} = req.params;
        ImapHost.findById(id)
            .then((imapHost) => {
                return res.render('imapHost/details', {title: "IMAP Hosts", data: imapHost});
            })
            .catch((err) => {
                debug(`\x1b[33m%s\x1b[0m`, err);
                return res.render('imapHost/index', {title: "IMAP Hosts", error: "Could not find IMAP hos"});
            });
    }
    , create: {
        get(req, res) {
            return res.render('imapHost/create', {title: "Create IMAP Host"});
        }
        , post(req, res) {
            const {user, password, host, port, mailbox, tls, refreshInterval} = req.body;
            const imapHost = new ImapHost({
                user,
                password: {cipher: password},
                host,
                port,
                mailbox,
                tls,
                refreshInterval
            });
            imapHost.save()
                .then((imapHost) => {
                    ImapCronManager.startTask(imapHost);
                    return res.redirect('/imap/index');
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('imapHost/create', {
                        title: "Create IMAP Host",
                        error: "Could not create IMAP hos"
                    });
                });
        }
    }
    , edit: {
        get(req, res) {
            const {id} = req.params;
            ImapHost.findById(id)
                .then((imapHost) => {
                    return res.render('imapHost/edit', {title: "Edit IMAP Host", data: imapHost});
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('imapHost/index', {title: "IMAP Hosts", error: "Could not find IMAP host"});
                });
        }
        , post(req, res) {
            const {id, user, password, host, port, mailbox, tls, refreshInterval} = req.body;
            ImapHost.findByIdAndUpdate(id, {
                user,
                password: {cipher: password},
                host,
                port,
                mailbox,
                tls,
                refreshInterval
            })
                .then((imapHost) => {
                    ImapCronManager.restartTask(imapHost);
                    return res.redirect('/imap/index');
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('imapHost/edit', {
                        title: "Edit IMAP Host",
                        error: "Could not update IMAP host"
                    });
                });
        }
    }
    , delete: {
        get(req, res) {
            const {id} = req.params;
            ImapHost.findById(id)
                .then((imapHost) => {
                    return res.render("imapHost/delete", {title: "IMAP Hosts", data: imapHost});
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err)
                    return res.render('imapHost/index', {title: "IMAP Hosts", error: "Could not find IMAP host"});
                });
        }
        , post(req, res) {
            const {id} = req.body;
            ImapHost.findByIdAndRemove(id)
                .then((imapHost) => {
                    ImapCronManager.stopTask(id);
                    return res.redirect('/imap/index');
                })
                .catch((err) => {
                    debug(`\x1b[33m%s\x1b[0m`, err);
                    return res.render('imapHost/delete',
                        {title: "IMAP Hosts", error: "Could not delete IMAP host"});
                });
        }
    }
}

module.exports = ImapHostController;