const express = require("express");
const routerProfil = express.Router();
const profil = require("../controllers/profil");

//Récupération de la collection dashboard
routerProfil.get("/upload", profil.uploadProfil);
//Modification de la collection dashboard
routerProfil.put("/save", profil.saveProfil);

module.exports = routerProfil;
