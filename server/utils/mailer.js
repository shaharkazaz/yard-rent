const nodemailer = require("nodemailer");
const Promise = require('bluebird');
const fs = require('fs');


const getMailerObject = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chenamiell@cs.colman.ac.il',
            pass: 'mwstchryuovdyjeg'
        }
    })
};

const getMailerMessage = async to => {
    const html = await Promise.promisify(fs.readFile)(__dirname + '/data/verficationMail.html', 'utf8')
    return {
        from: '"Yard Rent" <undefined>',
        to,
        subject: "Verification Email",
        text: "Verification",
        html,
        attachments: [
            {
                filename: 'bell.png',
                path: __dirname + '/data/bell.png',
                cid: 'bell.png'
            },
            {
                filename: 'yardrent.png',
                path: __dirname + '/data/yardrent.png',
                cid: 'yardrent.png'
            },
            {
                filename: 'sent.png',
                path: __dirname + '/data/sent.png',
                cid: 'sent.png'
            }

        ]
    }
};
const getMailerMessageDeclined = async to => {
    const html = await Promise.promisify(fs.readFile)(__dirname + '/data/declinedMail.html', 'utf8');
    return {
        from: '"Yard Rent" <undefined>',
        to,
        subject: "Return Process",
        text: "Declined",
        html,
        attachments: [
            {
                filename: 'bell.png',
                path: __dirname + '/data/bell.png',
                cid: 'bell.png'
            },
            {
                filename: 'yardrent.png',
                path: __dirname + '/data/yardrent.png',
                cid: 'yardrent.png'
            },
            {
                filename: 'sent.png',
                path: __dirname + '/data/sent.png',
                cid: 'sent.png'
            }

        ]
    }
};

const sendMail = async (to, code) => {
    const transporter = getMailerObject();
    const message = await getMailerMessage(to);
    let {html} = message;
    html = html.replace(RegExp(`{{code}}`, 'g'), code);
    message.html = html;
    await transporter.sendMail(message)
};

const sendDeclineMail = async (to, productName, productRewards, productOwner, orderDate) => {
    const transporter = getMailerObject();
    const message = await getMailerMessageDeclined(to);
    let {html} = message;
    html = html.replace(RegExp(`{{productName}}`, 'g'), productName);
    html = html.replace(RegExp(`{{productRewards}}`, 'g'), productRewards);
    html = html.replace(RegExp(`{{productOwner}}`, 'g'), productOwner);
    html = html.replace(RegExp(`{{orderDate}}`, 'g'), new Date(orderDate).toLocaleDateString());
    message.html = html;
    await transporter.sendMail(message)
};

module.exports = {sendMail,sendDeclineMail};
