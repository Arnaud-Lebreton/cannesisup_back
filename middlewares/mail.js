const nodemailer = require("nodemailer");

const sendMail = (email, subject, html) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: "dbd260f6fce06a", // generated ethereal user
      pass: "560360c51eb289", // generated ethereal password
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
