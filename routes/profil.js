const express = require("express");
const routerProfil = express.Router();
const profil = require("../controllers/profil");
const auth = require("../middlewares/authorization");
const multer = require("../middlewares/multer");

//Récupération de la collection membre avec id
routerProfil.post("/insertSingle", multer, profil.insertSingleProfil);
//Récupération de la collection membre avec id
routerProfil.get("/uploadSingle", profil.findSingleProfilQuery);
//Récupération de la collection membre avec id
routerProfil.post("/uploadSingle", auth, profil.findSingleProfilBody);
//Récupération de la collection des membres actif / inactif
routerProfil.post("/uploadAll", auth, profil.findAllProfil);
//Récupération de la collection des membres actif / inactif
routerProfil.get("/uploadAllActive", profil.findAllActiveProfil);
//Activation d'un membre
routerProfil.put("/activate", auth, profil.updateActivateProfil);
//Modification de la collection membre
/*routerProfil.put("/save", profil.updateProfil);*/
//Modification du mot de passe du membre
routerProfil.delete("/delete", profil.deleteProfil);
//Modification du mot de passe du membre
routerProfil.put("/mdp", profil.updateMdpMember);
//Modification du mot de passe du membre
routerProfil.put("/mdpAdmin", profil.updateMdpAdmin);
module.exports = routerProfil;
