const express = require("express");
const routerSignUp = express.Router();
const signUp = require("../controllers/signUp");

//Souscription member
routerSignUp.post("/", signUp.signUpMembership);
//Souscription superAdmin
routerSignUp.post("/SuperAdmin", signUp.signUpSuperAdmin);

module.exports = routerSignUp;
