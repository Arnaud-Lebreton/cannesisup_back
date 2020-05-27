const express = require("express");
const routerMailing = express.Router();
const mailing = require("../controllers/mailing");

// Envoie de mail
routerMailing.post("/mdp", mailing.mdp);
routerMailing.post("/subscribe", mailing.subscribe);
routerMailing.post("/activate", mailing.activate);
module.exports = routerMailing;
