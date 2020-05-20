const express = require("express");
const routerSignIn = express.Router();
const signIn = require("../controllers/signIn");

// Vérification pour les membres
routerSignIn.post("/", signIn.signInMembership);
// Vérification pour le super admin
routerSignIn.post("/superAdmin", signIn.signInSuperAdmin);

module.exports = routerSignIn;
