const express = require("express");
const routerSignIn = express.Router();
const controllerSignIn = require("../controllers/signIn");

//Souscription
routerSignIn.post("/", controllerSignIn.SignIn);

module.exports = routerSignIn;
