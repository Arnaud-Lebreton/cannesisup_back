const express = require("express");
const routerSignIn = express.Router();
const signIn = require("../controllers/signIn");

// Vérification pour les membres
routerSignIn.post("/", signIn.signIn);

module.exports = routerSignIn;
