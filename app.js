/***** Constantes modules *****/
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/***** Constantes middlewares *****/
const cors = require("./middlewares/cors");
const auth = require("./middlewares/authorization");

/***** Constantes Routeurs *****/
const signUp = require("./routes/signUp");
const singIn = require("./routes/singIn");
const dashboard = require("./routes/dashboard");
const profil = require("./routes/profil");
const annuaire = require("./routes/annuaire");
const mail = require("./routes/mail");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors.handle);

/***** Lancement des Routeurs *****/
app.use("/signUp", signUp); // accès à l'inscription
app.use("/signIn", singIn); //acces à la connexion
app.use("/dashboard", dashboard); // accès aux paramètres dashboard ==> Admin uniquement
app.use("/profil", profil); // accès aux profils
app.use("/annuaire", annuaire); // accès à l'annuaire et au profil
app.use("/mail", mail); // accès à l'annuaire et au profil

module.exports = app;
