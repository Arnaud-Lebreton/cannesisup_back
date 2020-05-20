const express = require("express");
const routerDashboard = express.Router();
const dashboard = require("../controllers/dashboard");

//Création de la collection dashboard
routerDashboard.post("/create", dashboard.createDashboard);
//Récupération de la collection dashboard
routerDashboard.get("/upload", dashboard.uploadDashboard);
//Modification de la collection dashboard
routerDashboard.put("/save", dashboard.saveDashboard);
module.exports = routerDashboard;
