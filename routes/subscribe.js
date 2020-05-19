const express = require("express");
const routerCreateMembership = express.Router();
const controllerCreateMembership = require("../controllers/createMembership");

//Souscription
routerCreateMembership.post("/", controllerCreateMembership.subscribeData);

module.exports = routerCreateMembership;
