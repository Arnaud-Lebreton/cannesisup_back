const nodemailer = require("nodemailer");

const mail = {
  mailText: (req, res) => {
    const [mail, subject, text] = [
      req.body.email,
      req.body.subject,
      req.body.text,
    ];
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    transporter.sendMail({
      from: '"Cannes Is Up" <cannesIsUp@cannesIsUp.com>', // sender address
      to: email,
      subject: subject,
      text: text,
    });
  },
  mailHtml: (req, res) => {
    const [email, subject, html] = [
      req.body.email,
      req.body.subject,
      req.body.html,
    ];
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    transporter.sendMail({
      from: '"Cannes Is Up" <cannesIsUp@cannesIsUp.com>',
      to: email,
      subject: subject,
      html: html,
    });
  },
};
module.exports = mail;
