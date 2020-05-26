const nodemailer = require("nodemailer");

const sendMail = (email, subject, html) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: true,
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  transporter.sendMail({
    from: '"Cannes Is Up" <cannesIsUp@cannesIsUp.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    //text: text, // plain text body
    html: html, // html body
  });
};
module.exports = sendMail;
