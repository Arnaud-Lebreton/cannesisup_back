const express = require("express");
const routerAdmin = express.Router();
const admin = require("../controllers/admin");

//Souscription superAdmin
routerAdmin.post("/superAdmin", admin.insertAdmin);

module.exports = routerAdmin;
