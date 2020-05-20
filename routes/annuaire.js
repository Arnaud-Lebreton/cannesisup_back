const express = require("express");
const routerAnnuaire = express.Router();
const annuaire = require("../controllers/annuaire");

//Création de la collection dashboard
routerAnnuaire.get("/all", annuaire.allProfils);
//Récupération de la collection dashboard
routerAnnuaire.get("/single", annuaire.singleProfil);

module.exports = routerAnnuaire;
