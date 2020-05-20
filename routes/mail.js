const express = require("express");
const routerMail = express.Router();
const mail = require("../controllers/mail");

// Mail avec un text
routerMail.post("/text", mail.mailText);
// Mail avec html
routerMail.post("/html", mail.mailHtml);

module.exports = routerMail;
