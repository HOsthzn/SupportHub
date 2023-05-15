const { gmail } = require('../appconfig');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');

const email = {};

email.sendEmail = async (recipient, subject, message, templateFile, data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmail.user,
            pass: gmail.pass
        }
    });

    let mailOptions = {};

    if (templateFile && data) {
        // Read the HTML template file
        const template = fs.readFileSync(templateFile, 'utf8');

        // Render the HTML using EJS and the provided data
        const html = ejs.render(template, data);

        mailOptions = {
            from: gmail.user,
            to: recipient,
            subject: subject,
            html: html
        };
    } else {
        mailOptions = {
            from: gmail.user,
            to: recipient,
            subject: subject,
            text: message
        };
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log(error);
    }
};

module.exports = email;
