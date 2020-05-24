const express = require("express");
const routerProfil = express.Router();
const profil = require("../controllers/profil");
const auth = require("../middlewares/authorization");

//Récupération de la collection membre avec id
routerProfil.get("/insertSingle", profil.insertSingleProfil);
//Récupération de la collection membre avec id
routerProfil.get("/uploadSingle", profil.findSingleProfil);
//Récupération de la collection des membres actif / inactif
routerProfil.get("/uploadAll", profil.findAllProfil);
//Récupération de la collection des membres actif / inactif
routerProfil.get("/uploadAllActive", profil.findAllActiveProfil);
//Modification de la collection membre
routerProfil.put("/save", profil.updateProfil);
//Modification du mot de passe du membre
routerProfil.delete("/delete", profil.deleteProfil);
//Modification du mot de passe du membre
routerProfil.put("/mdp", profil.updateMdp);

module.exports = routerProfil;
