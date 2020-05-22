const express = require("express");
const routerDashboard = express.Router();
const dashboard = require("../controllers/dashboard");

//Création de la collection dashboard
routerDashboard.post("/create", dashboard.insertDashboard);
//Récupération de la collection dashboard
routerDashboard.get("/upload", dashboard.findDashboard);
//Modification de la collection dashboard
routerDashboard.put("/save", dashboard.updateDashboard);
module.exports = routerDashboard;
