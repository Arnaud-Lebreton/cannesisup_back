const express = require("express");
const routerDashboard = express.Router();
const dashboard = require("../controllers/dashboard");
const auth = require("../middlewares/authorization");

//Création de la collection dashboard
routerDashboard.post("/create", auth, dashboard.insertDashboard);
//Récupération de la collection dashboard
routerDashboard.post("/upload", auth, dashboard.findDashboard);
//Modification de la collection dashboard
routerDashboard.put("/save", auth, dashboard.updateDashboard);
module.exports = routerDashboard;
