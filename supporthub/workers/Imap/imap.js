const crypt = require('../../services/crypt');
const Imap = require('node-imap');
const simpleParser = require('mailparser').simpleParser;
const EmailTicketProcessor = require('./emailTicketProcessor');

class IMAP {
    constructor(IMAPHost) {
        this.IMAPHost = IMAPHost;
        this.imap = null
    }

    async connect() {
        return new Promise((resolve, reject) => {
            const {user, password, host, port, tls} = this.IMAPHost;
            this.imap = new Imap({
                user, password: crypt.decrypt(password), host, port, tls, tlsOptions: {rejectUnauthorized: false},
                authTimeout: 10000 // 10 seconds
            });

            this.imap.once('ready', () => {
                return resolve();
            });

            this.imap.once('error', err => {
                return reject(err);
            });
            this.imap.connect();
        });
    }

    async disconnect() {
        return new Promise((resolve, reject) => {
            this.imap.end(() => {
                return resolve();
            });
        });
    }

    async getMessages() {
        return new Promise((resolve, reject) => {
            this.imap.openBox(this.IMAPHost.mailbox, false, (err, box) => {
                if (err) {
                    return reject(err);
                }
                this.imap.search(["Unseen"], (err, results) => {
                    if (err) {
                        return reject(err);
                    }

                    if (results.length === 0) {
                        return resolve();
                    }

                    let f = this.imap.fetch(results, {
                        markSeen: true,
                        bodies: "" // ['HEADER.FIELDS (TO FROM SUBJECT)', 'TEXT']
                    });

                    f.on("message", (msg, seqno) => {
                        msg.on('body', async (stream, info) => {
                            if(stream){
                                const parser = await simpleParser(stream);
                                let email = {
                                    from: parser.from.value[0],
                                    to: parser.to.value,
                                    subject: parser.subject,
                                    date: parser.date,
                                    text: parser.text
                                }

                                const processEmailTicket = new EmailTicketProcessor(email);
                                await processEmailTicket.createTicket();
                            }
                        });
                        msg.once("attributes", (attrs) => {
                            this.imap.seq.addFlags(attrs.uid, 'Seen', function (err) {
                                if (err) throw err;
                                console.log('Message marked as seen.');
                            });
                        });
                    });
                    f.once("error", (err) => {
                        return reject(err);
                    });
                    f.once("end", () => {
                        this.disconnect()
                            .then(() => {
                                return resolve();
                            })
                    });
                });
            });
        });
    }
}


module.exports = IMAP;