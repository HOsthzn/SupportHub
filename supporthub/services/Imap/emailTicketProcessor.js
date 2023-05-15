const TickerRepository = require('../../repositories/ticketRepository');
const TicketCommentRepository = require('../../repositories/ticketCommentRepository');
const UserRepository = require('../../repositories/userRepository');
const ImapHostRepository = require('../../repositories/imapHostRepository');
const emailService = require('../../services/email');
const path = require('path');

class EmailTicketProcessor {
    constructor(email) {
        this.email = email;
        this.ticketRepository = new TickerRepository();
        this.ticketCommentRepository = new TicketCommentRepository()
        this.userRepository = new UserRepository();
        this.imapHostRepository = new ImapHostRepository();
    }

    async createTicket() {
        const {from, to, subject, text , date} = this.email;
        this.getTicket(subject).then(ticket => {
            this.getUser(from)
                .then(async user => {
                    if (ticket) {
                        const comment = {
                            ticketId: ticket.id,
                            date,
                            text: text.trim(),
                            createdBy: user.id
                        }
                        this.ticketCommentRepository.create(comment);
                        await emailService.sendEmail(user.email,
                            `Ticket details: ${ticket.id} - ${ticket.title}`, null,
                            path.join(__dirname, '/emailTemplates/TicketComment.ejs'),
                            {user, ticket, comment});
                    } else {
                        ticket = {
                            title: subject,
                            description: text.trim(),
                            from,
                            to,
                            date,
                            createdBy: user.id
                        };

                        this.ticketRepository.create(ticket)
                            .then(async ticket => {
                                await emailService.sendEmail(user.email,
                                    `Ticket details:  ${ticket.id} - ${ticket.title}`, null,
                                    path.join(__dirname, '/emailTemplates/newTicket.ejs'),
                                    {user, ticket});
                            });
                    }
                }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        })
    }

    async getTicket(title) {
        return this.ticketRepository.getTicketByTitle(title)
    }

    async getUser({address, name}) {
        if (this.userRepository.exists({email: address})) {
            return this.userRepository.getUserByEmail(address);
        } else {
            const password = Math.random().toString(36).slice(-8);

            //send email to user with login details
            await emailService.sendEmail(address,
                'Login details', null,
                path.join(__dirname, '/emailTemplates/newUser.ejs'),
                {email: address, password}
            );

            return this.userRepository.create({
                email: address,
                name,
                password
            });
        }
    }
}

module.exports = EmailTicketProcessor;